import TextLink from "@/components/ui/TextLink";
import aurovexDashboardImage from "@/assets/aurovex-code.png";

const AurovexRoleContent = () => {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="prose prose-lg max-w-none">
        <p className="text-foreground leading-relaxed text-lg">
          I joined Aurovex as a Data Analytics Engineer, working on a small team building an AI-powered image analysis platform for civil engineering firms. The product helps consultants generate building assessment reports faster by using computer vision to identify and classify structural features from photos. My job sat at the intersection of the product's data layer and the team's ability to actually understand what the platform was doing.
        </p>
      </div>

      {/* What I worked on */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">What I worked on</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            A lot of my work was around making technical systems easier to see and reason about. The platform generates a ton of data through its model runs, report generation pipeline, and cloud compute usage, but when I started, most of that information lived in database tables that nobody was regularly looking at. If someone wanted to know how the models were performing, or how much a batch of reports cost to generate, they'd have to write queries and piece things together manually.
          </p>
          <p className="text-foreground leading-relaxed">
            I built dashboards and internal visibility tools in Power BI that pulled from those data sources and turned them into something the team could actually use day to day. Model accuracy breakdowns, report generation volumes, cost-per-report trends, user behavior patterns. The goal was always the same: take raw technical data and make it useful for decisions, whether that was a product call about which features to prioritize or an engineering conversation about where performance was degrading.
          </p>
          <p className="text-foreground leading-relaxed">
            I can't get too deep into the internals, but I can say the work was hands-on and practical. I wasn't generating slide decks about analytics strategy. I was writing queries, building views, figuring out why a metric looked wrong, and iterating on how information was presented until it actually made sense to the people using it.
          </p>
        </div>
      </section>

      {/* Finance Dashboard */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">The finance dashboard</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            One of the more concrete things I built was an internal finance dashboard for tracking cloud compute costs and report generation metrics. The team needed a way to see how much the platform was spending on inference and processing without digging through billing consoles or running ad hoc queries.
          </p>
          <p className="text-foreground leading-relaxed">
            I built it as a standalone Next.js app that reads directly from our PostgreSQL database through Drizzle ORM, runs the numbers server-side, and renders everything with Tremor UI components. KPI cards at the top, an area chart for spend over time, and a small pricing engine under the hood that converts raw compute usage into dollar amounts. It's read-only and intentionally simple, because the point was to make one page where anyone could check the numbers without needing database access.
          </p>
          <p className="text-foreground leading-relaxed">
            I wrote about that project in more detail on its own page:{" "}
            <TextLink href="/experience/aurovex-dashboard">
              Aurovex Finance Dashboard
            </TextLink>.
          </p>
        </div>
      </section>

      {/* Dashboard image */}
      <div className="my-8">
        <img
          src={aurovexDashboardImage}
          alt="Code from the Aurovex dashboard project"
          className="w-full rounded-lg border border-border"
        />
      </div>

      {/* How I got here */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">How the role came about</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            Part of what led to this role was a personal project I'd been working on before Aurovex:{" "}
            <TextLink href="/experience/slo-monitoring">
              Perf/W SLO Monitoring for AI Workloads
            </TextLink>. That was my own tool, built independently, for tracking performance-per-watt metrics on GPU workloads with SLO-style alerting. It wasn't built for Aurovex, but it demonstrated the kind of observability and performance thinking that the team was looking for.
          </p>
          <p className="text-foreground leading-relaxed">
            Having that project in my back pocket made the conversation about joining the team pretty natural. They needed someone who could think about system performance, build internal tooling, and turn messy data into something actionable. That was already the kind of problem I liked working on.
          </p>
        </div>
      </section>

      {/* What I enjoyed */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">What I liked about it</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            It was the kind of startup environment where if something was worth building, it had to actually be useful. There wasn't room for tooling that looked good in a demo but didn't help anyone day to day. I liked that constraint. It kept the work grounded and gave me a clear feedback loop: if the dashboard I built wasn't answering the right questions, I'd hear about it quickly, and I could fix it quickly.
          </p>
          <p className="text-foreground leading-relaxed">
            I also liked being close to the product decisions. The analytics I provided fed directly into conversations about what to build next, where performance was lagging, and what customers were actually using. That connection between the data work and the product direction made the role feel like it mattered beyond just the technical output.
          </p>
          <p className="text-foreground leading-relaxed">
            Working at a startup also taught me to be practical about scope. Not every question needs a full analytics pipeline. Sometimes the right answer is a well-written query and a shared screenshot. Learning when to build a tool and when to just answer the question was one of the more useful things I picked up.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AurovexRoleContent;
