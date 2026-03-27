import fpgaBoardImage from "@/assets/fpga-board.png";
import fpgaGameplayImage from "@/assets/fpga-pong-gameplay.png";
import TextLink from "@/components/ui/TextLink";

const FPGAPongContent = () => {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="prose prose-lg max-w-none space-y-4">
        <p className="text-foreground leading-relaxed text-lg">
          This project started because I was frustrated with how abstract FPGA development felt. You write code, compile it, load it onto the board, and then... a couple LEDs blink. Maybe a hex digit changes on the seven-segment display. It works, technically, but it never really felt like I understood what the hardware was doing. The connection between the code and the physical behavior was hard to see.
        </p>
        <p className="text-foreground leading-relaxed">
          So I decided to build something where that connection would be obvious. Pong is simple enough that the game logic is easy to follow, but it touches almost every part of the FPGA that matters: real-time I/O, memory-mapped peripherals, graphics rendering, timing, and user input. If I could get Pong running on hardware, I'd actually understand how all those pieces fit together.
        </p>
      </div>

      {/* Board image */}
      <div className="my-8">
        <img
          src={fpgaBoardImage}
          alt="DE10-Standard FPGA board displaying the game score on seven-segment displays"
          className="w-full rounded-lg border border-border"
        />
      </div>

      {/* The problem */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Why this project exists</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            A lot of students in microprocessor and FPGA courses struggle with the same thing I did. The code lives in an abstract environment, and the feedback from the hardware is minimal. You can read about memory-mapped I/O and timing constraints in a textbook, but until you see your code directly controlling something visual and interactive, it doesn't really click.
          </p>
          <p className="text-foreground leading-relaxed">
            Pong was a good vehicle for this because it's a game everyone already understands. There's no time wasted explaining what it's supposed to do. Instead, all the focus goes into how it works at the hardware level: how the paddles move based on analog input, how the ball position updates every frame, how collisions are detected, and how the whole thing gets drawn to a screen in real time.
          </p>
        </div>
      </section>

      {/* What the system does */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">What the system does</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            Each player controls their paddle using a potentiometer connected to the board's ADC. The analog voltage from the dial gets sampled by polling the ADC at memory address <code className="text-sm bg-muted/50 px-1 rounded">0xFF204000</code>, and that 12-bit value gets mapped directly to the paddle's vertical position on screen. Turn the dial, the paddle moves. It's immediate and tactile, which is the whole point.
          </p>
          <p className="text-foreground leading-relaxed">
            The game logic runs on a tick-based system using the hardware timer. Every tick, the ball position updates, collision checks run against the paddles and walls, and the bounce angle adjusts based on where the ball hits the paddle. If the ball passes a player's side, the opposing player scores and the point shows up on the seven-segment displays.
          </p>
          <p className="text-foreground leading-relaxed">
            All of the graphics are rendered through the VGA controller by writing pixel data directly to the pixel buffer at <code className="text-sm bg-muted/50 px-1 rounded">0x08000000</code>. Every frame, I calculate the positions of the ball, paddles, and court boundaries, then write 16-bit color values to the corresponding memory locations. The monitor just displays whatever is in that buffer, so the rendering is deterministic and predictable.
          </p>
        </div>
      </section>

      {/* Technical breakdown */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">How it works under the hood</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <h3 className="text-xl font-semibold text-foreground pt-2">ADC input handling</h3>
          <p className="text-foreground leading-relaxed">
            The potentiometers are connected to the DE10-Standard's onboard ADC. The software continuously polls the ADC register to read the current dial position. The raw 12-bit value gets scaled to the screen's vertical resolution, and that becomes the paddle's Y coordinate. There's no smoothing or filtering needed because the ADC is responsive enough that the paddle tracks the dial position cleanly.
          </p>

          <h3 className="text-xl font-semibold text-foreground pt-2">VGA graphics output</h3>
          <p className="text-foreground leading-relaxed">
            The VGA display is memory-mapped. Each pixel on the screen corresponds to an address in the pixel buffer. To draw something, I write a 16-bit color value to the address that maps to that pixel's X/Y coordinates. To move something, I clear its old position (write background color) and write the new position. It's simple, but it means I'm responsible for every pixel on the screen. There's no GPU, no frame buffer abstraction, no draw calls. Just raw memory writes.
          </p>

          <h3 className="text-xl font-semibold text-foreground pt-2">Game loop and timing</h3>
          <p className="text-foreground leading-relaxed">
            The game runs on a timer interrupt that fires at a fixed interval. Each tick reads the ADC, updates the ball position, checks for collisions, and redraws the frame. The fixed tick rate keeps the game speed consistent regardless of what else is happening. Without it, the ball speed would depend on how fast the processor could loop through the code, which is not something you want in a game.
          </p>

          <h3 className="text-xl font-semibold text-foreground pt-2">Collision detection and ball physics</h3>
          <p className="text-foreground leading-relaxed">
            Collision detection checks the ball's position against the paddle boundaries and the top/bottom walls each tick. Wall collisions are straightforward: the vertical component of the ball's velocity inverts. Paddle collisions are more interesting. The bounce angle depends on where the ball hits the paddle surface. Hitting the center sends it back roughly straight, while hitting the edges sends it off at a steeper angle. This gives players some control over their shots, which makes the game actually feel like Pong.
          </p>

          <h3 className="text-xl font-semibold text-foreground pt-2">Score display</h3>
          <p className="text-foreground leading-relaxed">
            Each player's score is displayed on the seven-segment displays on the DE10 board. When a player scores, the corresponding display updates. It reuses the same seven-segment driver logic from the earlier labs in the course, which was one of the nice things about this project: it pulled together techniques from across the semester into one cohesive system.
          </p>
        </div>
      </section>

      {/* Gameplay image */}
      <div className="my-8">
        <img
          src={fpgaGameplayImage}
          alt="Pong game running on a monitor via VGA output from the FPGA"
          className="w-full rounded-lg border border-border"
        />
      </div>

      {/* Development approach */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">How I built it</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            I broke the project into small, testable modules and validated each one on the hardware before moving on. The ADC reading was tested first in isolation: just read the potentiometer and print the value to the seven-segment display. Then VGA output: draw a static rectangle on the screen. Then ball movement with no input. Then paddle control. Then collision. Then scoring.
          </p>
          <p className="text-foreground leading-relaxed">
            This incremental approach saved me a lot of debugging time. When something didn't work after integration, I usually knew which module was the problem because everything else had already been verified independently. It also meant I could demo progress at each stage, which was motivating. Seeing a paddle move on screen for the first time was genuinely exciting, even though it was just a rectangle.
          </p>
        </div>
      </section>

      {/* Challenges */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Challenges and decisions</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            The biggest challenge was getting the game loop to feel right. The first version ran too fast because I wasn't using the hardware timer properly, and the ball would fly across the screen in a fraction of a second. Getting the tick rate tuned so the ball moved at a playable speed, while keeping the paddle input responsive, took more iteration than I expected.
          </p>
          <p className="text-foreground leading-relaxed">
            Drawing and clearing pixels efficiently was another thing I underestimated. If you redraw the entire screen every frame by writing every pixel, the update is too slow and you get visible flicker. Instead, I had to be selective: only clear the pixels where the ball and paddles were last frame, then draw them in their new positions. It's a small optimization, but it's the difference between a smooth game and a flickering mess.
          </p>
          <p className="text-foreground leading-relaxed">
            Debugging on real hardware is also just a different experience than debugging software. There's no print statement, no debugger breakpoint, no stack trace. When something doesn't work, you're staring at a screen that's either showing the wrong thing or nothing at all. I got very good at using the LEDs and seven-segment displays as makeshift debug outputs. Want to know if a collision is being detected? Light up an LED when it fires. Want to know the ball's X position? Display it on the hex digits. It's crude, but it works.
          </p>
        </div>
      </section>

      {/* Results */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">The result</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            The final build is a fully playable two-player Pong game running on the DE10-Standard FPGA. Both players control their paddles with potentiometer dials, the ball bounces with angle-dependent physics, scores display live on the seven-segment displays, and the whole thing renders to a VGA monitor in real time. It plays smoothly, the controls feel responsive, and it actually looks like Pong.
          </p>
          <p className="text-foreground leading-relaxed">
            More importantly, it does what I set out to do. Every part of the system maps clearly to a concept from the course: memory-mapped I/O, ADC sampling, timer interrupts, pixel-level graphics, and hardware-driven game logic. If someone wants to understand how code translates to hardware behavior, they can trace the entire path from potentiometer input to pixel output in this project. That was the whole goal.
          </p>
        </div>
      </section>

      {/* What I learned */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">What I learned</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            This project made me a lot more comfortable thinking at the hardware level. Before building it, I understood memory-mapped peripherals in theory. After building it, I understood them because I had written color values to specific memory addresses and watched them appear on a screen. That's a different kind of understanding, and it sticks.
          </p>
          <p className="text-foreground leading-relaxed">
            I also got a real appreciation for how much work goes into things that seem simple. Pong is about as basic as a game gets, but implementing it from scratch on an FPGA with no operating system, no libraries, and no abstraction layers forces you to think about everything: timing, memory layout, I/O polling, pixel math, state management. It's a good reminder that "simple" and "easy" are very different things.
          </p>
          <p className="text-foreground leading-relaxed">
            The iterative module-by-module approach is something I'll carry into every hardware project going forward. Building small, testing early, and integrating piece by piece is just a better way to work when you can't rely on a debugger to tell you what went wrong.
          </p>
        </div>
      </section>

      {/* GitHub Link */}
      <section className="pt-4">
        <p className="text-foreground">
          View the source code on{" "}
          <TextLink href="https://github.com/h-illman/fpga-pong" external>
            GitHub
          </TextLink>
          .
        </p>
      </section>
    </div>
  );
};

export default FPGAPongContent;