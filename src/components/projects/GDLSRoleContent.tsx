import gdlsGroup from "@/assets/gdls-group.png";
import gdlsRooftop from "@/assets/gdls-rooftop.png";

const GDLSRoleContent = () => {
  return (
    <div className="prose prose-lg max-w-none space-y-6">
      <p className="text-foreground leading-relaxed text-lg">
        I spent a summer working at General Dynamics Land Systems in London, Ontario as a manufacturing engineering intern. It was my first real exposure to a large-scale industrial environment — the kind of place where engineering decisions have direct, physical consequences and where reliability isn't a nice-to-have, it's the baseline expectation.
      </p>

      <p className="text-foreground leading-relaxed text-lg">
        I can't get too specific about a lot of the work because of the nature of the industry and NDA restrictions, but I can talk about the kind of problems I got to help with and what I took away from the experience.
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
        A big part of my role was designing and updating electrical layouts and safety circuits using AutoCAD. These weren't theoretical exercises — they were for real equipment installations, including some highly specialized machinery like water jets and laser cutters. The drawings had to be clear, accurate, and compliant with electrical codes, because someone was going to build from them.
      </p>

      <p className="text-foreground leading-relaxed text-lg">
        I also served as an on-site liaison during equipment installations and system upgrades. That meant being the person coordinating between contractors, safety staff, and the engineering team to make sure things were done correctly and up to code. It was a good lesson in how much of engineering is communication — making sure the right people have the right information at the right time.
      </p>

      <p className="text-foreground leading-relaxed text-lg">
        On the facilities side, I contributed to energy and sustainability initiatives tied to the site's LEED Gold and ISO 50001 certifications. That involved performing power usage audits, creating substation documentation, and putting together data-driven recommendations for improving electrical efficiency across the facility. It was the kind of work where you're digging through real operational data and trying to find where improvements actually make sense — not just where they look good on paper.
      </p>

      <h2 className="text-2xl font-bold text-foreground">What I learned</h2>

      <p className="text-foreground leading-relaxed text-lg">
        Working in defense manufacturing changed how I think about engineering. This was a place where mistakes mattered. If a safety circuit wasn't right, or a drawing was ambiguous, that had real downstream consequences — for the people building from it, for the equipment, and for production timelines. It made me a lot more careful about how I communicate technical information and how I think about failure modes.
      </p>

      <p className="text-foreground leading-relaxed text-lg">
        I also gained an appreciation for how much work goes into keeping a large facility running smoothly. There's an entire layer of engineering that's about reliability, maintainability, and making sure systems are documented well enough that someone else can understand and work with them. It's not glamorous, but it's important, and I'm glad I got to see it up close.
      </p>

      <div className="overflow-hidden my-8">
        <img
          src={gdlsGroup}
          alt=""
          className="w-full h-auto object-cover"
        />
      </div>

      <p className="text-foreground leading-relaxed text-lg">
        The structured environment was good for me. I learned to work within real constraints — safety procedures, documentation standards, approval processes — and to see those things not as bureaucratic overhead, but as part of what makes engineering in high-stakes environments actually work. It's a mindset I've carried into everything I've done since.
      </p>
    </div>
  );
};

export default GDLSRoleContent;
