import gdlsGroup from "@/assets/gdls-group.png";
import gdlsRooftop from "@/assets/gdls-rooftop.png";

const GDLSRoleContent = () => {
  return (
    <div className="prose prose-lg max-w-none space-y-6">
      <p className="text-foreground leading-relaxed text-lg">
        I spent a summer at General Dynamics Land Systems in London, Ontario as a manufacturing engineering intern. It was my first real exposure to a large-scale industrial environment — the kind of place where engineering decisions have direct, physical consequences and where reliability isn't optional, it's the baseline expectation.
      </p>

      <p className="text-foreground leading-relaxed text-lg">
        I can't get too specific about a lot of the work because of the nature of the industry and NDA restrictions, but I can talk about what kind of problems I got to help with and what I took away from the experience.
      </p>

      <div className="overflow-hidden my-8">
        <img
          src={gdlsRooftop}
          alt=""
          className="w-full h-auto object-cover"
        />
      </div>

      <h2 className="text-2xl font-bold text-foreground">The work</h2>

      <p className="text-foreground leading-relaxed text-lg">
        A big part of my role was designing and updating electrical layouts and safety circuits in AutoCAD. These weren't theoretical exercises — they were for real equipment installations, including highly specialized machinery like water jets and laser cutters. The drawings had to be clear, accurate, and compliant with electrical codes, because someone was going to build from them.
      </p>

      <p className="text-foreground leading-relaxed text-lg">
        I also served as an on-site liaison during equipment installations and system upgrades. That meant coordinating between contractors, safety staff, and the engineering team to make sure things were done correctly and to code. Turns out a lot of engineering is communication — getting the right information to the right people before a decision gets made, not after.
      </p>

      <p className="text-foreground leading-relaxed text-lg">
        On the facilities side, I contributed to energy and sustainability initiatives tied to the site's LEED Gold and ISO 50001 certifications. That meant performing power usage audits, creating substation documentation, and putting together data-driven recommendations for improving electrical efficiency across the facility. It was the kind of work where you dig through real operational data looking for improvements that actually make sense — not just ones that look good on paper.
      </p>

      <h2 className="text-2xl font-bold text-foreground">What I learned</h2>

      <p className="text-foreground leading-relaxed text-lg">
        Working in defense manufacturing changed how I think about engineering. This was a place where mistakes mattered. If a safety circuit wasn't right, or a drawing was ambiguous, that had real downstream consequences — for the people building from it, for the equipment, and for production timelines. It made me a lot more careful about how I communicate technical information and how I think about failure modes before they happen.
      </p>

      <p className="text-foreground leading-relaxed text-lg">
        I also gained an appreciation for how much work goes into keeping a large facility running smoothly. There's an entire layer of engineering devoted to reliability, maintainability, and making sure systems are documented well enough that someone else can pick up where you left off. It's not glamorous, but it matters, and I'm glad I got to see it up close.
      </p>

      <div className="overflow-hidden my-8">
        <img
          src={gdlsGroup}
          alt=""
          className="w-full h-auto object-cover"
        />
      </div>

      <p className="text-foreground leading-relaxed text-lg">
        The structured environment was good for me. I learned to work within real constraints — safety procedures, documentation standards, approval processes — and to see those things not as bureaucratic overhead, but as part of what makes engineering in high-stakes environments actually work. That mindset has stuck with me.
      </p>
    </div>
  );
};

export default GDLSRoleContent;
