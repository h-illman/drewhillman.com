import TextLink from "@/components/ui/TextLink";
import sloWorkflowImage from "@/assets/slo-workflow.jpg";
import sloRegressionImage from "@/assets/slo-regression.jpg";

const SLOMonitoringContent = () => {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="prose prose-lg max-w-none">
        <p className="text-foreground leading-relaxed text-lg">
          A reliability-style monitoring system for AI compute efficiency on Windows 11 with an RTX 3060 Laptop GPU.
        </p>
      </div>

      {/* Why I built this */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Why I built this</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            With my upcoming internship, I've been thinking a lot about monitoring. Mainly because that's exactly what I'll be doing at work, but also because it's just interesting. It's interesting to see how things are working over time, how values change, what stays consistent, how we can make things better.
          </p>
          <p className="text-foreground leading-relaxed">
            AI systems don't "just get slower", they regress because something changed. Really anything can cause AI to speed up and slow down: a driver update, a new model build, a Windows update, a background process, a power mode toggle, thermal conditions, or a configuration drift you didn't even realize happened.
          </p>
          <p className="text-foreground leading-relaxed">
            I wanted a tool that answers, with evidence and repeatability:
          </p>
          <ul className="list-disc list-inside text-foreground space-y-2">
            <li>How efficient is this system at running AI workloads right now? (Perf/W, energy-per-task)</li>
            <li>Did efficiency regress compared to baseline? (PASS/WARN/FAIL gates)</li>
            <li>What's the most likely cause? (throttling, power limiting, CPU feed, memory/VRAM pressure, etc.)</li>
            <li>What should I check next? (runbook-driven triage)</li>
          </ul>
        </div>
      </section>

      {/* What the project does */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">What the project does</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            This project runs standardized AI workloads, collects hardware telemetry during the run, computes efficiency metrics, stores results for trending, and flags regressions against a baseline.
          </p>
          
          <h3 className="text-xl font-medium text-foreground mt-6">Inputs</h3>
          <ul className="list-disc list-inside text-foreground space-y-2">
            <li>Workload configuration (model, batch size, precision, duration)</li>
            <li>System context (GPU driver version, power mode, power limit, etc.)</li>
            <li>Live telemetry from the machine (power, temps, clocks, utilization, VRAM/RAM)</li>
          </ul>

          <h3 className="text-xl font-medium text-foreground mt-6">Outputs</h3>
          <ul className="list-disc list-inside text-foreground space-y-2">
            <li>A run folder with artifacts (raw telemetry + summary metrics + metadata)</li>
            <li>Dashboards that show Perf/W over time, energy-per-task, and power signatures</li>
            <li>Automated baseline comparisons with regression status and incident-style summaries</li>
          </ul>
        </div>
      </section>

      {/* Workflow image */}
      <div className="my-8">
        <img
          src={sloWorkflowImage}
          alt="SLO Monitoring Workflow"
          className="w-full rounded-lg"
        />
        <p className="text-sm text-muted mt-2 text-center">Benchmarking process and SLO contract definition</p>
      </div>

      {/* Tooling choices */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Tooling choices</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <h3 className="text-xl font-medium text-foreground">Python (runner + analysis)</h3>
          <p className="text-foreground leading-relaxed">
            I used Python as the "control plane" because it's good at collecting telemetry, writing structured artifacts (CSV/JSON), computing metrics (energy integration, perf/W, deltas, variance), and automating regression checks and report generation.
          </p>

          <h3 className="text-xl font-medium text-foreground mt-6">NVIDIA NVML / nvidia-smi (GPU telemetry)</h3>
          <p className="text-foreground leading-relaxed">
            For GPU metrics, I leaned on NVML (via Python bindings) or nvidia-smi because they're reliable and widely supported across NVIDIA GPUs, provide exactly what efficiency analysis needs (power, clocks, util, temp, VRAM), and are lightweight enough to poll at a steady rate during workloads.
          </p>

          <h3 className="text-xl font-medium text-foreground mt-6">Windows performance counters (CPU/RAM)</h3>
          <p className="text-foreground leading-relaxed">
            I used Windows counters to capture CPU utilization (helps detect CPU feed bottlenecks) and RAM usage (helps explain paging, background load, memory pressure). These signals matter because AI "GPU performance" can still be limited by the CPU data pipeline, OS scheduling, or memory behavior.
          </p>

          <h3 className="text-xl font-medium text-foreground mt-6">InfluxDB + Grafana (storage + visualization)</h3>
          <p className="text-foreground leading-relaxed">
            I picked InfluxDB + Grafana because this project naturally produces time-series data. InfluxDB makes it easy to store results with tags like workload, driver_version, batch_size, precision, power_mode. Grafana gives clean dashboards quickly: trends, comparisons, tables, annotations, and "last run vs baseline" summaries. I also used this exact same stack on the telemetry system for the BMS in Sunstang!
          </p>
        </div>
      </section>

      {/* The workflow */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">The workflow from start to finish</h2>
        <div className="prose prose-lg max-w-none space-y-6">
          
          <div>
            <h3 className="text-xl font-medium text-foreground">Step 1 — Define the "Perf/W SLO contract"</h3>
            <p className="text-foreground leading-relaxed">
              Before writing code, I wrote down what counts as a "run" and what counts as "healthy": workloads (1–2 representative workloads like LLM inference + vision inference), baseline (the most recent "known good" run per workload/config), gates (PASS/WARN/FAIL thresholds for regression detection), and required metadata (driver version, workload config, batch size, precision, power mode, etc.).
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium text-foreground">Step 2 — Build the benchmark runner</h3>
            <p className="text-foreground leading-relaxed">
              The runner is responsible for running workloads in a controlled way and producing consistent artifacts. Key concepts include: warm-up window (ignore initial transient behavior), fixed duration runs (or fixed iteration count), and repeat runs (e.g., 3 repeats) to measure variance and avoid chasing noise.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium text-foreground">Step 3 — Add telemetry collection (the "flight recorder")</h3>
            <p className="text-foreground leading-relaxed">
              The telemetry collector runs during the workload and logs time-aligned samples: GPU (power, clocks, utilization, temperature, VRAM) and System (CPU utilization, RAM). When something regresses, you don't want just a number—you want the shape of the run: power ramps, clock drops, thermal rise, utilization instability, VRAM spikes.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium text-foreground">Step 4 — Compute metrics</h3>
            <p className="text-foreground leading-relaxed">
              After a run completes, the metrics engine processes artifacts into a standardized summary: average/peak power, energy (J) by integrating power over time, Perf/W, energy-per-task (J per 1k tokens / per image), and run stability (mean/std across repeats).
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium text-foreground">Step 5 — Run health checks</h3>
            <p className="text-foreground leading-relaxed">
              I added "run health" checks: sampling gaps (logger stalled), missing telemetry fields, workload didn't actually run (GPU util stayed low), and unstable run behavior (huge variance across repeats). These checks prevent bad runs from contaminating the baseline or triggering false alarms.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium text-foreground">Step 6 — Store and visualize (InfluxDB + Grafana)</h3>
            <p className="text-foreground leading-relaxed">
              Each run is ingested into storage with tags (workload name, driver version, batch size, precision, power mode) and fields (throughput, power, energy, perf/W, energy-per-task, health status). Grafana dashboards show Perf/W over time, energy-per-task over time, throughput over time, last run vs baseline table, power signature view, and variance panel.
            </p>
          </div>
        </div>
      </section>

      {/* Regression image */}
      <div className="my-8">
        <img
          src={sloRegressionImage}
          alt="Regression Detection and SLO Gates"
          className="w-full rounded-lg"
        />
        <p className="text-sm text-muted mt-2 text-center">Baseline comparisons and regression gates</p>
      </div>

      {/* Regression and Runbooks */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Regression gates & runbooks</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            For each workload/config, I pick a baseline run (most recent passing run), compare current run metrics to baseline, and assign status. When WARN/FAIL triggers, an incident-style summary artifact is generated showing what regressed, by how much, what changed (driver/power mode/config), links to relevant Grafana views, and run health status.
          </p>
          <p className="text-foreground leading-relaxed">
            Regression detection is only useful if it helps you fix things. So I added a runbook that maps symptoms to likely causes:
          </p>
          <ul className="list-disc list-inside text-foreground space-y-2">
            <li><strong>Thermal throttling:</strong> temperature up + clocks down under load</li>
            <li><strong>Power limited:</strong> power flat at cap + utilization high</li>
            <li><strong>CPU bottleneck:</strong> GPU utilization low + CPU high</li>
            <li><strong>Memory/VRAM pressure:</strong> VRAM near limit + throughput saturates with batch size</li>
            <li><strong>Configuration drift:</strong> power mode changed, battery vs plugged-in, background processes</li>
          </ul>
          <p className="text-foreground leading-relaxed">
            This turns "Perf/W dropped 8%" into "here's the top 3 checks to confirm why."
          </p>
        </div>
      </section>

      {/* Tests and learnings */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Tests I ran and what I learned</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">Typical sweeps included:</p>
          <ul className="list-disc list-inside text-foreground space-y-2">
            <li>Batch size sweep (find the throughput/efficiency sweet spot)</li>
            <li>Precision sweep (FP16/INT8 vs FP32 if supported)</li>
            <li>Power cap / power mode sweep (efficiency vs performance tradeoff)</li>
            <li>Sustained run (find thermal equilibrium + throttling behavior)</li>
          </ul>
          <p className="text-foreground leading-relaxed mt-4">What I learned to watch for:</p>
          <ul className="list-disc list-inside text-foreground space-y-2">
            <li>Many "regressions" are actually power mode or thermal behavior changing</li>
            <li>Throughput alone is misleading; energy-per-task is often more stable and more meaningful</li>
            <li>Repeatability + run health is non-negotiable if you want to trust trends</li>
          </ul>
        </div>
      </section>

      {/* Relevance */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">What makes this project relevant</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-foreground leading-relaxed">
            This maps directly to the day-to-day work in AI compute and platform teams: efficiency is a first-class metric (perf/W, energy/task), regressions are constant (drivers, firmware, kernels, model versions), telemetry and observability are how you debug hardware behavior at scale, and production thinking matters (baselines, gates, runbooks, variance control).
          </p>
          <p className="text-foreground leading-relaxed mt-4">
            If you've ever wondered how teams keep massive fleets of machines "healthy" in terms of performance and efficiency, this is a mini version of that.
          </p>
        </div>
      </section>

      {/* GitHub link */}
      <div className="pt-4">
        <p className="text-foreground">
          View the code on{" "}
          <TextLink href="https://github.com/h-illman" external>
            GitHub
          </TextLink>
          .
        </p>
      </div>
    </div>
  );
};

export default SLOMonitoringContent;
