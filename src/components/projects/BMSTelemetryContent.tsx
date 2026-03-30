import bmsWiringImage from "@/assets/bms-wiring.jpg";
import bmsTeamImage from "@/assets/bms-team.jpg";
import bmsDashboardImage from "@/assets/bms-dashboard.png";
import telemetryPcbImage from "@/assets/telemetry-pcb.png";
import TextLink from "@/components/ui/TextLink";

const BMSTelemetryContent = () => {
  return (
    <div className="space-y-8">
      {/* Intro / Preamble */}
      <div className="prose prose-lg max-w-none space-y-4">
        <p className="text-foreground leading-relaxed text-lg">
          Last year's car ran an Orion 1 BMS. It broke on the way to competition. Not during a race, not under extreme load — on the way there. So heading into this year, we had a choice: try to fix the old unit, or upgrade to the Orion 2 and retrofit it into a battery pack and electrical system that was never designed for it.
        </p>
        <p className="text-foreground leading-relaxed">
          We went with the upgrade. What I thought would be a fairly contained swap turned into a full systems-integration project. The Orion 2 has a different connector layout, different software, different CAN message structure, and a completely different approach to thermistor inputs. Nothing was plug-and-play. I had to understand how every interface on the BMS connected to the existing pack — voltage taps, I/O wiring, current sensing, thermistor expansion, CAN communication — and make it all work together without redesigning the pack itself.
        </p>
        <p className="text-foreground leading-relaxed">
          On top of that, the BMS only shows you data live. The moment you unplug, everything's gone. So I also built a telemetry and data-logging pipeline from scratch so we could record, visualize, and actually use the battery data — not just watch it flicker on a screen.
        </p>
      </div>

      {/* What the system does */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">What the system actually does</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            At a high level, the Orion 2 BMS monitors every cell in our 40p30s lithium-ion battery pack. It tracks individual cell voltages and internal resistances through 30 voltage tap connections, reads pack current through a hall-effect sensor (a LEM DHAB S/134), and gets temperature readings from thermistors distributed across the pack. It uses all of that to calculate state of charge, enforce safety limits, and manage charge/discharge enables.
          </p>
          <p className="text-foreground leading-relaxed">
            The telemetry side takes that data — voltage, current, SOC, temperatures, fault flags — encodes it into CAN messages, and pushes it through an ESP32 transmitter over Wi-Fi into a cloud database. From there, a React dashboard subscribes to real-time updates so anyone on the team can check pack health from their phone. No laptop tethered to the car required.
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

      {/* Integration story */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Making the Orion 2 fit</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            The BMS connects to the pack through three distinct interfaces: the voltage taps, the main I/O connector, and the current/thermistor port. Each one had its own set of problems.
          </p>
          <p className="text-foreground leading-relaxed">
            The voltage taps were the most straightforward — 30 wires, one per cell group, routed through the pack in a specific pattern. The wiring was already there from the previous BMS, but I had to verify every single connection against the Orion 2's expected order. Get one tap on the wrong cell and the BMS reports a voltage that looks almost right but isn't, which is genuinely worse than an obvious fault.
          </p>
          <p className="text-foreground leading-relaxed">
            The I/O connector is where most of the car talks to the BMS — charge enable, discharge enable, J1772 control pilot, ready power, always-on power, and both CAN buses. It routes through the high-power box where relays and boards divide everything up. I had to trace the existing wiring back to the I/O pinout and make sure each signal landed on the right pin. The colour coding helped, but some of those wires had seen better days.
          </p>
          <p className="text-foreground leading-relaxed">
            The current sensor was pretty direct — four shielded wires from the LEM sensor into the BMS. It reads zero amps unless the pack is under load, which tripped me up early on when I thought the sensor wasn't working. It was. There was just nothing to measure.
          </p>
          <p className="text-foreground leading-relaxed">
            The thermistors were the interesting part. None of them connect directly to the BMS's analog thermistor pins. Instead, they all go through a thermistor expansion module that sits inside the pack and communicates with the BMS over CAN. This means the BMS thermal settings page should have zero active thermistors selected — all the temperature data comes in digitally over the CAN network. That distinction cost me a couple hours of confusion before I figured out why the BMS wasn't reading any temperatures.
          </p>
          <p className="text-foreground leading-relaxed">
            The expansion module itself is wired to always-on power (instead of the recommended ready/charge power split), connected to CAN2 on the BMS, and has its own termination resistor on the CAN line. Getting it to talk to the BMS required configuring it as an addon device in the Orion utility and making sure the CAN bus settings matched on both ends.
          </p>
        </div>
      </section>

      {/* Bench testing / debugging */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Bench testing and making the data trustworthy</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            Before anything went back in the car, I set up a test bench with the BMS connected to the pack outside the vehicle. Voltage taps plugged in, current sensor connected, thermistor expansion module wired up, and the I/O connector rigged with temporary soldered wires to simulate the inputs that would normally come from the high-power box.
          </p>
          <p className="text-foreground leading-relaxed">
            The point was to validate every reading before it mattered. I went through each cell voltage in the Orion utility and cross-checked it against a multimeter. Checked that the current sensor was reading correctly under load. Confirmed that the thermistor expansion module was sending temperature data over CAN and that the BMS was receiving it.
          </p>
          <p className="text-foreground leading-relaxed">
            The software side was its own project. The Orion utility has a profile setup wizard that auto-detects some things (like the battery chemistry — we use Panasonic NCR18650B cells), but a lot of it is manual. I had to configure the J1772 charger interface settings, make sure the multi-purpose inputs were mapped correctly for charge control, set up the thermistor expansion module as an addon, and program the custom CAN messages.
          </p>
          <p className="text-foreground leading-relaxed">
            The diagnostic trouble codes panel became my best friend. The BMS has a green light for "all clear" and red for "something's wrong," but the actual fault codes tell you what's happening — thermistor faults, low cell voltage, open wiring, current sensor issues, isolation faults. Some are critical, some are just the BMS complaining that you don't have everything plugged in yet. Learning which ones to care about and which to ignore during bench testing was a skill in itself.
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

      {/* Telemetry stack */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Building the telemetry pipeline</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            Here's the thing about the Orion 2: it only shows you data live. It's entirely volatile. The moment you unplug the CANdapter or close the utility, every reading is gone. There's no onboard logging, no history, no way to go back and look at what happened during a test run. For a student race team that needs to make decisions based on battery behavior over time, that's a real problem.
          </p>
          <p className="text-foreground leading-relaxed">
            So I built the logging and visualization layer myself.
          </p>

          <h3 className="text-xl font-semibold text-foreground pt-2">Round one: InfluxDB + Grafana</h3>
          <p className="text-foreground leading-relaxed">
            I started with the obvious choice for time-series data — InfluxDB for storage and Grafana for dashboards. I wrote a Python script that hooked into the CAN bus via the CANdapter (connected through the I/O connector on pins 18 and 19), read the raw hex frames, decoded them using the message spec I'd programmed into the BMS, and pushed everything into InfluxDB.
          </p>
          <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm text-foreground">
            Orion BMS (CAN) → CANdapter → Python Decoder → InfluxDB → Grafana
          </div>
          <p className="text-foreground leading-relaxed">
            The decoding is where the real work was. The primary telemetry message (<code className="text-sm bg-muted/50 px-1 rounded">0x6B0</code>) packs eight bytes with pack voltage, current, SOC, temperatures, and fault flags — each with its own byte length, endianness, signedness, and scaling factor. Pack voltage is an unsigned 16-bit little-endian value in 0.1V units. Current is signed 16-bit in 0.1A units. SOC is a single byte at 0.5% resolution. Get the byte order or signedness wrong and you end up with numbers that look almost plausible but aren't.
          </p>
          <p className="text-foreground leading-relaxed">
            This stack was great for bench testing. I built a full dashboard with voltage tracking, temperature trends, and fault flags. InfluxDB handled thousands of data points per second without breaking a sweat. But it was still a local tool — it needed a laptop running in the pit lane, and it wasn't something the whole team could access.
          </p>

          <h3 className="text-xl font-semibold text-foreground pt-2">Round two: taking it to the cloud</h3>
          <p className="text-foreground leading-relaxed">
            I wanted something the pit crew could pull up on their phones. So I migrated the backend to Supabase and built a custom React frontend. The car broadcasts CAN data over Wi-Fi via an ESP32 transmitter board, a Python gateway script picks it up and pushes decoded values to Supabase, and the React dashboard subscribes to real-time updates via WebSockets.
          </p>
          <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm text-foreground">
            Orion BMS → ESP32 → Wi-Fi → Python Gateway → Supabase → React Dashboard
          </div>
        </div>
      </section>

      {/* Telemetry PCB */}
      <div className="my-8">
        <img
          src={telemetryPcbImage}
          alt="Custom telemetry PCB designed for the ESP32 CAN transmitter"
          className="w-full rounded-lg border border-border"
        />
        <p className="text-muted text-sm italic mt-2">
          The custom telemetry PCB, designed by Lucas Yu and Xiuting Shi (Driver Controls), that handles CAN-to-Wi-Fi transmission from the car.
        </p>
      </div>

      <section className="space-y-4">
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-muted text-sm italic">
            The ESP32 transmitter was designed by Xiuting Shi and Lucas Yu on the Driver Controls team. I focused on everything from the receiving end forward — ingestion, decoding, database, and the frontend.
          </p>
          <p className="text-foreground leading-relaxed">
            Supabase's Realtime feature is what makes this work. The database pushes updates to the frontend over WebSockets whenever a new row lands. No polling, no refresh buttons — the gauges just update. I also added a "deadman switch": if no data comes in for five seconds, the status indicator turns red so the crew knows telemetry is down. Partly practical, partly because I thought it looked cool.
          </p>
        </div>
      </section>

      {/* CAN contract */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">The CAN message contract</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            The hardest part of the telemetry pipeline wasn't the database or the frontend — it was getting the contract right between the BMS, the decoder, and the dashboard. If the byte layout in the Python decoder doesn't match what I programmed into the Orion utility, the dashboard shows garbage. And CAN garbage looks deceptively close to real data, so you can stare at it for a while before realizing something's off.
          </p>
          <p className="text-foreground leading-relaxed">
            The primary telemetry message (<code className="text-sm bg-muted/50 px-1 rounded">0x6B0</code>) broadcasts every ~100ms on CAN1:
          </p>
          <div className="bg-muted/30 p-4 rounded-lg space-y-1 text-sm font-mono text-foreground">
            <p>Bytes 0–1: Pack Voltage (Unsigned 16-bit LE, 0.1V units)</p>
            <p>Bytes 2–3: Pack Current (Signed 16-bit LE, 0.1A units)</p>
            <p>Byte 4: State of Charge (0.5% per count)</p>
            <p>Byte 5: Average Temperature (1°C per count)</p>
            <p>Byte 6: High Temperature (1°C per count)</p>
            <p>Byte 7: Fault Bitfield (custom flags)</p>
          </div>
          <p className="text-foreground leading-relaxed">
            The fault byte is a custom bitfield I configured in the Orion utility — each bit maps to a specific diagnostic trouble code: MIL error, charge interlock, thermistor fault, low cell voltage, open wiring, current sensor fault, internal logic fault, and high-voltage isolation fault. The Python decoder unpacks all of this with the right bit-shifting and scaling so the dashboard shows real, meaningful numbers.
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

      {/* Reflection */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">What I took away from this</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            This project taught me more about real engineering than any course has. Not because the individual pieces were hard — CAN decoding, database writes, React dashboards, none of that is rocket science on its own. What made it hard was that nothing existed in isolation. Every decision on the hardware side rippled into the software side. Every assumption I made about the wiring had to be verified against the actual pack. Every CAN message had to match between three different systems that were all configured independently.
          </p>
          <p className="text-foreground leading-relaxed">
            It also taught me the value of documentation. I wrote a full master doc for the Orion 2 setup — every wiring connection, every software setting, every CAN byte layout — because I know what it's like to inherit a system that someone set up and never explained. The next person who works on this pack shouldn't have to reverse-engineer what I did.
          </p>
          <p className="text-foreground leading-relaxed">
            We went from "we think the battery is fine" to "we can prove it." The raw CAN traffic can be verified independently, decoded values live in a queryable cloud database, and the dashboard is accessible to the entire team with sub-second latency. Anyone can pull it up, anywhere. That was the whole goal, and it works.
          </p>
        </div>
      </section>

      {/* GitHub Link */}
      <section className="pt-4">
        <p className="text-foreground">
          View the telemetry code on{" "}
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
