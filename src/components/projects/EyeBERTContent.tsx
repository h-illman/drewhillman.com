import eyeDiagramImage from "@/assets/eyebert-oscilloscope.jpg";
import waterfallImage from "@/assets/eyebert-waterfall.png";
import berAnalysisImage from "@/assets/eyebert-ber-analysis.png";
import TextLink from "@/components/ui/TextLink";

const EyeBERTContent = () => {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="prose prose-lg max-w-none space-y-4">
        <p className="text-foreground leading-relaxed text-lg">
          EyeBERT is a SerDes Bit Error Rate Tester that I'm building on a Terasic DE25-Standard FPGA board (Intel Agilex 5 SoC). The short version: it generates a known pseudo-random bit pattern, fires it through a physical transceiver at multi-gigabit speeds, receives it back through an SMA loopback cable, and counts how many bits arrived wrong. By sweeping transmitter settings, it produces BER waterfall curves and eye diagrams that tell you exactly how clean or degraded a high-speed serial link is.
        </p>
        <p className="text-foreground leading-relaxed">
          This is a work in progress. I'm currently in the early stages of toolchain setup, architecture planning, and writing the first RTL modules. This page is more of an open notebook than a finished case study.
        </p>
      </div>

      {/* Eye diagram reference */}
      <div className="my-8">
        <img
          src={eyeDiagramImage}
          alt="Eye diagram captured on a Keysight oscilloscope showing signal integrity of a high-speed serial link"
          className="w-full rounded-lg border border-border"
        />
        <p className="text-muted text-sm mt-2">
          An eye diagram on a Keysight oscilloscope. The "eye" opening shows how much margin exists in a high-speed link. A wider, cleaner eye means fewer bit errors. This is the kind of measurement EyeBERT is designed to replicate on the FPGA.
        </p>
      </div>

      {/* What even is a BERT? */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">What is a BERT, and why should you care?</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            Every high-speed serial link you rely on, whether it's PCIe, USB, Ethernet, or the interconnect inside a GPU, depends on signals moving at gigabits per second through physical copper or fiber. At those speeds, the signals degrade. They pick up noise, they reflect off impedance mismatches, they lose amplitude over distance. A Bit Error Rate Tester is the instrument that quantifies how bad that degradation actually is.
          </p>
          <p className="text-foreground leading-relaxed">
            The way it works is straightforward: you send a known bit pattern through the link and compare what comes back. The ratio of incorrect bits to total bits is your BER. A good link might have a BER of 10⁻¹², meaning one error in every trillion bits. A bad one might be orders of magnitude worse. The eye diagram is the visual side of this. It overlays thousands of bit transitions on top of each other, and the resulting shape tells you how much timing and voltage margin the receiver has to work with. If the "eye" is wide open, the link is healthy. If it's closing, you have a problem.
          </p>
        </div>
      </section>

      {/* Why I'm building it */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Why I'm building this</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            I've always been drawn to the layer of engineering that sits right at the boundary between software and physics. The place where a design decision you make in RTL has a measurable consequence in the real world as a signal on a wire. SerDes and high-speed I/O live exactly at that boundary. You're writing logic that controls analog behavior, tuning equalization parameters that change what a waveform looks like on an oscilloscope, and verifying that a link can sustain billions of error-free transitions per second.
          </p>
          <p className="text-foreground leading-relaxed">
            The engineers who do this professionally, validating chip I/O, characterizing transceiver links, designing PHY circuits, are doing work that I find genuinely compelling. But it's hard to learn by just reading about it. I wanted to actually build something that touches the real physics of high-speed signaling, not just simulate it in a textbook exercise. EyeBERT is that project.
          </p>
          <p className="text-foreground leading-relaxed">
            There's also a practical angle. The lab instruments that do this (dedicated BERTs, sampling oscilloscopes with eye diagram software) cost tens of thousands of dollars. An FPGA board with built-in transceivers costs a few hundred. The idea of building a credible characterization tool on accessible hardware felt like a worthwhile challenge.
          </p>
        </div>
      </section>

      {/* BER analysis image */}
      <div className="my-8">
        <img
          src={berAnalysisImage}
          alt="BER vs Eb/N0 curve showing theoretical bit error rate performance"
          className="w-full rounded-lg border border-border"
        />
        <p className="text-muted text-sm mt-2">
          Theoretical BER curve as a function of signal-to-noise ratio. This is the kind of baseline analysis that informs what error rates to expect at different link conditions.
        </p>
      </div>

      {/* How I'm approaching it */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">How I'm approaching it</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            I'm building this in phases, roughly the same way a real bring-up would work. The first step is getting the PRBS (pseudo-random bit sequence) generator and checker working in simulation. This is the core logic: an LFSR that produces a deterministic bit stream, and a checker that locks onto that same sequence on the receive side and flags mismatches. If the PRBS logic isn't solid, nothing else matters, so I want this verified in simulation before it goes anywhere near hardware.
          </p>
          <p className="text-foreground leading-relaxed">
            From there, the next phase is transceiver bring-up on the DE25. The Agilex 5 has hardened transceiver blocks that can run at multi-gigabit line rates, but configuring them is its own challenge. You're working with Intel's PHY IP, setting up PLLs, configuring TX pre-emphasis and RX equalization, and making sure the clocking is correct. This is probably where most of the debugging time will go.
          </p>
          <p className="text-foreground leading-relaxed">
            Once the transceivers are running, I'll connect the TX output to the RX input through an external SMA loopback cable. That gives me a real physical channel to measure against, even if it's a short one. The final phase is sweeping TX voltage swing and equalization settings, collecting BER at each point, and rendering the results as waterfall curves and eventually an eye diagram.
          </p>
        </div>
      </section>

      {/* Waterfall curve reference */}
      <div className="my-8">
        <img
          src={waterfallImage}
          alt="BER waterfall curves comparing good fiber, back-to-back, and bad fiber link performance"
          className="w-full rounded-lg border border-border"
        />
        <p className="text-muted text-sm mt-2">
          Example BER waterfall curves for different link conditions. Each curve shows how bit error rate drops as received power increases. The separation between curves tells you how much a channel degrades the signal. EyeBERT aims to produce plots like this from real transceiver measurements.
        </p>
      </div>

      {/* What the finished thing will do */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">What the finished thing will do</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            The end goal is a self-contained characterization tool running entirely on the FPGA. You plug in loopback cables, run a sweep, and get back BER waterfall curves and a rendered eye diagram. No external instruments, no expensive test equipment. Just the board, a serial connection for control, and the transceiver hardware doing the actual measurement.
          </p>
          <p className="text-foreground leading-relaxed">
            The eye diagram is the headline output. It's a 2D histogram built by sampling the received signal at different phases and amplitudes across thousands of bit periods. The resulting heat map shows exactly where the signal energy is concentrated and where the decision boundaries are. It's the single most informative visualization in high-speed link analysis, and being able to generate one from an FPGA without a $50,000 sampling scope is the core value of the project.
          </p>
        </div>
      </section>

      {/* GitHub CTA */}
      <div className="pt-4 border-t border-border">
        <p className="text-foreground">
          This project is actively in progress. Follow along on{" "}
          <TextLink href="https://github.com/h-illman/eye-bert" external>
            GitHub
          </TextLink>
          .
        </p>
      </div>
    </div>
  );
};

export default EyeBERTContent;