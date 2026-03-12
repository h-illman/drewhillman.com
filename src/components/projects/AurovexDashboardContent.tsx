import { Badge } from "@/components/ui/badge";
import aurovexDashboard from "@/assets/aurovex-full-dashboard.png";
import aurovexChart from "@/assets/aurovex-chart.png";
import aurovexKpiCards from "@/assets/aurovex-kpi-cards.png";

const techStack = [
  "Next.js 14",
  "React 18",
  "Tailwind CSS",
  "Tremor UI",
  "PostgreSQL",
  "Supabase",
  "Drizzle ORM",
  "TypeScript",
];

const AurovexDashboardContent = () => {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="prose prose-lg max-w-none">
        <p className="text-foreground leading-relaxed text-lg">
          A read-only internal dashboard that pulls cloud compute costs and AI report generation metrics out of a Postgres database and puts them somewhere people can actually see them.
        </p>
      </div>

      {/* Why */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Why I built it</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            At Aurovex, all our cloud compute costs and report generation data were sitting in Supabase tables that nobody wanted to manually query. If someone on the team wanted to know how much we'd spent this week, they'd have to write SQL and do math in a spreadsheet. That's fine when it's just you, but it doesn't scale when multiple people need the same numbers.
          </p>
          <p className="text-foreground leading-relaxed">
            I wanted a single page where anyone could see total spend, number of reports generated, and average cost per report — no database access required. Just open a URL.
          </p>
        </div>
      </section>

      {/* Dashboard Image */}
      <div className="my-8">
        <img
          src={aurovexDashboard}
          alt="Aurovex Finance Dashboard full view"
          className="w-full rounded-lg border border-border"
        />
      </div>

      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">How it's put together</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            It's a Next.js 14 app. When the page loads, a Server Action fires, queries the Supabase Postgres database through Drizzle ORM, processes and sorts the data chronologically on the server, and passes clean props down to Tremor UI components for rendering.
          </p>
          <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm text-foreground">
            Next.js Page → Server Action → Drizzle ORM → Supabase PostgreSQL → Tremor UI
          </div>
          <p className="text-foreground leading-relaxed">
            The KPI cards at the top take raw totals and format them into readable dollar amounts with progress indicators. Below that, a Tremor AreaChart maps report dates to spending so you can spot trends visually. Under the hood there's a small pricing engine that converts vCPU-seconds and GB-second memory usage into actual dollar amounts — it's not complex code, but it's the most important piece because if the math is wrong, the whole dashboard is useless.
          </p>
          <p className="text-foreground leading-relaxed">
            Everything runs through Server Actions, so the database queries happen on the server. No API routes, no exposed endpoints. I liked this pattern because it keeps things simple — the data fetching is just part of rendering the page.
          </p>
        </div>
      </section>

      {/* KPI Cards Image */}
      <div className="my-8">
        <img
          src={aurovexKpiCards}
          alt="Dashboard KPI metric cards"
          className="w-full rounded-lg border border-border"
        />
      </div>

      {/* The annoying parts */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">The annoying parts</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            The biggest headache was getting <code className="text-sm bg-muted/50 px-1 rounded">npm run build</code> to stop crashing. It kept throwing a Postgres 42501 error — insufficient privileges. Took me a bit to figure out what was happening: Next.js was trying to statically pre-render the pages at build time, which meant it was hitting the database without a live authenticated session. The database was doing exactly what it should — rejecting unauthenticated queries — but Next.js was trying to run them anyway during the build step.
          </p>
          <p className="text-foreground leading-relaxed">
            The fix was adding <code className="text-sm bg-muted/50 px-1 rounded">export const dynamic = 'force-dynamic'</code> to the dashboard routes. That tells Next.js to skip static rendering and only query at request time. Simple once you understand it, but I burned a solid chunk of time reading through error logs before it clicked.
          </p>
          <p className="text-foreground leading-relaxed">
            The other issue was Tremor's components crashing server-side renders. They use React Context and hooks that expect a browser environment, so the server would just bail. I had to pull every Tremor component into its own file with the <code className="text-sm bg-muted/50 px-1 rounded">'use client'</code> directive at the top. It's one of those Next.js things where the framework is doing the right thing, but you have to be really explicit about what runs where.
          </p>
        </div>
      </section>

      {/* Chart Image */}
      <div className="my-8">
        <img
          src={aurovexChart}
          alt="Interactive area chart showing daily spending"
          className="w-full rounded-lg border border-border"
        />
      </div>

      {/* What I'd do next */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">What I'd do next</h2>
        <div className="prose prose-lg max-w-none space-y-4">
          <p className="text-foreground leading-relaxed">
            The dashboard does its job right now, but there are a few things I'd want to add if I keep working on it. Proper auth session sharing inside the Server Actions would be nice — right now it's read-only and open internally, but role-based access would make it more production-ready. A date-range picker for filtering billing by time window is the most-requested feature. And on the code side, the pricing engine really should have unit tests — it's doing dollar math, and that's the kind of thing that should be tested properly.
          </p>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Tech stack</h2>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-sm">
              {tech}
            </Badge>
          ))}
        </div>
      </section>

      {/* What I built */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">What I did</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-foreground leading-relaxed">
            I built the whole thing from scratch — set up the Next.js project, ran Drizzle's introspection tool against the existing Supabase schema to generate types, wrote the pricing logic, designed the UI with Tremor, and spent more time than I'd like to admit sorting out the SSR boundary issues between server actions and client-side charting components.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AurovexDashboardContent;
