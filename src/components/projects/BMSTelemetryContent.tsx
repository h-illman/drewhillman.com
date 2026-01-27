import bmsWiringImage from "@/assets/bms-wiring.jpg";
import bmsTeamImage from "@/assets/bms-team.jpg";
import TextLink from "@/components/ui/TextLink";

const BMSTelemetryContent = () => {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Why this project existed</h2>
        <p className="text-foreground leading-relaxed">
          Sunstang's electrical system is only as race-ready as its ability to prove what the battery is doing in real time. The Orion 2 BMS is excellent at managing and protecting the pack, but during testing and racing we needed something Orion's desktop software couldn't fully provide:
        </p>
        <ul className="list-disc list-inside text-foreground space-y-2 ml-4">
          <li>Live, remote visibility (not tethered to a single laptop + adapter at the car)</li>
          <li>A race dashboard that's readable at a glance (SOC, voltage, current, temperatures, fault status)</li>
          <li>Structured logging so we can review a whole drive/heat later, not just "what's on the screen right now"</li>
          <li>A telemetry flow that is repeatable and compatible with our longer-term in-car architecture</li>
        </ul>
        <p className="text-foreground leading-relaxed">
          So the goal became: build a telemetry receiver + logging + dashboard system that turns CAN frames into clean, queryable signals and surfaces them in Grafana.
        </p>
      </section>

      {/* Architecture */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Final architecture</h2>
        <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm text-foreground">
          Orion 2 BMS (CAN) → ESP32 telemetry board → Wi-Fi → Laptop → Python logger → InfluxDB 3 Core → Grafana dashboard
        </div>
        <p className="text-foreground leading-relaxed">
          A key detail: during early development we used a CANdapter (USB-CAN) only as a temporary way to access CAN and validate decoding while the real telemetry boards were being made. The permanent solution is the ESP32 telemetry board in the car sending data wirelessly.
        </p>
        <p className="text-muted text-sm italic">
          Scope note: I did not design the ESP32 telemetry transmitter board hardware. That board was designed and built by Xiuting Shi, the Driver Controls lead for Sunstang. My work focused on the receiving side (laptop ingestion + decoding + database + dashboards), on validating the end-to-end pipeline, and the rest of the BMS set up and battery pack.
        </p>
      </section>

      {/* Wiring Image */}
      <div className="overflow-hidden bg-muted aspect-video rounded-lg">
        <img
          src={bmsWiringImage}
          alt="Working on the battery pack wiring"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Tool choices */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Tool and software choices</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-foreground">Python (receiver + decoder)</h3>
            <p className="text-foreground leading-relaxed">
              Python gave the best "fast iteration" path for reading CAN frames (directly from CANdapter during development), parsing payloads into real engineering units, writing to a time-series database, and logging/debugging quickly while bench testing. This is the part that ultimately makes the whole chain reliable: the logger is where "raw bytes" become "pack voltage".
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-foreground">InfluxDB 3 Core (storage)</h3>
            <p className="text-foreground leading-relaxed">
              InfluxDB 3 was chosen because it's strong at high-rate time-series ingestion, lightweight local deployment (easy to run on a laptop), and SQL-style querying (InfluxDB 3's IOx/SQL model makes debugging tables and fields much easier).
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-foreground">Grafana (visualization)</h3>
            <p className="text-foreground leading-relaxed">
              Grafana is the best tool for a race-day dashboard: great "at a glance" stat panels, time-series plots with filtering (by car ID, time window, etc.), and easy iteration on layout and thresholds as the team learns what's important during testing.
            </p>
          </div>
        </div>
      </section>

      {/* Development Workflow */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">Development workflow</h2>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Phase 1 — Prove we can capture CAN frames</h3>
          <p className="text-foreground leading-relaxed">
            Before decoding anything, I built and validated a "raw CAN visibility" layer. This mattered because when telemetry isn't working, you must be able to answer: Are we not receiving frames… or are we receiving frames but decoding wrong?
          </p>
          <p className="text-foreground leading-relaxed">
            So I built a raw ingestion path that writes a table with time, arb_id, dlc, data_hex, source, and car_id. This enabled a debugger dashboard that shows things like "Last CAN ID", "Frames in Window", "Latest Frames", etc.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Phase 2 — Create a stable "race telemetry" CAN message</h3>
          <p className="text-foreground leading-relaxed">
            To make the pipeline consistent and lightweight over Wi-Fi, we standardized around a single BMS CAN frame with a fixed mapping. Instead of trying to ingest many Orion messages, we used a single "race telemetry" message that the BMS transmits on a fixed interval.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Phase 3 — Lock the BMS-side message mapping</h3>
          <p className="text-foreground leading-relaxed">
            A big lesson: the decoder is only correct if the BMS message mapping matches exactly. We configured a race telemetry frame with ID: 0x6B0, Period: ~100 ms, on CAN1.
          </p>
          <div className="bg-muted/30 p-4 rounded-lg space-y-1 text-sm font-mono text-foreground">
            <p>Race Telemetry CAN message (0x6B0):</p>
            <p>• Bytes 0–1: Pack Voltage (unsigned, little-endian), 0.1 V/count</p>
            <p>• Bytes 2–3: Pack Current (signed int16, little-endian), 0.1 A/count</p>
            <p>• Byte 4: SOC (unsigned), 0.5 %/count</p>
            <p>• Byte 5: Average Temp (signed), 1 °C/count</p>
            <p>• Byte 6: Max Temp (signed), 1 °C/count</p>
            <p>• Byte 7: Fault Flags / Custom Flag #0 (bitfield)</p>
          </div>
          <p className="text-foreground leading-relaxed">
            This mapping became "the contract" between Orion 2 configuration, ESP32 transmitter payload, Python decoder, and Grafana queries/panels.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Phase 4 — Decode in Python and write clean telemetry to InfluxDB</h3>
          <p className="text-foreground leading-relaxed">
            Once raw logging was verified, I implemented the decoded pipeline: every time the raw frame arrives, the logger extracts the correct bytes, converts them using the correct scaling, and writes a clean row into a decoded table (bms_telemetry) with fields like pack_voltage, pack_current, soc, avg_temp, max_temp, fault_flag, plus identifiers like car_id and timestamps.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Phase 5 — Build the race dashboard</h3>
          <p className="text-foreground leading-relaxed">
            With decoded telemetry flowing, I created the Grafana dashboard panels that matter on race day: SOC (stat), Max Temperature (stat), BMS Fault Flag (stat with OK/FAULT mapping), Pack Voltage (time-series), Pack Current (time-series), and Average Temperature vs Time (time-series).
          </p>
          <p className="text-foreground leading-relaxed">
            Dashboard design focus: readable from far away, fast to interpret, minimal clutter, and thresholds that reflect real operational limits.
          </p>
        </div>
      </section>

      {/* Team Image */}
      <div className="overflow-hidden bg-muted aspect-video rounded-lg">
        <img
          src={bmsTeamImage}
          alt="The battery team celebrating a successful test"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Validation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Validation & troubleshooting</h2>
        <p className="text-foreground leading-relaxed">
          This project wasn't "done" when data showed up — it was done when the data was believable.
        </p>
        <p className="text-foreground leading-relaxed">
          Some of the practical validation steps included database sanity checks (querying the decoded table directly to confirm fields update), transport sanity checks (confirming raw frames exist even when decoded values look wrong), known-value comparisons (comparing Orion 2 software readings to decoded telemetry), and sensor unplug tests (verifying temps and current go to expected values when sensors are missing).
        </p>
        <p className="text-foreground leading-relaxed">
          We also dealt with real integration issues: COM port permissions, token/auth errors to InfluxDB, Grafana query/table naming mismatches, "No data" panels caused by querying the wrong table, and decoding mistakes caused by endian/scaling mismatches.
        </p>
        <p className="text-foreground leading-relaxed">
          Each time the fix followed a consistent process: Is raw CAN present? → Is decoded table being written? → Do Grafana queries match the table + field names? → Do decoded values match expected physical reality?
        </p>
      </section>

      {/* Deliverables */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Deliverables</h2>
        <ul className="list-disc list-inside text-foreground space-y-2 ml-4">
          <li>A Python decoded logger that turns the race telemetry CAN message into real engineering values and writes them into InfluxDB</li>
          <li>A Grafana race dashboard export designed for SOC/voltage/current/temps/fault state</li>
          <li>A debugger dashboard (raw CAN visibility) to rapidly prove whether data transport is working</li>
          <li>Documentation and repository structure so the system can be reproduced by someone else on the team</li>
        </ul>
      </section>

      {/* Results */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Results and impact</h2>
        <p className="text-foreground leading-relaxed">
          By the end of this work, we had a telemetry pipeline where raw CAN traffic can be verified independently of decoding, decoded values are stored in a queryable database, the dashboard shows the exact values needed for testing and racing, and the system is aligned with our final in-car architecture (CAN → ESP32 → Wi-Fi → laptop → InfluxDB → Grafana).
        </p>
        <p className="text-foreground leading-relaxed font-medium">
          This is the difference between "we think the BMS is fine" and "we can prove, log, and diagnose what the pack is doing at any moment."
        </p>
      </section>

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
