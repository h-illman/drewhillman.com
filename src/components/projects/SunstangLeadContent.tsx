import sunstangMultimeter from "@/assets/sunstang-multimeter.jpg";
import sunstangTeamPack from "@/assets/sunstang-team-pack.jpg";
import sunstangPackWiring from "@/assets/sunstang-pack-wiring.jpg";
import sunstangFriendsMovie from "@/assets/sunstang-friends-movie.jpg";
import sunstangWorkshopCad from "@/assets/sunstang-workshop-cad.jpg";
import sunstangTeamPhoto from "@/assets/sunstang-team-photo.jpg";
import sunstangPackMove from "@/assets/sunstang-pack-move.jpg";
import sunstangFormal from "@/assets/sunstang-formal.jpg";
import sunstangSoldering from "@/assets/sunstang-soldering.jpg";
import sunstangWorkshop from "@/assets/sunstang-workshop.jpg";
import TextLink from "@/components/ui/TextLink";

const SunstangLeadContent = () => {
  return (
    <div className="space-y-8">
      {/* Opening */}
      <div className="prose prose-lg max-w-none space-y-4">
        <p className="text-foreground leading-relaxed text-lg">
          I've been Battery Pack Team Leader at Sunstang since September 2024, and it's become one of the most meaningful things I've done in university. Not because of any single technical accomplishment, but because of the people, the responsibility, and the way the role pushed me to grow as both an engineer and a person.
        </p>
        <p className="text-foreground leading-relaxed">
          Sunstang is Western's solar car team. We design, build, and race a fully electric solar-powered vehicle for the American Solar Challenge. The battery pack is the heart of the car's electrical system, and as lead I'm responsible for the design, integration, testing, and overall direction of the pack and everything connected to it. But honestly, the part of this role I care about most is the team itself.
        </p>
      </div>

      {/* Team photo */}
      <div className="my-8">
        <img
          src={sunstangTeamPhoto}
          alt="The Sunstang team"
          className="w-full rounded-lg border border-border"
        />
        <p className="text-sm text-muted mt-2">The 2024/2025 team at unveiling.</p>
      </div>

      {/* What the role looks like */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">What the role actually looks like</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            On paper, the lead role is about running the battery subteam: setting priorities, assigning work, making sure things get done on schedule, and being the person who understands the full picture of the battery system well enough to make decisions. In practice, it's a lot messier and more human than that.
          </p>
          <p className="text-foreground leading-relaxed">
            A lot of my time goes into helping people. Helping newer members figure out where to start. Sitting down with someone to work through a wiring problem. Explaining how a subsystem works for the third time, because honestly, some of these systems are confusing and it takes a few passes before they click. I spend a good amount of time just being available and present in the shop, making sure people feel like they can ask questions without it being a big deal.
          </p>
          <p className="text-foreground leading-relaxed">
            I organize the weekly work sessions, figure out what needs to happen next, and try to keep things moving without micromanaging. Some weeks that means I'm deep in the technical work. Other weeks I barely touch a tool and spend the whole session bouncing between conversations, unblocking people, or helping someone debug something. Both kinds of sessions feel productive in different ways.
          </p>
        </div>
      </section>

      {/* Workshop vibes */}
      <div className="my-8">
        <img
          src={sunstangWorkshop}
          alt="Working on the battery pack in the shop"
          className="w-full rounded-lg border border-border"
        />
      </div>

      {/* Leadership */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">The people side</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            The thing I've come to appreciate most about this role is that being a lead is less about having all the answers and more about creating an environment where people actually want to show up and do good work. That sounds obvious when you say it out loud, but it's something I've had to learn through experience.
          </p>
          <p className="text-foreground leading-relaxed">
            Early on, I probably over-indexed on trying to have everything planned perfectly. Over time I realized the team works better when I focus on making things clear rather than making things perfect. If people understand what we're trying to do and feel like their work matters, things tend to fall into place. If they feel lost or disconnected, no amount of planning helps.
          </p>
          <p className="text-foreground leading-relaxed">
            I genuinely enjoy being the person people come to. Whether it's a technical question about the BMS, a "where do I even start" moment, or just someone needing a second opinion on how to approach a problem. I like helping turn things that feel overwhelming into something manageable. I think that's probably the most useful thing I do as lead, even though it never shows up on a project timeline anywhere.
          </p>
        </div>
      </section>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <img
          src={sunstangMultimeter}
          alt="Verifying thermistor readings with the team"
          className="w-full rounded-lg border border-border"
        />
        <img
          src={sunstangSoldering}
          alt="Soldering session in the shop"
          className="w-full rounded-lg border border-border"
        />
      </div>

      {/* Technical work references */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">The technical work</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            While this page is more about the role than any single project, it's worth mentioning what the team and I have actually been building. The battery system isn't just a box of cells. It's a bunch of tightly connected subsystems that all have to work together, and a big part of my job has been understanding those connections and making them real.
          </p>
          <p className="text-foreground leading-relaxed">
            The biggest project this year was the{" "}
            <TextLink href="/experience/bms-telemetry">Orion 2 BMS integration and telemetry system</TextLink>
            . Our old BMS failed on the way to competition last year, so I led the effort to retrofit an Orion 2 into our existing pack and build a CAN-to-cloud telemetry pipeline on top of it. That project touched hardware, wiring, embedded software, CAN messaging, and cloud infrastructure. It's probably the most technically dense thing I've worked on at Sunstang.
          </p>
          <p className="text-foreground leading-relaxed">
            Alongside that, I worked through the{" "}
            <TextLink href="/experience/charging-system">charging system integration</TextLink>
            , which involved making sense of how the Elcon charger, J1772 charging port, OpenEVSE control logic, and BMS all interact to safely charge the pack. That one was as much about understanding existing systems and documenting them clearly as it was about building new things.
          </p>
          <p className="text-foreground leading-relaxed">
            I also built a{" "}
            <TextLink href="/experience/thermal-model">MATLAB thermal model</TextLink>
            {" "}of the battery pack to simulate temperature behavior under racing conditions. That project helped us make informed decisions about cooling and cell spacing before we committed to a physical design.
          </p>
          <p className="text-foreground leading-relaxed">
            Each of those projects has its own page with a lot more detail. But they all share a common thread: they came out of trying to understand the battery system deeply enough to make good decisions and help the team do the same.
          </p>
        </div>
      </section>

      {/* Pack work photo */}
      <div className="my-8">
        <img
          src={sunstangPackWiring}
          alt="Working on the battery pack internals"
          className="w-full rounded-lg border border-border"
        />
      </div>

      {/* Team culture */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">The team</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            The best part of Sunstang is the people. That's not a generic thing to say. I mean it specifically. The late nights in the shop when you're tired but everyone's still there because you're all trying to get something working. The dumb jokes and the good conversations that happen when you're waiting for an epoxy to cure or a test to finish running. Going out together after a long work session. These are the parts of the experience I know I'll remember the most.
          </p>
          <p className="text-foreground leading-relaxed">
            I've been lucky to work alongside people who are genuinely sharp and who care about what they're doing. Leading a group like that isn't about pushing anyone. It's about keeping things organized, being someone people trust, and trying to make the whole experience feel worth the time everyone puts in.
          </p>
        </div>
      </section>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <img
          src={sunstangTeamPack}
          alt="Team with the finished battery pack"
          className="w-full rounded-lg border border-border"
        />
        <img
          src={sunstangFormal}
          alt="With friends at a formal event"
          className="w-full rounded-lg border border-border"
        />
      </div>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <img
          src={sunstangFriendsMovie}
          alt="Movie night with the crew"
          className="w-full rounded-lg border border-border"
        />
        <img
          src={sunstangWorkshopCad}
          alt="Late night CAD work in the shop"
          className="w-full rounded-lg border border-border"
        />
      </div>

      {/* Pack move */}
      <div className="my-8">
        <img
          src={sunstangPackMove}
          alt="Moving the battery pack"
          className="w-full rounded-lg border border-border"
        />
      </div>

      {/* Closing reflection */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">What it means to me</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            Being Battery Lead at Sunstang is one of those things that's hard to capture properly. It's not just a role I held. It's an experience that changed how I think about engineering, teamwork, and what kind of person I want to be in a group setting. I learned how to lead without being controlling. How to support people without doing everything for them. How to stay calm when things aren't going well. How to give honest feedback. How to ask for help when I need it.
          </p>
          <p className="text-foreground leading-relaxed">
            The technical stuff mattered, and I'm proud of the projects we built. But when I think about what this role gave me, it's the human part that stands out the most. The trust from teammates, the friendships, the shared sense that we're all building something together that none of us could've done alone. That's the part I'll carry forward.
          </p>
        </div>
      </section>
    </div>
  );
};

export default SunstangLeadContent;
