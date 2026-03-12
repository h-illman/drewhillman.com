import thermalModelImage from "@/assets/thermal-model.png";

const ThermalModelContent = () => {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="prose prose-lg max-w-none">
        <p className="text-foreground leading-relaxed text-lg">
          A MATLAB simulation that predicts how hot our solar car's 1,200-cell battery pack will get under different racing conditions, so we can find thermal limits before they find us on race day.
        </p>
      </div>

      {/* Why */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Why I built it</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            When you're racing a solar car across the country, the battery pack is everything. Ours is 1,200 individual cells wired in a 40-parallel, 30-series configuration — that's a 14.5 kWh pack. If even a handful of those cells overheat, you're either derated or stopped on the side of the road.
          </p>
          <p className="text-foreground leading-relaxed">
            The problem is you can't just crack the pack open mid-race and check on things. You need to know ahead of time what conditions will push cells past their limits. That's where this comes in — I can stress-test the pack in software under conditions we'd never want to see in real life, and design around them before we ever leave the garage.
          </p>
        </div>
      </section>

      {/* Battery pack image */}
      <div className="my-8">
        <img
          src={thermalModelImage}
          alt="CAD rendering of the 40p30s battery pack"
          className="w-full rounded-lg border border-border"
        />
        <p className="text-sm text-muted mt-2 text-center">CAD view of the battery pack — 1,200 cells across 30 series modules</p>
      </div>

      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">How it works</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            The simulation runs in MATLAB with Simscape Battery for the thermal network modeling. Each of the 30 series modules is a thermal node with its own heat generation and dissipation paths, so the model maps pretty directly to the actual pack geometry.
          </p>
          <p className="text-foreground leading-relaxed">
            Rather than looping through modules one at a time, everything uses vectorized matrix operations — all 30 module temperatures are computed simultaneously each timestep. MATLAB is kind of built for this, and it keeps things fast even when I'm simulating multi-hour drive cycles.
          </p>
          <p className="text-foreground leading-relaxed">
            The physics side accounts for two types of heating: Joule heating (I²R losses from current flow) and reversible entropic heat (chemistry-driven heating and cooling that depends on state of charge). Both matter. Joule heating dominates at high current, but entropic effects can swing temperatures in surprising directions during certain charge/discharge phases — it's one of those things that's easy to overlook but actually changes the results.
          </p>
        </div>
      </section>

      {/* The interesting parts */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">The interesting parts</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            The cooling model isn't just a fixed number — it's velocity-dependent. As the car speeds up, convective cooling ramps up with it. This matters a lot because during a hill climb, you get the worst of both worlds: maximum current draw with minimum airflow. The simulation captures that tradeoff, which is exactly the kind of scenario you need to design around.
          </p>
          <p className="text-foreground leading-relaxed">
            I built a few distinct drive cycle profiles to stress different failure modes. The "Hill Climb" scenario pushes low speed with high torque. "Heat Soak" simulates sitting parked in direct sun with no cooling at all. Each one is designed to find a different bottleneck, so we know where our margins are thinnest.
          </p>
          <p className="text-foreground leading-relaxed">
            The part I'm most proud of is the defect injection layer. It lets me simulate manufacturing variances — things like a high-resistance spot weld on one module, or a partially blocked airflow channel. In a pack with 1,200 cells, it only takes one weak link to cause a thermal event. Being able to model that before it happens on the road is really valuable, and it changed a few of our design decisions.
          </p>
          <p className="text-foreground leading-relaxed">
            The model also has automated safety alerts that flag whenever any module's core temperature crosses the 60°C limit from the Panasonic NCR18650B datasheet. Instead of scanning temperature plots by hand, it just tells you which modules are at risk, when, and under what conditions.
          </p>
        </div>
      </section>

      {/* CAN integration */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Connecting it to real data</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            I built a template architecture for ingesting real-world CAN bus telemetry exported as CSV files. After a race or test session, we can feed actual current profiles, vehicle speeds, and ambient temperatures back into the simulation for post-race analysis. It's the bridge between "what we predicted" and "what actually happened" — and when those two line up, you start trusting the model enough to make bolder design choices.
          </p>
        </div>
      </section>

      {/* What I learned */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">What stuck with me</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            Thermal behavior is surprisingly non-linear. Small changes in airflow or contact resistance can cascade into big temperature differences across modules — it's not always intuitive. The defect injection work was eye-opening too: you realize how much trust you're placing in manufacturing consistency when you wire 1,200 cells together.
          </p>
          <p className="text-foreground leading-relaxed">
            The most practical takeaway was that velocity-dependent cooling makes race strategy a thermal problem as much as an energy one. Sometimes slowing down actually keeps you faster overall, because you avoid triggering thermal limits that would force a longer stop. Having a simulation you trust is the difference between "we think this will be fine" and "we ran 50 scenarios and here's exactly how much margin we have."
          </p>
        </div>
      </section>
    </div>
  );
};

export default ThermalModelContent;
