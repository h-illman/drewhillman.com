import bmsWiringImage from "@/assets/bms-wiring.jpg";
import bmsTeamImage from "@/assets/bms-team.jpg";
import bmsDashboardImage from "@/assets/bms-dashboard.png";
import TextLink from "@/components/ui/TextLink";

const BMSTelemetryContent = () => {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">The problem</h2>
        <p className="text-foreground leading-relaxed">
          In solar racing, the electrical system is only as race-ready as its ability to prove what the battery is doing in real time. The Orion 2 BMS is excellent at protecting the pack, but it locks all that data inside a desktop utility tethered to the car. If I wanted to see the battery status, I'd need a computer wired directly to the BMS at all times.
        </p>
        <p className="text-foreground leading-relaxed">
          During a race, we couldn't afford to have someone sitting in the passenger seat with a laptop. We needed:
        </p>
        <ul className="list-disc list-inside text-foreground space-y-2 ml-4">
          <li>Live, remote visibility for the pit crew</li>
          <li>Instant "at a glance" readability (SOC, Voltage, Current, Faults)</li>
          <li>Structured logging to review heat performance later</li>
        </ul>
        <p className="text-foreground leading-relaxed">
          My goal was to build the bridge between the raw CAN bus signals inside the car and a screen that anyone on the team could pull up on their phone.
        </p>
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
        <h2 className="text-2xl font-semibold text-foreground">Phase 1: The heavy-duty stack (InfluxDB + Grafana)</h2>
        <p className="text-foreground leading-relaxed">
          When I first started designing this, I went with the industry standard for time-series data. I built a pipeline using InfluxDB 3 Core for storage and Grafana for visualization.
        </p>
        <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm text-foreground">
          Orion BMS (CAN) → CANdapter → Python Decoder → InfluxDB → Grafana
        </div>
        <p className="text-foreground leading-relaxed">
          I wrote a Python logger that acted as the "translator." It hooked into the CAN bus, read the raw hex frames, and used a specific decoding map to turn binary data into engineering units (e.g., converting <code className="text-sm bg-muted/50 px-1 rounded">0x01E0</code> into 48.0 Volts).
        </p>
        <p className="text-foreground leading-relaxed">
          Why this was great:
        </p>
        <ul className="list-disc list-inside text-foreground space-y-2 ml-4">
          <li><span className="font-medium">Fast iteration:</span> InfluxDB's SQL support made debugging easy</li>
          <li><span className="font-medium">High frequency:</span> It could ingest thousands of points per second without sweating</li>
          <li><span className="font-medium">Validation:</span> It let me prove we were actually receiving valid frames before worrying about pretty UIs</li>
        </ul>
        <p className="text-foreground leading-relaxed">
          I built a full "Race Day" dashboard in Grafana with voltage sags, temperature heat maps, and fault flags. It worked perfectly for bench testing and detailed analysis.
        </p>
      </section>

      {/* Phase 2 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Phase 2: The pivot to cloud (Supabase + React)</h2>
        <p className="text-foreground leading-relaxed">
          While Grafana is powerful, it felt a bit "local." I wanted a solution that was inherently cloud-native — something that didn't require running a server on a laptop in the pit lane. I wanted the team to be able to check the car's status from anywhere.
        </p>
        <p className="text-foreground leading-relaxed">
          I decided to migrate the backend to Supabase (a modern PostgreSQL wrapper) and build a custom frontend using React.
        </p>
        <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm text-foreground">
          Orion BMS → ESP32 Telemetry Board → Wi-Fi → Python Gateway → Supabase → React Dashboard
        </div>
        <p className="text-muted text-sm italic">
          Note: The ESP32 hardware transmitter was designed by Xiuting Shi (Driver Controls Lead). My focus was the receiving end — ingestion, decoding, database, and frontend.
        </p>
      </section>

      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">How it works now</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-foreground">1. The Edge</h3>
            <p className="text-foreground leading-relaxed">
              A Python script running on the receiving laptop captures the decoded CAN packets.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-foreground">2. The Push</h3>
            <p className="text-foreground leading-relaxed">
              Instead of batching for storage, the script pushes JSON packets directly to Supabase.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-foreground">3. Realtime Sync</h3>
            <p className="text-foreground leading-relaxed">
              I utilized Supabase's Realtime (WebSockets) feature. The database literally "shouts" to the website whenever a new row is added.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-foreground">4. The UI</h3>
            <p className="text-foreground leading-relaxed">
              The site listens for these updates and animates the gauges instantly. It includes a "Deadman Switch" — if data stops flowing for 5 seconds, the status light turns red, alerting the crew that telemetry is lost. Also, I just thought that looked cool.
            </p>
          </div>
        </div>
      </section>

      {/* Python Decoding */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Python decoding — the contract</h2>
        <p className="text-foreground leading-relaxed">
          The hardest part wasn't the database; it was defining the "contract" between the hardware and the software. If the BMS sends a byte wrong, the dashboard shows garbage.
        </p>
        <p className="text-foreground leading-relaxed">
          I standardized a single "Race Telemetry" CAN message (<code className="text-sm bg-muted/50 px-1 rounded">0x6B0</code>) broadcasted every 100 ms:
        </p>
        <div className="bg-muted/30 p-4 rounded-lg space-y-1 text-sm font-mono text-foreground">
          <p>Race Telemetry CAN message (0x6B0):</p>
          <p>• Bytes 0–1: Pack Voltage (Unsigned 16-bit)</p>
          <p>• Bytes 2–3: Pack Current (Signed 16-bit)</p>
          <p>• Byte 4: State of Charge (0.5% scaling)</p>
          <p>• Bytes 5–6: Temperatures (Unsigned integers)</p>
          <p>• Byte 7: Fault Bitfield</p>
        </div>
        <p className="text-foreground leading-relaxed">
          My Python decoder handles the bit-shifting and scaling factors to ensure that when the BMS says 200, the database records 100 Amps.
        </p>
      </section>

      {/* The dumb mistake */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">The two-week debugging nightmare</h2>
        <p className="text-foreground leading-relaxed">
          This is also where I made my biggest (and dumbest) mistake that delayed the whole project by about two weeks. Every single time I configured the BMS software to send the bytes as structured above, it wouldn't work — I was getting total nonsense data. I'd check the software over and over, and every time the CAN messages would reset. I fully wiped my computer of the BMS software and tried all kinds of fixes.
        </p>
        <p className="text-foreground leading-relaxed">
          The fix finally came when I showed my team. One of the junior engineers under me, Sean, looked at it and saw that I didn't click <span className="font-medium">save</span>. The whole time, I was setting up CAN messages and doing all this work and it wasn't working just because I didn't hit save. Go figure.
        </p>
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
        <h2 className="text-2xl font-semibold text-foreground">The result</h2>
        <p className="text-foreground leading-relaxed font-medium text-lg">
          We moved from "we think the battery is fine" to "we can prove it."
        </p>
        <p className="text-foreground leading-relaxed">
          We now have a system where:
        </p>
        <ul className="list-disc list-inside text-foreground space-y-2 ml-4">
          <li>Raw CAN traffic can be verified independently</li>
          <li>Decoded values are stored in a queryable cloud database</li>
          <li>The dashboard is accessible to the entire team, live, with sub-second latency</li>
        </ul>
        <p className="text-foreground leading-relaxed">
          And you can view it from anywhere. Everyone wins!
        </p>
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
