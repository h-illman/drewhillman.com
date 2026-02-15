import thermalModelImage from "@/assets/thermal-model.png";

const ThermalModelContent = () => {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="prose prose-lg max-w-none">
        <p className="text-foreground leading-relaxed text-lg">
          A high-fidelity MATLAB simulation designed to predict the thermal behavior of a 14.5 kWh 40p30s battery pack under various racing and environmental conditions for Western Sunstang's solar-electric vehicle.
        </p>
      </div>

      {/* Why I built this */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Why I built this</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            When you're racing a solar car across the country, your battery pack is everything. It's 1,200 individual cells wired together in a 40-parallel, 30-series configuration, and if even a handful of those cells get too hot, you're either derated or parked on the side of the road.
          </p>
          <p className="text-foreground leading-relaxed">
            The problem is that during a race, you can't just crack open the pack and check. You need to know <em>before</em> you hit the road what conditions will push your cells past their thermal limits. That's where this simulation comes in — it lets us stress-test the pack in software under conditions we'd never want to encounter in real life, so we can design around them ahead of time.
          </p>
        </div>
      </section>

      {/* Battery pack image */}
      <div className="my-8">
        <img
          src={thermalModelImage}
          alt="CAD rendering of the 40p30s battery pack showing 1200 cells arranged in modules"
          className="w-full rounded-lg border border-border"
        />
        <p className="text-sm text-muted mt-2 text-center">CAD view of the battery pack — 1,200 cells across 30 series modules</p>
      </div>

      {/* Tech stack */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">The tech stack</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <h3 className="text-xl font-medium text-foreground">MATLAB / Simscape Battery</h3>
          <p className="text-foreground leading-relaxed">
            The core of the simulation uses MATLAB with Simscape Battery for nodal thermal network modeling. Simscape lets you build physical systems as block diagrams, so the thermal model maps pretty directly to the actual pack geometry — each module is a thermal node with its own heat generation and dissipation paths.
          </p>

          <h3 className="text-xl font-medium text-foreground mt-6">Vectorized matrix operations</h3>
          <p className="text-foreground leading-relaxed">
            Rather than looping through 30 modules one at a time, the simulation uses vectorized matrix operations to compute all module temperatures simultaneously. This keeps things fast even when running multi-hour drive cycles, and it's just cleaner code. MATLAB was kind of made for this.
          </p>

          <h3 className="text-xl font-medium text-foreground mt-6">Lumped-parameter thermal physics</h3>
          <p className="text-foreground leading-relaxed">
            The physics engine uses a lumped-parameter thermal network that accounts for both Joule heating (I²R losses from current flow) and reversible entropic heat (the chemistry-driven heating and cooling that depends on state of charge). Both matter — Joule heating dominates at high current, but entropic effects can swing temperatures in surprising directions during certain charge/discharge phases.
          </p>

          <h3 className="text-xl font-medium text-foreground mt-6">CAN-bus telemetry integration</h3>
          <p className="text-foreground leading-relaxed">
            The model has a template architecture for ingesting real-world CAN-bus telemetry data exported as .csv files. This means after a race or test session, we can feed actual current profiles, vehicle speeds, and ambient temperatures back into the simulation for post-race analysis. It's the bridge between "what we predicted" and "what actually happened."
          </p>
        </div>
      </section>

      {/* What it simulates */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">What it actually simulates</h2>
        <div className="prose prose-lg max-w-none space-y-6">
          
          <div>
            <h3 className="text-xl font-medium text-foreground">Dynamic "Ram Air" cooling</h3>
            <p className="text-foreground leading-relaxed">
              The cooling model isn't just a fixed heat transfer coefficient — it's velocity-dependent. As the car speeds up, the convective cooling ramps up with it. This is a big deal because during a hill climb (low speed, high current), you get the worst of both worlds: maximum heat generation with minimum cooling. The simulation captures this tradeoff precisely.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium text-foreground">Multi-scenario stress testing</h3>
            <p className="text-foreground leading-relaxed">
              I built distinct drive cycle profiles to stress different failure modes. The "Hill Climb" scenario pushes low speed with high torque — lots of current, barely any airflow. The "Heat Soak" scenario simulates static parking in direct sun with no cooling at all. Each scenario is designed to find a different thermal bottleneck in the pack, so we know where our margins are thinnest.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium text-foreground">Defect injection</h3>
            <p className="text-foreground leading-relaxed">
              This is probably the most interesting part. I added a defect-injection layer that simulates manufacturing variances — things like a high-resistance spot weld on one module, or a partially blocked airflow channel. In a 1,200-cell array, it only takes one weak link to cause a thermal event. The simulation lets us find those weak links before they find us on race day.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium text-foreground">Automated safety alerts</h3>
            <p className="text-foreground leading-relaxed">
              The model includes automated alert triggers that flag whenever any module's core temperature exceeds the 60°C safety threshold from the Panasonic NCR18650B datasheet. Rather than manually scanning temperature plots, the simulation tells you exactly which modules are at risk, when they cross the threshold, and under what conditions.
            </p>
          </div>
        </div>
      </section>

      {/* What I learned */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">What I took away from this</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            Building this taught me a lot about the intersection of software and physical systems. A few things that stuck:
          </p>
          <ul className="list-disc list-inside text-foreground space-y-2">
            <li>Thermal behavior is surprisingly non-linear — small changes in airflow or contact resistance can cascade into big temperature differences across modules</li>
            <li>The defect injection work was eye-opening: you realize how much trust you're placing in manufacturing consistency when you wire 1,200 cells together</li>
            <li>Velocity-dependent cooling makes race strategy a thermal problem as much as an energy one — sometimes slowing down actually keeps you faster overall</li>
            <li>Having a simulation you trust means you can make bolder design decisions. It's the difference between "we think this will be fine" and "we ran 50 scenarios and here's the margin"</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ThermalModelContent;
