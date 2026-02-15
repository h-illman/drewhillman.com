import biolockWorkbench from "@/assets/arduino-biolock.png";
import biolockTinkercad from "@/assets/biolock-tinkercad.png";
import biolockSchematic from "@/assets/biolock-schematic.png";
import biolockPcb from "@/assets/biolock-eagle-pcb.png";

const BioLockContent = () => {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="prose prose-lg max-w-none">
        <p className="text-foreground leading-relaxed text-lg">
          A multi-factor biometric security system built around an Arduino Uno, combining fingerprint scanning, RFID authentication, and keypad PIN entry into one compact, affordable prototype — complete with a custom PCB, Bluetooth event logging, and a 3D-printed locking mechanism.
        </p>
      </div>

      {/* Why we built this */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">The idea</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            Commercial security systems are either expensive and over-engineered, or cheap and single-factor. We wanted something in between — a system that layers multiple authentication methods ("something you have," "something you are," "something you know") into one device, all for under $75 in parts. The goal was a functional proof of concept that could actually demonstrate real-world multi-factor access control, not just blink some LEDs.
          </p>
          <p className="text-foreground leading-relaxed">
            This was built as a team of three for our ECE 2242 design course, and we took it from TinkerCAD simulation all the way through to a soldered PCB mounted on a demo base with a working mechanical latch.
          </p>
        </div>
      </section>

      {/* Workbench photo */}
      <div className="my-8">
        <img
          src={biolockWorkbench}
          alt="Workbench during BioLock assembly — soldering station, Arduino, wiring, and components"
          className="w-full rounded-lg border border-border"
        />
        <p className="text-sm text-muted mt-2 text-center">Mid-build on the workbench — PCB design on the laptop, components being wired up</p>
      </div>

      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">How it works</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            The system accepts three forms of authentication, any of which can unlock the latch independently:
          </p>
          <ul className="list-disc list-inside text-foreground space-y-2">
            <li><strong>Fingerprint</strong> — A Geekstory optical fingerprint sensor stores enrolled prints and matches against them in real time. Registered prints trigger an unlock; unrecognized prints are silently rejected.</li>
            <li><strong>RFID</strong> — An RC522 RFID module reads unique card/fob IDs. Authorized tags unlock the system; unauthorized tags trigger the buzzer and an "Access Denied" message on the LCD.</li>
            <li><strong>Keypad PIN</strong> — A 4×4 matrix keypad accepts a configurable PIN code. Correct entry unlocks, incorrect entry sounds the alarm.</li>
          </ul>
          <p className="text-foreground leading-relaxed">
            On a successful authentication, the LCD displays "Welcome!", a servo motor physically rotates the 3D-printed door latch to the open position, and the event is logged over Bluetooth. On a failed attempt, the piezo buzzer sounds, the LCD shows a denial message, and that event gets logged too.
          </p>
        </div>
      </section>

      {/* TinkerCAD image */}
      <div className="my-8">
        <img
          src={biolockTinkercad}
          alt="TinkerCAD circuit simulation of the BioLock system"
          className="w-full rounded-lg border border-border"
        />
        <p className="text-sm text-muted mt-2 text-center">TinkerCAD simulation — used to validate wiring and code logic before breadboarding</p>
      </div>

      {/* The hardware */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">The hardware stack</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <h3 className="text-xl font-medium text-foreground">Sensors & inputs</h3>
          <ul className="list-disc list-inside text-foreground space-y-2">
            <li><strong>Geekstory Fingerprint Sensor</strong> — optical biometric scanner with serial communication for enrolling and matching prints</li>
            <li><strong>RC522 RFID Module</strong> — reads 13.56 MHz tags/cards via SPI, each with a unique UID</li>
            <li><strong>4×4 Matrix Keypad</strong> — membrane keypad for PIN entry, connected via I2C bus to save pins</li>
          </ul>

          <h3 className="text-xl font-medium text-foreground mt-6">Actuators & outputs</h3>
          <ul className="list-disc list-inside text-foreground space-y-2">
            <li><strong>SG90 Servo Motor</strong> — drives the 3D-printed sliding latch mechanism</li>
            <li><strong>16×2 LCD Display</strong> — provides real-time user feedback via I2C</li>
            <li><strong>Piezo Buzzer</strong> — active-high buzzer for unauthorized access alerts</li>
            <li><strong>HC-05 Bluetooth Module</strong> — streams timestamped event logs to a paired Android device via serial</li>
          </ul>

          <h3 className="text-xl font-medium text-foreground mt-6">The brains</h3>
          <p className="text-foreground leading-relaxed">
            Everything runs on an Arduino Uno — which sounds simple, but with only one hardware serial port and limited pins, we had to get creative. The fingerprint sensor and Bluetooth module both need serial, so we programmed the system to enable them at separate intervals to prevent TX/RX conflicts. We also hit an I2C address clash between the keypad module and the LCD, which was fixed by soldering a jumper on the LCD to assign it a unique address.
          </p>
        </div>
      </section>

      {/* PCB Design */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">From breadboard to PCB</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            After getting everything working on a breadboard, we designed a custom PCB in Autodesk EAGLE to act as an Arduino shield. The schematic was cross-referenced against our breadboard wiring and the TinkerCAD model at every step — one wrong pin and the whole thing doesn't work.
          </p>
          <p className="text-foreground leading-relaxed">
            During the PCB layout phase, we focused on trace spacing and width to make hand-soldering as forgiving as possible. This turned out to be a good call — we ran into a trace lifting issue during soldering that could have been a lot worse with tighter margins. The PCB was fabricated at Western's Electronics Shop and then populated by hand.
          </p>
        </div>
      </section>

      {/* Schematic and PCB images side by side */}
      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <img
            src={biolockSchematic}
            alt="EAGLE wiring schematic for the BioLock Arduino shield"
            className="w-full rounded-lg border border-border"
          />
          <p className="text-sm text-muted mt-2 text-center">EAGLE wiring schematic</p>
        </div>
        <div>
          <img
            src={biolockPcb}
            alt="EAGLE PCB layout for the custom Arduino shield"
            className="w-full rounded-lg border border-border"
          />
          <p className="text-sm text-muted mt-2 text-center">PCB layout sent to fab</p>
        </div>
      </div>

      {/* Challenges */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Problems we ran into</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            Honestly, most of the project time was spent debugging. A few highlights:
          </p>
          <ul className="list-disc list-inside text-foreground space-y-2">
            <li><strong>Serial port conflict</strong> — The Uno has one hardware serial port. Both the fingerprint sensor and Bluetooth module need it. We wrote the code to time-division multiplex them, only enabling one at a time.</li>
            <li><strong>I2C address collision</strong> — The keypad I2C expander and LCD shipped with the same default address. Fixed with a hardware jumper on the LCD board.</li>
            <li><strong>Servo current draw</strong> — The servo occasionally pulled enough current to brownout the Arduino, causing random resets. We added a pull-down resistor (which didn't fully fix it) and ultimately managed it through code by only powering the servo during the unlock window.</li>
            <li><strong>Trace lifting</strong> — During PCB soldering, one of the traces lifted from the board. The extra spacing we'd built into the layout gave us room to rework it without scrapping the board.</li>
          </ul>
        </div>
      </section>

      {/* Testing */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Testing & results</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            Every authentication method was tested both in isolation and as part of the integrated system. We ran valid and invalid inputs across all three methods — correct and incorrect fingerprints, authorized and unauthorized RFID tags, right and wrong PINs. All six test cases passed: valid inputs unlocked the latch with a welcome message, invalid inputs triggered the buzzer and denial message.
          </p>
          <p className="text-foreground leading-relaxed">
            Bluetooth logging was verified by pairing with a Samsung Tab S9 running MySerialMonitor. Every access event — successful or denied — showed up with a timestamp. The 3D-printed latch mechanism also worked reliably after we added tolerance to the print dimensions to prevent binding.
          </p>
        </div>
      </section>

      {/* What I learned */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">What I took away</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <ul className="list-disc list-inside text-foreground space-y-2">
            <li>Resource management on constrained hardware is a different kind of engineering — you can't just add another library or throw more RAM at it</li>
            <li>PCB design forces you to commit. Breadboards forgive messy wiring; PCBs don't. The discipline of getting the schematic right before sending it to fab was valuable</li>
            <li>Multi-factor auth isn't just a software concept — implementing it in hardware gives you a much deeper appreciation for why each layer exists</li>
            <li>The best debugging tool is a systematic process. We spent less time fixing bugs once we started isolating each subsystem individually before integrating</li>
          </ul>
          <p className="text-foreground leading-relaxed mt-4">
            The total bill of materials came in at $60.84, well under our $75 budget. For future work, swapping the Uno for an ESP32 would unlock Wi-Fi connectivity and a second serial port, solving most of the hardware limitations we worked around.
          </p>
        </div>
      </section>
    </div>
  );
};

export default BioLockContent;
