import chargingOverviewImage from "@/assets/charging-circuit-overview.jpg";
import elconAnnotatedImage from "@/assets/elcon-annotated.jpg";
import j1772BmsImage from "@/assets/j1772-bms-interface.jpg";
import openevseLogicImage from "@/assets/openevse-logic.jpg";
import bmsIoImage from "@/assets/bms-io-connector.jpg";

const ChargingSystemContent = () => {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="prose prose-lg max-w-none space-y-4">
        <p className="text-foreground leading-relaxed text-lg">
          Charging a solar car sounds simple until you actually have to make it work. This project was about building and integrating the full charging path for our car: the Elcon charger, J1772 charge port, OpenEVSE control logic, and the Orion 2 BMS that supervises the whole thing. It wasn't just plugging in a charger and hoping for the best. It was understanding how every piece talks to every other piece, wiring it up correctly, and making the system safe and debuggable.
        </p>
        <p className="text-foreground leading-relaxed">
          A lot of the challenge came from the fact that none of this was documented end-to-end anywhere. There are Elcon spec sheets, Orion wiring manuals, OpenEVSE guides, and J1772 standards, but nobody had put together how they all connect in our specific car. So I spent a lot of time reading, tracing wires, drawing diagrams, and just figuring it out piece by piece. The result is a charging system that I actually trust, and documentation clear enough that someone else on the team can follow it.
        </p>
      </div>

      {/* How charging works in the car */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">How the car actually charges</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            At the highest level, the charging path goes: wall outlet → EVSE (charging station) → J1772 receptacle on the car → Elcon charger → battery pack. But there's a whole control layer on top of that. The BMS monitors the pack the entire time, controls whether charging is allowed, limits the current, and will shut everything down if something goes out of spec. The J1772 protocol handles the handshake between the car and the charging station. And the OpenEVSE board manages the pilot and proximity signals that make that handshake work.
          </p>
          <p className="text-foreground leading-relaxed">
            It's not just a power delivery problem. It's a systems problem where power electronics, control logic, and safety monitoring all have to agree before electrons start flowing.
          </p>
        </div>
      </section>

      {/* Main circuit diagram */}
      <div className="my-8">
        <img
          src={chargingOverviewImage}
          alt="Hand-drawn overview of the full charging circuit showing the Elcon charger, J1772 receptacle, BMS connections, and wall-side wiring"
          className="w-full rounded-lg border border-border"
        />
        <p className="text-muted text-sm italic mt-2">
          The full charging circuit overview I drew while tracing the system. Shows how the Elcon, J1772 receptacle, BMS, and wall-side wiring all connect.
        </p>
      </div>

      {/* What I worked through */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Understanding the Elcon charger</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            The charger is an Elcon 3.3kW CAN Bus unit (HK-MF-108-32-X, 108V). It has three ports, and each one does something completely different. Port A is the DC side: it connects to the high-voltage battery through a cable that runs to the battery box. Port B is the CAN/BMS communication port: three small wires that carry CAN High, CAN Low, and Ground to the BMS I/O connector (pins 18, 10, and 12 respectively). Port C is the AC input side: it connects through a NEMA 14-50 plug and adapter to the J1772 receptacle and ultimately to whatever wall outlet or EVSE you're plugged into.
          </p>
          <p className="text-foreground leading-relaxed">
            Understanding which port does what, and tracing the actual cables from the charger to where they terminate, was the first step. It sounds basic but when you're staring at a grey box with three identical-looking connectors and a tangle of orange high-voltage cabling, it's not immediately obvious what goes where.
          </p>
        </div>
      </section>

      {/* Elcon annotated photo */}
      <div className="my-8">
        <img
          src={elconAnnotatedImage}
          alt="Annotated photo of the Elcon charger showing Port A (DC to battery), Port B (CAN to BMS), and Port C (AC to wall), with J1772 receptacle and wiring visible"
          className="w-full rounded-lg border border-border"
        />
        <p className="text-muted text-sm italic mt-2">
          The Elcon charger with all three ports annotated. Port A goes to the battery box, Port B carries CAN to the BMS, and Port C connects to the wall through the J1772 receptacle and NEMA 14-50 adapters.
        </p>
      </div>

      {/* J1772 and BMS interface */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">The J1772 and BMS interface</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            The J1772 charging port on the car isn't just a power connector. It carries a Control Pilot signal and a Proximity Detect signal, both of which are part of the J1772 protocol that handles communication between the car and the EVSE. The Control Pilot tells the charging station that the car is ready and how much current it can accept. The Proximity Detect tells the BMS whether the charge plug is physically inserted.
          </p>
          <p className="text-foreground leading-relaxed">
            The Orion 2 BMS can directly interface with these signals. Control Pilot goes to Pin 13 on the BMS I/O connector, Proximity Detect goes to Pin 14, and the BMS also gets Always On Power (Pin 1), Charge Power (Pin 3), and Ground (Pin 12) from the J1772 side. This is what enables the BMS to support Level 1 and Level 2 AC charging, including variable current limiting based on what the EVSE reports it can provide.
          </p>
          <p className="text-foreground leading-relaxed">
            Getting this right required actually reading through the Orion 2 wiring manual's J1772 section and matching it to the physical wires coming out of our J1772 receptacle. Two of those wires, the Control Pilot and Proximity Detect lines (labelled CP and PP), run directly from the receptacle to the BMS. It's a small detail but if those are wrong or disconnected, the BMS won't know a charger is plugged in and charging just won't start.
          </p>
        </div>
      </section>

      {/* J1772 interface diagram */}
      <div className="my-8">
        <img
          src={j1772BmsImage}
          alt="J1772 vehicle-side connector pinout and BMS connection diagram showing Control Pilot, Proximity Detect, and power connections"
          className="w-full rounded-lg border border-border"
        />
        <p className="text-muted text-sm italic mt-2">
          The J1772 vehicle-side connector pinout (top) and its connections to the Orion 2 BMS (bottom). From the Orion BMS wiring manual.
        </p>
      </div>

      {/* BMS I/O and control */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">The BMS side of charging</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            The Orion 2's main I/O connector is a 28-pin connector that handles basically everything the BMS communicates with the outside world. For charging specifically, the important pins are: Charge Enable (Pin 8), which is an active-low signal the BMS uses to allow or disallow a charging source; Charge Power (Pin 3), which powers the BMS during charging; Charger Safety (Pin 6), an active-low on/off signal that controls the charger during defined periods; and the Charge Current Limit (Pin 5), a 0-5V analog signal that caps how much current the charger can push.
          </p>
          <p className="text-foreground leading-relaxed">
            There's also the Discharge Enable (Pin 7), which does the same thing but for the drive side. State of Charge outputs on Pin 4. And pins 13 and 14 handle the J1772 pilot and proximity as mentioned. All of this routes through the high-power box in the car where relays and distribution boards split everything up.
          </p>
        </div>
      </section>

      {/* BMS I/O connector image */}
      <div className="my-8">
        <img
          src={bmsIoImage}
          alt="Orion 2 BMS main I/O connector pinout showing all 28 pins with charge enable, discharge enable, CAN buses, J1772, and safety signals"
          className="w-full rounded-lg border border-border"
        />
        <p className="text-muted text-sm italic mt-2">
          The Orion 2 BMS main I/O connector pinout (wire side). Each pin has a specific job in the charging and discharging control path.
        </p>
      </div>

      {/* OpenEVSE logic */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">The OpenEVSE logic</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            The OpenEVSE board sits on the EVSE side and manages the J1772 pilot signaling. One thing I had to work through was how the proximity detection circuit actually functions. There's a 150Ω resistor on the PP (Proximity Pilot) pin, and a switch connected in parallel with a 390Ω resistor to the PE (Protective Earth) pin. When the charging connector isn't fully seated, the switch is open and the EVSE sees only the 150Ω. When you push the connector in and the latch clicks, the switch closes, putting the 390Ω in parallel to ground. That resistance change is how the system knows the plug is properly connected.
          </p>
          <p className="text-foreground leading-relaxed">
            It's a pretty elegant little circuit for what it does. But if you don't understand it, debugging why charging won't start becomes a guessing game. Drawing it out and understanding the two states (pressed vs. unpressed) made it much easier to verify that our OpenEVSE board was behaving correctly.
          </p>
        </div>
      </section>

      {/* OpenEVSE diagram */}
      <div className="my-8">
        <img
          src={openevseLogicImage}
          alt="OpenEVSE proximity detection circuit showing the switch and resistor logic in pressed and unpressed states"
          className="w-full rounded-lg border border-border"
        />
        <p className="text-muted text-sm italic mt-2">
          The OpenEVSE proximity detection logic. Left: connector unpressed (switch open). Right: connector pressed (switch closed, 390Ω to ground).
        </p>
      </div>

      {/* Safety */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Charging and discharging safety</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            Safety was not an afterthought here. The BMS enforces hard limits on charging: cells can't exceed 4.2V, pack temperature must stay between 10°C and 40°C, and charging current is capped at 40A. If any of those limits are violated, the BMS disables charging and isolates the system. On the discharge side, cells can't drop below 3.0V, temperature range extends to 50°C, and current is limited to 150A. The external cutoff switch can also isolate the pack independently of the BMS, which requires manual investigation and fault clearing before the system can be reset.
          </p>
          <p className="text-foreground leading-relaxed">
            We also wrote proper procedures for both charging and discharging. The BMS has to be powered on and reporting data before you can safely do either. During charging, current shows up as negative (which confused me the first time), and state of charge should be visibly updating. For storage or transport, we discharge to 40-60% SOC using external loads. In the past, we've literally used floodlights for that.
          </p>
          <p className="text-foreground leading-relaxed">
            The charge interlock is optional on the Orion 2, but we wire it. Pin 3 provides charge power, and if the interlock is active, the BMS prevents discharge while charging. It's one of those things that probably doesn't matter 99% of the time, but the 1% where it does could be really bad.
          </p>
        </div>
      </section>

      {/* Reflection */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">What I took away from this</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            This project taught me that the hard part of systems integration is usually not any single piece. The Elcon charger works. The BMS works. The J1772 standard is well-defined. The OpenEVSE board does its job. But making them all work together in a specific car, with specific wiring, and specific constraints, is where all the real engineering happens. Most of my time was spent reading, tracing, and documenting rather than building anything from scratch.
          </p>
          <p className="text-foreground leading-relaxed">
            The biggest value I added was probably the documentation itself. Before this project, charging the car required tribal knowledge. Now there's a clear diagram, a written procedure, and a reference for every connection. The next person who has to debug a charging issue shouldn't have to start from zero. That felt worth doing.
          </p>
          <p className="text-foreground leading-relaxed">
            It also ties directly into the BMS and telemetry work. The charging signals flow through the same I/O connector, the same CAN bus, and the same monitoring pipeline. Understanding the charging system made the telemetry system better, and vice versa. They're separate projects, but they share a nervous system.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ChargingSystemContent;
