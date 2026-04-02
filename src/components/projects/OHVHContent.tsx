import ohvhBoard from "@/assets/ohvh-board.png";
import ohvhRegression from "@/assets/ohvh-regression.png";
import ohvhChecks from "@/assets/ohvh-phase5-checks.png";
import ohvhGtkwave from "@/assets/ohvh-gtkwave.png";
import TextLink from "@/components/ui/TextLink";

const OHVHContent = () => {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="prose prose-lg max-w-none space-y-4">
        <p className="text-foreground leading-relaxed text-lg">
          An open-source Python framework for validating RTL designs from simulation through physical FPGA bring-up. I built it because I was tired of the way most FPGA debugging works: write some RTL, load it onto the board, watch it not work, and then spend hours guessing why. I wanted a structured pipeline that catches problems before they ever reach real hardware.
        </p>
      </div>

      {/* Why I built it */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Why I built this</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            If you've done any FPGA work, you know the typical workflow. You write some Verilog or SystemVerilog, maybe run a quick simulation, and then jump straight to programming the board. If something is wrong, you're debugging on physical hardware with limited visibility. No print statements. No stack traces. Just waveforms, LEDs, and patience.
          </p>
          <p className="text-foreground leading-relaxed">
            That always bothered me. In software, nobody would ship code without running tests first. But in hardware, it's common to skip simulation entirely or treat it as an afterthought. The tools exist, but the workflow around them is usually ad-hoc: no structure, no repeatability, no clear pipeline from "I wrote some RTL" to "I'm confident this will work on the board."
          </p>
          <p className="text-foreground leading-relaxed">
            I wanted to build that missing structure. Not just a collection of scripts, but a real framework with a clear validation model that takes a design from isolated module testing all the way through to hardware bring-up. Something reproducible, traceable, and actually useful for catching bugs early.
          </p>
        </div>
      </section>

      {/* The six-phase model */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">The six-phase validation model</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            The core of this project is a six-phase validation model that I designed from scratch. Each phase builds on the last, and the idea is that by the time you program the FPGA, you've already caught the majority of bugs in simulation. The model is what gives the framework its structure and makes it more than just a bag of scripts.
          </p>

          <h3 className="text-xl font-medium text-foreground mt-6">Phase 1: Environment setup and toolchain validation</h3>
          <p className="text-foreground leading-relaxed">
            Before touching any RTL, the framework validates the simulation environment itself. It checks that all required tools are installed, that the versions are compatible, and that the toolchain produces deterministic results. The goal is reproducibility: the same run on any machine should give the same output. If the environment is broken, nothing downstream is trustworthy, so this has to come first.
          </p>

          <h3 className="text-xl font-medium text-foreground mt-6">Phase 2: RTL module isolation</h3>
          <p className="text-foreground leading-relaxed">
            Each RTL module is isolated as its own device under test (DUT) with clean boundaries. This means defining exactly what goes in, what comes out, and what the module is supposed to do before writing any testbench code. It sounds obvious, but a lot of FPGA bugs come from unclear module interfaces. Spending time here prevents messy integration problems later.
          </p>

          <h3 className="text-xl font-medium text-foreground mt-6">Phase 3: Testbench development</h3>
          <p className="text-foreground leading-relaxed">
            I write testbenches in Python using cocotb. Each test defines explicit stimulus and explicit pass/fail assertions. Coverage is intentional, not reactive. I'm not just throwing random inputs at the DUT and hoping something breaks. I'm thinking about edge cases, boundary conditions, and the specific behaviors I need to verify. The tests are designed to prove the module does what it should and to catch it when it doesn't.
          </p>

          <h3 className="text-xl font-medium text-foreground mt-6">Phase 4: Regression execution and artifact collection</h3>
          <p className="text-foreground leading-relaxed">
            The framework runs automated regression suites and collects structured artifacts: logs, JUnit XML reports, and VCD waveform dumps. Every run is traceable. If a test fails, you know exactly when it failed, what the inputs were, and you have a waveform file ready to load into GTKWave. This traceability is a big part of what makes the workflow practical for real development.
          </p>
        </div>
      </section>

      {/* Regression image */}
      <div className="my-8">
        <img
          src={ohvhRegression}
          alt="Regression runner output showing all tests passing across multiple phases"
          className="w-full rounded-lg border border-border"
        />
      </div>

      <section className="space-y-4">
        <div className="prose prose-lg max-w-none space-y-4">
          <h3 className="text-xl font-medium text-foreground">Phase 5: Waveform analysis and fault isolation</h3>
          <p className="text-foreground leading-relaxed">
            This is where the real debugging happens, and it happens before you ever touch hardware. The VCD files generated in Phase 4 are loaded into GTKWave for signal-level inspection. You can see exactly what every signal is doing on every clock cycle. If there's a timing issue, a state machine that's stuck, or a register that's not updating correctly, you'll see it in the waveform. This is a massive efficiency gain compared to debugging on the board, where your only visibility might be an LED or a logic analyzer.
          </p>

          <h3 className="text-xl font-medium text-foreground mt-6">Phase 6: Hardware-in-the-loop on the DE25</h3>
          <p className="text-foreground leading-relaxed">
            The final phase deploys the validated RTL to the Terasic DE25 Standard FPGA board and confirms that what passed in simulation also works on real silicon. This is where the framework closes the loop. Pre-silicon simulation catches logic bugs and timing issues, but there are always things that only show up on hardware: actual I/O behavior, clock domain interactions, and physical timing constraints. Phase 6 is the proof that the validation pipeline actually works.
          </p>
        </div>
      </section>

      {/* GTKWave image */}
      <div className="my-8">
        <img
          src={ohvhGtkwave}
          alt="GTKWave waveform viewer showing register and signal behavior over time"
          className="w-full rounded-lg border border-border"
        />
      </div>

      {/* Tooling */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Tooling and why I chose it</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            Every tool in the framework was chosen deliberately. I didn't want to just grab whatever was popular. I wanted tools that were open-source, deterministic, and composable enough to fit into a structured pipeline.
          </p>

          <h3 className="text-xl font-medium text-foreground mt-6">cocotb</h3>
          <p className="text-foreground leading-relaxed">
            I chose cocotb over traditional SystemVerilog or UVM testbenching because it's open-source, scriptable, and accessible. You write testbenches in Python, which means you get all the flexibility of a real programming language for stimulus generation, assertions, and reporting. It's rigorous enough for real verification work, but without the licensing costs and steep learning curve of commercial tools.
          </p>

          <h3 className="text-xl font-medium text-foreground mt-6">Verilator</h3>
          <p className="text-foreground leading-relaxed">
            Verilator is fast, cycle-accurate, deterministic, and free. It compiles Verilog into C++ and runs the simulation natively, which makes it significantly faster than interpreted simulators. For a framework that needs to run regression suites repeatedly, simulation speed matters. The fact that it's open-source also means there are no licensing barriers for anyone who wants to use the framework.
          </p>

          <h3 className="text-xl font-medium text-foreground mt-6">GTKWave and VCD waveforms</h3>
          <p className="text-foreground leading-relaxed">
            Waveform debugging is a core deliverable in this framework, not an afterthought. Every test run generates VCD files that can be loaded directly into GTKWave for signal-level inspection. Being able to see exactly what happened on every clock edge is what makes Phase 5 possible. Without it, you're back to guessing.
          </p>

          <h3 className="text-xl font-medium text-foreground mt-6">JUnit XML reports</h3>
          <p className="text-foreground leading-relaxed">
            Regression output is structured as JUnit XML, which is a standard format that's traceable, shareable, and CI-friendly. If you want to plug this into a CI pipeline later, the reporting is already in the right format. It also makes it easy to track which tests passed, which failed, and when.
          </p>

          <h3 className="text-xl font-medium text-foreground mt-6">Python orchestration</h3>
          <p className="text-foreground leading-relaxed">
            Python ties the whole framework together. It handles test execution, artifact management, reporting, and the overall validation flow. Using Python as the orchestration layer keeps things extensible. Adding a new phase, a new report format, or a new tool integration is just writing more Python.
          </p>
        </div>
      </section>

      {/* Phase 5 checks image */}
      <div className="my-8">
        <img
          src={ohvhChecks}
          alt="Target-aware validation checks running against the DE25 board configuration"
          className="w-full rounded-lg border border-border"
        />
      </div>

      {/* Hardware and funding */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">The DE25 and getting real hardware</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            Phase 6 only works if you have a real FPGA board to deploy to. I applied for and received funding through the John M. Thompson Innovation Fund, which I used to purchase the Terasic DE25 Standard board. That board is what made hardware-in-the-loop validation possible and turned this from a simulation-only framework into something that closes the full loop.
          </p>
          <p className="text-foreground leading-relaxed">
            I genuinely want to thank Joshua Pearce for accepting my application and supporting this project. Having access to real hardware changed the scope and credibility of the work significantly. Without it, Phase 6 would have stayed theoretical. With it, I could actually prove that the validation pipeline works end to end.
          </p>
        </div>
      </section>

      {/* Board image */}
      <div className="my-8">
        <img
          src={ohvhBoard}
          alt="Terasic DE25 Standard FPGA board connected to peripheral expansion board"
          className="w-full rounded-lg border border-border"
        />
      </div>

      {/* Results */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">What the framework achieved</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            The framework works. I validated multiple RTL modules through the full six-phase pipeline, from environment setup through hardware bring-up. Regression suites run cleanly, waveform artifacts are generated automatically, and the hardware-in-the-loop phase confirmed that designs validated in simulation behaved correctly on the DE25.
          </p>
          <p className="text-foreground leading-relaxed">
            The target-aware checks in the framework verify board declarations, clock sources, resource estimates, toolchain requirements, and I/O standards before you even attempt synthesis. That alone saves a lot of time. Getting a build to fail at synthesis because of a misconfigured clock or an unsupported I/O standard is frustrating, and it's entirely preventable.
          </p>
          <p className="text-foreground leading-relaxed">
            The whole thing is open-source. Anyone can use it, extend it, or adapt it for their own boards and workflows. That was always part of the goal. I wanted this to be useful to more people than just me.
          </p>
        </div>
      </section>

      {/* Reflections */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">What I learned</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            Building this taught me a lot about what it actually means to design a validation workflow, not just use one. Writing individual testbenches is one thing. Designing a coherent multi-phase pipeline that's reproducible, traceable, and extensible is a different kind of problem. It forced me to think about the engineering process itself, not just the RTL.
          </p>
          <p className="text-foreground leading-relaxed">
            I was surprised by how much time I spent on the framework infrastructure compared to the actual RTL validation. Building the regression runner, the artifact collection system, the reporting pipeline, the target-aware checks: that's where most of the engineering effort went. The validation phases themselves are conceptually straightforward. Making them work reliably and automatically is where it gets hard.
          </p>
          <p className="text-foreground leading-relaxed">
            If I were rebuilding this, I'd invest more time in the Phase 6 automation. Right now, the hardware-in-the-loop step still involves some manual board interaction. Automating the full synthesis, place-and-route, and programming flow through Quartus scripting would make the pipeline truly end-to-end without human intervention. That's the next logical step.
          </p>
          <p className="text-foreground leading-relaxed">
            The biggest takeaway is that verification infrastructure matters. In industry, pre-silicon verification teams exist for a reason. Bugs found in simulation cost almost nothing to fix. Bugs found on hardware cost time, money, and sometimes silicon respins. This project gave me a real appreciation for that, and it's shaped how I think about any hardware project now.
          </p>
        </div>
      </section>

      {/* GitHub link */}
      <section className="pt-4">
        <p className="text-foreground">
          View the source code on{" "}
          <TextLink href="https://github.com/h-illman/open-hw-validation-harness" external>
            GitHub
          </TextLink>
          .
        </p>
      </section>
    </div>
  );
};

export default OHVHContent;