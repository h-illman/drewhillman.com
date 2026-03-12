import bmsWiringImage from "@/assets/bms-wiring.jpg";
import bmsTeamImage from "@/assets/bms-team.jpg";
import bmsDashboardImage from "@/assets/bms-dashboard.png";
import TextLink from "@/components/ui/TextLink";

const BMSTelemetryContent = () => {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="prose prose-lg max-w-none">
        <p className="text-foreground leading-relaxed text-lg">
          A real-time telemetry pipeline that takes raw CAN bus data from our solar car's battery management system and puts it on a live dashboard anyone on the team can pull up from their phone.
        </p>
      </div>

      {/* Why */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Why this needed to exist</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            The Orion 2 BMS is great at protecting the battery pack, but all its data lives inside a desktop utility that requires a laptop physically tethered to the car. During a race, that's not an option — nobody's riding shotgun with a ThinkPad plugged into the CAN bus.
          </p>
          <p className="text-foreground leading-relaxed">
            What the pit crew actually needed was a way to glance at their phone and see: what's the state of charge, what's the voltage doing, are there any faults. That's the whole point of this project — get the data out of the car and onto a screen that's useful.
          </p>
        </div>
      </section>

      {/* Wiring Image */}
      <div className="my-8">
        <img
          src={bmsWiringImage}
          alt="Working on the battery pack wiring"
          className="w-full rounded-lg border border-border"
        />
      </div>

      {/* Phase 1 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Round one: InfluxDB + Grafana</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            I started with the obvious choice for time-series data — InfluxDB for storage and Grafana for dashboards. I wrote a Python script that hooked into the CAN bus, read the raw hex frames, decoded them using the Orion's message spec, and pushed everything into InfluxDB.
          </p>
          <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm text-foreground">
            Orion BMS (CAN) → CANdapter → Python Decoder → InfluxDB → Grafana
          </div>
          <p className="text-foreground leading-relaxed">
            The decoding part is where the real work was. You're taking raw hex — something like <code className="text-sm bg-muted/50 px-1 rounded">0x01E0</code> — and turning it into "48.0 Volts" based on a specific byte layout and scaling factor. Get the byte order wrong and you're looking at nonsense numbers that seem almost right, which is worse than obviously wrong.
          </p>
          <p className="text-foreground leading-relaxed">
            This stack was great for bench testing. I built a full "Race Day" dashboard with voltage sag tracking, temperature heat maps, and fault flags. InfluxDB could handle thousands of data points per second without breaking a sweat, and Grafana made it easy to iterate on visualizations quickly. But it still felt like a local tool — it needed a laptop running in the pit lane, and it wasn't something the whole team could access easily.
          </p>
        </div>
      </section>

      {/* Phase 2 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Round two: taking it to the cloud</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            The InfluxDB setup proved the concept, but I wanted something inherently cloud-native. I migrated the backend to Supabase and built a custom React frontend. The idea was simple: the car broadcasts data over Wi-Fi via an ESP32, a Python gateway script picks it up and pushes it to Supabase, and the React dashboard subscribes to real-time updates.
          </p>
          <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm text-foreground">
            Orion BMS → ESP32 → Wi-Fi → Python Gateway → Supabase → React Dashboard
          </div>
          <p className="text-muted text-sm italic">
            The ESP32 transmitter was designed by Xiuting Shi (Driver Controls Lead). I focused on everything from the receiving end forward — ingestion, decoding, database, and the frontend.
          </p>
          <p className="text-foreground leading-relaxed">
            Supabase's Realtime feature is what makes this work. The database pushes updates to the frontend over WebSockets whenever a new row lands. No polling, no refresh buttons — the gauges just update. I also added a "deadman switch": if no data comes in for five seconds, the status indicator turns red so the crew knows telemetry is down. Partly practical, partly because I thought it looked cool.
          </p>
        </div>
      </section>

      {/* The CAN contract */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">The CAN message contract</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            The hardest part of this whole project wasn't the database or the frontend — it was defining the contract between hardware and software. If the BMS sends bytes in a different order than the decoder expects, the dashboard shows garbage. And CAN garbage looks deceptively close to real data, so you can stare at it for a while before you realize something's off.
          </p>
          <p className="text-foreground leading-relaxed">
            I standardized everything into a single "Race Telemetry" message (<code className="text-sm bg-muted/50 px-1 rounded">0x6B0</code>) broadcasting every 100ms:
          </p>
          <div className="bg-muted/30 p-4 rounded-lg space-y-1 text-sm font-mono text-foreground">
            <p>Bytes 0–1: Pack Voltage (Unsigned 16-bit)</p>
            <p>Bytes 2–3: Pack Current (Signed 16-bit)</p>
            <p>Byte 4: State of Charge (0.5% scaling)</p>
            <p>Bytes 5–6: Temperatures (Unsigned integers)</p>
            <p>Byte 7: Fault Bitfield</p>
          </div>
          <p className="text-foreground leading-relaxed">
            The Python side handles all the bit-shifting and scaling — when the BMS sends 200, the database records 100 Amps. It's simple math, but if you mess up the signedness or the byte order, you end up with negative voltages or temperatures that don't exist.
          </p>
        </div>
      </section>

      {/* The dumb mistake */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">The two-week debugging nightmare</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            I have to include this because it's too good not to. I spent about two weeks debugging why my CAN message configuration kept resetting. Every time I'd set up the byte layout in the BMS software, it just wouldn't stick. I wiped the software, reinstalled, tried different computers, went through every setting I could think of.
          </p>
          <p className="text-foreground leading-relaxed">
            The fix? I wasn't clicking save. That's it. Two weeks of my life because I didn't hit one button. One of the junior engineers on my team, Sean, sat down, looked at it, and caught it in about thirty seconds. I've never felt so humbled and so relieved at the same time.
          </p>
        </div>
      </section>

      {/* Team Image */}
      <div className="my-8">
        <img
          src={bmsTeamImage}
          alt="The battery team celebrating a successful test"
          className="w-full rounded-lg border border-border"
        />
      </div>

      {/* Results */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Where it is now</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            We went from "we think the battery is fine" to "we can prove it." The raw CAN traffic can be verified independently, decoded values live in a queryable cloud database, and the dashboard is accessible to the entire team with sub-second latency. Anyone can pull it up, anywhere. That was the whole goal, and it works.
          </p>
        </div>
      </section>

      {/* Dashboard Image */}
      <div className="my-8">
        <img
          src={bmsDashboardImage}
          alt="The live Supabase-powered BMS telemetry dashboard"
          className="w-full rounded-lg border border-border"
        />
      </div>

      {/* GitHub Link */}
      <section className="pt-4">
        <p className="text-foreground">
          View the code on{" "}
          <TextLink href="https://github.com/h-illman/Orion2BMS-dataLogging" external>
            GitHub
          </TextLink>
          .
        </p>
      </section>
    </div>
  );
};

export default BMSTelemetryContent;
