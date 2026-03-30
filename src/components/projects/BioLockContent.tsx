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
          A multi-factor security system built on an Arduino Uno that combines fingerprint scanning, RFID, and keypad PIN entry into one device — with a custom PCB, Bluetooth logging, and a 3D-printed locking mechanism. Total cost: under $61.
        </p>
      </div>

      {/* Why */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">The idea</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            Most commercial security systems are either way too expensive and overbuilt, or cheap and single-factor. We wanted something in between — a system that layers "something you have" (RFID), "something you are" (fingerprint), and "something you know" (PIN) into one device, all for under $75 in parts.
          </p>
          <p className="text-foreground leading-relaxed">
            We built this as a team of three for our ECE 2242 design course. We took it from TinkerCAD simulation all the way to a soldered PCB mounted on a demo base with a working mechanical latch. It's a real, functioning thing — not just a breadboard prototype that works if you don't breathe on it.
          </p>
        </div>
      </section>

      {/* Workbench photo */}
      <div className="my-8">
        <img
          src={biolockWorkbench}
          alt="Workbench during BioLock assembly"
          className="w-full rounded-lg border border-border"
        />
        <p className="text-sm text-muted mt-2 text-center">Mid-build — PCB design on the laptop, components getting wired up</p>
      </div>

      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">How it works</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            Any of the three authentication methods can unlock the latch on its own. The fingerprint sensor stores enrolled prints and matches in real time. The RFID module reads card UIDs and checks them against an authorized list. The keypad accepts a configurable PIN. Get any of them right and the LCD says "Welcome!", the servo rotates the latch open, and the event gets logged over Bluetooth. Get it wrong and the buzzer goes off, the LCD shows a denial message, and that gets logged too.
          </p>
          <p className="text-foreground leading-relaxed">
            The Bluetooth logging was a nice touch. We paired it with a Samsung tablet running a serial monitor app, so every access attempt showed up with a timestamp. It's a small feature but it made demos way more convincing.
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
        <p className="text-sm text-muted mt-2 text-center">TinkerCAD simulation — validated the wiring and logic before committing to a breadboard</p>
      </div>

      {/* The hardware challenges */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Where it got tricky</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            Everything runs on an Arduino Uno, which sounds simple until you realize it has one hardware serial port and not that many pins. The fingerprint sensor and Bluetooth module both need serial, so we wrote the code to time-division multiplex them — only one is active at a time. It works, but it's the kind of constraint that makes you appreciate microcontrollers with more than one UART.
          </p>
          <p className="text-foreground leading-relaxed">
            We also hit an I2C address collision between the keypad expander module and the LCD — they shipped with the same default address. Fixed it by soldering a jumper on the LCD board. It's a two-minute fix once you know what's wrong, but figuring out why the keypad was acting weird took considerably longer.
          </p>
          <p className="text-foreground leading-relaxed">
            The servo was another headache. It pulled enough current to occasionally brownout the Arduino, causing random resets mid-operation. We tried a pull-down resistor first, which didn't fully fix it, and eventually managed it in code by only powering the servo during the actual unlock window. Not elegant, but reliable.
          </p>
        </div>
      </section>

      {/* PCB section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Going from breadboard to PCB</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            Once everything worked on the breadboard, we designed a custom PCB in Autodesk EAGLE to sit on top of the Arduino as a shield. We cross-referenced the schematic against our breadboard wiring and the TinkerCAD model at every step — one wrong pin and you're debugging a physical board, which is a lot less fun than debugging software.
          </p>
          <p className="text-foreground leading-relaxed">
            We intentionally made the trace spacing wider than strictly necessary to make hand-soldering more forgiving. That turned out to be a good decision. We lifted a trace during soldering, and the extra margins gave us room to rework it without scrapping the board. The PCB was fabricated at Western's Electronics Shop and populated by hand.
          </p>
        </div>
      </section>

      {/* Schematic and PCB images */}
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

      {/* Testing */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Did it work?</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            Yeah. We tested every authentication method with both valid and invalid inputs — correct and wrong fingerprints, authorized and unauthorized RFID tags, right and wrong PINs. All six test cases passed cleanly. The latch mechanism worked reliably after we added some tolerance to the 3D print dimensions to prevent binding, and the Bluetooth logging captured every event.
          </p>
        </div>
      </section>

      {/* What I learned */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">What I took away from it</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            Working with constrained hardware is a completely different kind of engineering than software. You can't add a library or throw more RAM at the problem — you have to think about every pin, every milliamp, every byte of serial buffer. PCB design forces you to commit in a way that breadboards don't. The discipline of getting the schematic right before sending it to fab taught me a lot about being careful with design decisions upfront.
          </p>
          <p className="text-foreground leading-relaxed">
            The biggest process lesson was that we spent far less time debugging once we started isolating subsystems individually before integrating. Testing the fingerprint sensor alone, then RFID alone, then keypad alone, then combining them — it's obvious in hindsight, but it's easy to skip when you're excited to see the whole thing work.
          </p>
          <p className="text-foreground leading-relaxed">
            If I were doing it again, I'd swap the Uno for an ESP32. You'd get Wi-Fi, a second serial port, and more pins — which would eliminate most of the hardware workarounds we had to build.
          </p>
        </div>
      </section>
    </div>
  );
};

export default BioLockContent;
