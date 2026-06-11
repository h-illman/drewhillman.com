import berWaterfallImage from "@/assets/eyebert-ber-sim.png";
import eyeDiagramImage from "@/assets/eyebert-eye-sim.png";
import TextLink from "@/components/ui/TextLink";
import { Button } from "@/components/ui/button";
import { Github, FileText } from "lucide-react";

const REPO_URL = "https://github.com/h-illman/eye-bert";
const REPORT_URL = "https://github.com/h-illman/eye-bert/blob/main/docs/technical_report.md";

const EyeBERTContent = () => {
  return (
    <div className="space-y-16">
      {/* Hero buttons + status */}
      <section className="space-y-5">
        <p className="text-foreground leading-relaxed text-lg">
          An open-source, scriptable SerDes bit error rate tester. RTL through Python,
          verified end to end, with a simulation mode that runs on any machine.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="default">
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              GitHub Repo
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={REPORT_URL} target="_blank" rel="noopener noreferrer">
              <FileText className="w-4 h-4" />
              Read the Full Technical Report
            </a>
          </Button>
        </div>
        <p className="text-muted text-sm">
          Phase 1 complete: 6/6 RTL testbenches, 8/8 unit tests, CI green. Hardware
          bring-up is next.
        </p>
      </section>

      {/* 2. The Gap */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">The gap</h2>
        <p className="text-foreground leading-relaxed">
          Every multi-gigabit serial link degrades between transmitter and receiver,
          and the instruments that measure it are all closed. A bench BERT from
          Keysight or Anritsu runs $50k and up. Intel's Transceiver Toolkit and Xilinx
          IBERT are free with their toolchains but ship as black boxes you cannot
          read, cannot extend, and cannot script cleanly into CI. None of them run
          without hardware on the bench.
        </p>
        <p className="text-foreground leading-relaxed">
          eye-bert is a complete BERT written as readable SystemVerilog, a documented
          register map, and a Python toolchain. A behavioral simulation backend lets
          the whole stack run on a laptop with no FPGA attached, so contributors and
          students can exercise every code path before they ever touch silicon.
        </p>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2 pr-4 font-semibold">Option</th>
                <th className="py-2 pr-4 font-semibold">Cost</th>
                <th className="py-2 pr-4 font-semibold">Scriptable</th>
                <th className="py-2 pr-4 font-semibold">Readable</th>
                <th className="py-2 font-semibold">Runs without hardware</th>
              </tr>
            </thead>
            <tbody className="text-foreground">
              <tr className="border-b border-border/60">
                <td className="py-2 pr-4">Bench BERT (Keysight/Anritsu)</td>
                <td className="py-2 pr-4">$50k–$500k</td>
                <td className="py-2 pr-4">partially (SCPI)</td>
                <td className="py-2 pr-4">no</td>
                <td className="py-2">no</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2 pr-4">Intel Transceiver Toolkit</td>
                <td className="py-2 pr-4">free w/ Quartus</td>
                <td className="py-2 pr-4">TCL, awkward</td>
                <td className="py-2 pr-4">no</td>
                <td className="py-2">no</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2 pr-4">Xilinx IBERT</td>
                <td className="py-2 pr-4">free w/ Vivado</td>
                <td className="py-2 pr-4">TCL, awkward</td>
                <td className="py-2 pr-4">no</td>
                <td className="py-2">no</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold">eye-bert</td>
                <td className="py-2 pr-4">board cost</td>
                <td className="py-2 pr-4">Python-native</td>
                <td className="py-2 pr-4">full RTL + docs</td>
                <td className="py-2 font-semibold">yes (sim mode)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. How It Works */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">How it works</h2>
        <p className="text-foreground leading-relaxed">
          Linux on the ARM cores drives an AXI4-Lite register map. Config crosses a
          clock domain boundary into the transceiver's recovered clock, where the
          PRBS generator, BER counter, and eye sampler live. Data goes out a
          multi-gigabit transceiver and comes back through an SMA loopback cable.
        </p>

        <pre className="text-xs md:text-sm bg-card border border-border p-4 overflow-x-auto font-mono leading-relaxed">
{`HPS (Linux, Cortex-A55/A76)
  └─ Python: bert_ctrl.py  →  /dev/mem mmap
       └─ AXI4-Lite bridge
            ▼                          hps_clk (100 MHz)
       ┌─────────────┐
       │  axi_csr.sv │  13 registers
       └──────┬──────┘
              │  2FF sync (config) · toggle handshake (counters)
══════════════╪══════════════ clock domain boundary ══════════════
              │                  xcvr_rx_clk (recovered)
   ┌──────────┼──────────────┬─────────────────┐
   ▼          ▼              ▼                 │
┌─────────┐ ┌─────────────┐ ┌──────────────┐   │
│prbs_gen │ │ ber_counter │ │ eye_sampler  │   │
│ Galois  │ │ self-sync   │ │ 4096×32 BRAM │   │
│ LFSR ×3 │ │   + LOL     │ │   raster FSM │   │
└────┬────┘ └──────▲──────┘ └──────▲───────┘   │
     │             │               │           │
     ▼             └───────┬───────┘           │
┌──────────────────────────────────────────────┴───┐
│ Native PHY IP — serializer · TX FFE · CDR · CTLE │
└───┬────────────────────────────────────▲─────────┘
    │ tx_serial_p/n           rx_serial_p/n
    ▼                                    │
   SMA ───────[loopback cable]───────────┘`}
        </pre>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-border p-5 bg-card">
            <h3 className="font-semibold text-foreground mb-2">PRBS generator</h3>
            <p className="text-foreground text-sm leading-relaxed">
              Galois LFSRs for PRBS-7, 15, and 31, the ITU-T O.150 patterns. Three
              independent LFSRs run continuously so mode switches take effect in a
              single cycle.
            </p>
          </div>
          <div className="border border-border p-5 bg-card">
            <h3 className="font-semibold text-foreground mb-2">BER counter</h3>
            <p className="text-foreground text-sm leading-relaxed">
              Self-synchronizing checker that locks in 65 cycles from any phase.
              64-bit counters with race-free snapshot readout, burst tracking, and
              loss-of-lock detection.
            </p>
          </div>
          <div className="border border-border p-5 bg-card">
            <h3 className="font-semibold text-foreground mb-2">Eye sampler</h3>
            <p className="text-foreground text-sm leading-relaxed">
              2D histogram in BRAM, up to a 64 by 64 phase and voltage raster, with a
              five-state FSM walking the sweep and accumulating hits per bin.
            </p>
          </div>
          <div className="border border-border p-5 bg-card">
            <h3 className="font-semibold text-foreground mb-2">Software stack</h3>
            <p className="text-foreground text-sm leading-relaxed">
              mmap-based Python control, sweep orchestration, plotting, and a
              simulation backend that swaps in for the real hardware behind the same
              register interface.
            </p>
          </div>
        </div>

        <p className="text-muted text-sm">
          Target hardware: Terasic DE25-Standard (Intel Agilex 5 SoC) with an
          XTS-HSMC SMA breakout card.
        </p>
      </section>

      {/* 4. What the report covers */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">What the report covers</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-foreground mb-2">Why PRBS works</h3>
            <p className="text-foreground leading-relaxed">
              Maximal-length sequences from primitive polynomials, why PRBS-31's long
              runs of identical bits stress clock recovery the hardest, and the
              recurrence property of polynomial p(x) = xᴺ + xᴹ + 1 that makes
              self-synchronizing checkers possible.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">How long must you measure</h3>
            <p className="text-foreground leading-relaxed">
              Bit errors follow Poisson statistics. Observing zero errors in T bits
              only bounds the true BER below 3/T at 95% confidence. The dwell times
              this implies are the reason the counters are 64 bits wide.
            </p>
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="py-2 pr-4 font-semibold">Claim</th>
                    <th className="py-2 pr-4 font-semibold">Bits required (95% CL, 0 errors)</th>
                    <th className="py-2 font-semibold">Time at 10 Gbps</th>
                  </tr>
                </thead>
                <tbody className="text-foreground">
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-4">BER &lt; 10⁻⁹</td>
                    <td className="py-2 pr-4">3 × 10⁹</td>
                    <td className="py-2">0.3 s</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-4">BER &lt; 10⁻¹²</td>
                    <td className="py-2 pr-4">3 × 10¹²</td>
                    <td className="py-2">5 min</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">BER &lt; 10⁻¹⁵</td>
                    <td className="py-2 pr-4">3 × 10¹⁵</td>
                    <td className="py-2">3.5 days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Eye diagrams without an oscilloscope</h3>
            <p className="text-foreground leading-relaxed">
              A hardware BERT cannot capture an analog overlay, so it rasterizes
              instead. The receiver steps the sampling phase across the unit interval
              and the decision threshold across the voltage range, counting hits per
              bin to build a 2D histogram of the eye.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Crossing clock domains safely</h3>
            <p className="text-foreground leading-relaxed">
              Three CDC patterns, matched to signal type: a 2-flop synchronizer for
              single-bit levels, per-bit 2FF for quasi-static buses guarded by a
              software contract, and a request/acknowledge toggle handshake to snapshot
              the free-running 64-bit counters without tearing.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Verification and the bugs it caught</h3>
            <p className="text-foreground leading-relaxed">
              A layered testbench methodology from unit tests up through a
              system-level testbench with a behavioral PHY. The report documents its
              own failures on purpose, because finding them is the part that matters.
            </p>
          </div>
        </div>
      </section>

      {/* 5. The redesign story */}
      <section>
        <div className="border-l-2 border-foreground bg-card p-6 md:p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">The redesign story</h2>
          <p className="text-foreground leading-relaxed">
            The first version of the error checker used slip alignment: hold the
            local reference one bit per mismatch until the streams line up. Every
            module-level test passed. Then the system-level testbench, which runs the
            real topology with a 30-bit serial loopback delay, ran a pull-the-cable
            scenario. Lock dropped correctly. Relock never came.
          </p>
          <p className="text-foreground leading-relaxed">
            Slip only converges when the reference leads the received stream, and
            after a long corruption event it lags, so recovery meant walking the
            entire 2³¹ − 1 sequence. The fix was a self-synchronizing checker that
            predicts each bit from the received history using the generator
            polynomial's recurrence. It locks in 65 cycles from any phase, which is
            how commercial BERT receivers do it. The module tests were green the
            whole time. Only the integration test caught it.
          </p>
          <p className="text-muted italic">
            The failure and the fix are both kept in the report, because finding it
            is the point.
          </p>
        </div>
      </section>

      {/* 6. Verification */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Verification</h2>
        <p className="text-foreground leading-relaxed">
          Everything below runs on every push via GitHub Actions, and anyone can
          reproduce it with make and pytest.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2 pr-4 font-semibold">Testbench</th>
                <th className="py-2 font-semibold">What it proves</th>
              </tr>
            </thead>
            <tbody className="text-foreground align-top">
              <tr className="border-b border-border/60">
                <td className="py-2 pr-4 font-mono whitespace-nowrap">tb_prbs_gen</td>
                <td className="py-2">98,304 bits match independent golden models across all three polynomials.</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2 pr-4 font-mono whitespace-nowrap">tb_ber_counter</td>
                <td className="py-2">Lock; 10⁶ clean bits with zero errors; exact counts on injected errors (3 singles → err=3/burst=1; 8-burst → err=11/burst=8).</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2 pr-4 font-mono whitespace-nowrap">tb_eye_sampler</td>
                <td className="py-2">4×4 raster, dwell 16, all bins populated, busy semantics correct.</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2 pr-4 font-mono whitespace-nowrap">tb_axi_csr</td>
                <td className="py-2">Reset values, RMW fields, pulse registers, byte strobes, 8× back-to-back transactions, unmapped sentinel.</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2 pr-4 font-mono whitespace-nowrap">tb_stress</td>
                <td className="py-2">PRBS7 period exactly 127, lock from arbitrary phase in 65 cycles, mode-switch relock, counter preservation across en toggle, LOL in 26 corrupt bits then relock in 65.</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2 pr-4 font-mono whitespace-nowrap">tb_bert_top</td>
                <td className="py-2">AXI master through CSR, CDC, PRBS, 30-bit serial loopback, checker, and snapshot handshake. Exact 5-error count through the full stack.</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2 pr-4 font-mono whitespace-nowrap">pytest ×8</td>
                <td className="py-2">Field math, no field overlap, RMW isolation, snapshot gating, monotonic counters, BER-vs-swing monotonicity, eye shape and crossing contrast.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono whitespace-nowrap">CI sim sweeps</td>
                <td className="py-2">All three sweep modes and both plot scripts run end to end, artifacts uploaded on every push.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Results */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Results</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <figure className="space-y-2">
            <img
              src={berWaterfallImage}
              alt="BER waterfall curve from a CTLE gain sweep in simulation mode"
              className="w-full border border-border bg-card"
            />
            <figcaption className="text-muted text-sm">
              CTLE gain sweep from simulation mode. The bathtub shape is the expected
              equalizer response, with the BER minimum near mid-range gain.
            </figcaption>
          </figure>
          <figure className="space-y-2">
            <img
              src={eyeDiagramImage}
              alt="Eye diagram heatmap from simulation mode with extracted opening overlaid"
              className="w-full border border-border bg-card"
            />
            <figcaption className="text-muted text-sm">
              Eye diagram from simulation mode with the extracted eye opening
              overlaid. Width and height are computed automatically by the analysis
              script.
            </figcaption>
          </figure>
        </div>
        <p className="text-muted italic text-sm">
          These are simulation-mode outputs and labeled as such everywhere in the
          repo. They will be replaced with measured hardware results as bring-up
          progresses.
        </p>
      </section>

      {/* 8. Try It Yourself */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-foreground">Try it yourself</h2>
        <p className="text-foreground">
          No FPGA needed. The sim flag swaps the /dev/mem backend for a behavioral
          channel model, same code paths, same plots.
        </p>
        <pre className="text-xs md:text-sm bg-card border border-border p-4 overflow-x-auto font-mono leading-relaxed">
{`git clone https://github.com/h-illman/eye-bert && cd eye-bert
pip install -r requirements.txt
cd software/python
python sweep.py --mode ber_ctle --sim --bits 2e8
cd ../analysis && python plot_ber.py`}
        </pre>
        <p className="text-foreground">
          RTL suite: <code className="font-mono text-sm">sudo apt install iverilog</code>,
          then <code className="font-mono text-sm">make -C sim all</code>.
        </p>
      </section>

      {/* 9. Roadmap */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Roadmap</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2 pr-4 font-semibold">Phase</th>
                <th className="py-2 pr-4 font-semibold">Work</th>
                <th className="py-2 font-semibold">Exit criterion</th>
              </tr>
            </thead>
            <tbody className="text-foreground align-top">
              <tr className="border-b border-border/60">
                <td className="py-2 pr-4 whitespace-nowrap">1 — RTL + sim</td>
                <td className="py-2 pr-4">Modules, testbenches, software stack, simulation backend, CI.</td>
                <td className="py-2 text-muted">Complete</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2 pr-4 whitespace-nowrap">2 — Transceiver bring-up</td>
                <td className="py-2 pr-4">Native PHY IP generation, parallel datapath gearing, Signal Tap probes.</td>
                <td className="py-2">BER = 0 over internal serial loopback at 3.125 Gbps, measured from Python.</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2 pr-4 whitespace-nowrap">3 — External loopback</td>
                <td className="py-2 pr-4">SMA cabling on XTS-HSMC, TX swing waterfall, attenuator-simulated channel loss.</td>
                <td className="py-2">First hardware waterfall replaces the sim figure.</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2 pr-4 whitespace-nowrap">4 — Eye capture</td>
                <td className="py-2 pr-4">Reconfig Controller PI/threshold address map in bert_ctrl.py.</td>
                <td className="py-2">Hardware eye with extracted opening.</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2 pr-4 whitespace-nowrap">5 — Publication</td>
                <td className="py-2 pr-4">Measured-results README, blog post, demo video.</td>
                <td className="py-2">A stranger reproduces a sweep from the README alone.</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 whitespace-nowrap">6+ — Community</td>
                <td className="py-2 pr-4">Far-end loopback on a second board, jitter decomposition (RJ/DJ), FEC-style burst stats, port to a Xilinx GTY board.</td>
                <td className="py-2">External contributor lands a PR.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 10. Closing */}
      <section>
        <p className="text-foreground leading-relaxed">
          This page tracks the project as it moves from verified RTL to measured
          hardware. The bring-up log in the repo records what is simulated and what
          is real.
        </p>
        <p className="text-foreground mt-4">
          Follow along on{" "}
          <TextLink href={REPO_URL} external>
            GitHub
          </TextLink>
          .
        </p>
      </section>
    </div>
  );
};

export default EyeBERTContent;
