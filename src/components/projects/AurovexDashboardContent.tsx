import { Badge } from "@/components/ui/badge";
import TextLink from "@/components/ui/TextLink";
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
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">The problem</h2>
        <p className="text-foreground leading-relaxed">
          At Aurovex, cloud compute costs and AI report generation expenses were buried inside raw Supabase tables and billing consoles that nobody wanted to dig through. If leadership wanted to know how much we'd spent this week, someone had to manually query the database and do math in a spreadsheet. That's not sustainable when you're scaling.
        </p>
        <p className="text-foreground leading-relaxed">
          I wanted to build something where anyone on the team could pull up a single page and immediately see: how much we've spent, how many reports we've generated, and what each one costs on average — no SQL required.
        </p>
      </section>

      {/* Dashboard Image */}
      <div className="my-8">
        <img
          src={aurovexDashboard}
          alt="Aurovex Finance Dashboard full view with KPI cards, spending chart, and cost breakdown table"
          className="w-full rounded-lg border border-border"
        />
      </div>

      {/* How it works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">How it works</h2>
        <p className="text-foreground leading-relaxed">
          The dashboard is a read-only Next.js 14 app. When the page loads, it fires a Server Action that queries the Supabase PostgreSQL database through Drizzle ORM. The raw data gets processed and sorted chronologically on the server, then clean props are passed down to Tremor UI client components for rendering.
        </p>
        <div className="bg-muted/30 p-4 rounded-lg font-mono text-sm text-foreground">
          Next.js Page → Server Action → Drizzle ORM → Supabase PostgreSQL → Tremor UI Components
        </div>
        <p className="text-foreground leading-relaxed">
          The KPI cards at the top consume raw numerical totals and format them into readable currency metrics. Below that, an interactive Tremor AreaChart maps report dates to aggregate spending amounts, so you can visually spot trends. And under the hood, there's a micro-billing engine — a small but critical algorithm that converts vCPU-seconds and GB-second memory usage into precise dollar amounts.
        </p>
        <p className="text-foreground leading-relaxed">
          Everything runs through Next.js 14 Server Actions, which means the database queries and aggregation logic execute natively on the server. No API routes, no exposed endpoints — just secure, server-side data fetching baked into the rendering cycle.
        </p>
      </section>

      {/* KPI Cards Image */}
      <div className="my-8">
        <img
          src={aurovexKpiCards}
          alt="Dashboard KPI metric cards showing total spend, reports generated, and average cost per report"
          className="w-full rounded-lg border border-border"
        />
      </div>

      {/* Challenges */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">The tricky parts</h2>
        <p className="text-foreground leading-relaxed">
          The biggest headache was getting the build to work. When I ran <code className="text-sm bg-muted/50 px-1 rounded">npm run build</code>, it crashed with a Postgres 42501 error — insufficient privileges. What was happening is that Next.js was trying to statically pre-render the server actions at build time, which meant it was hitting the authenticated database without a live session. The fix was straightforward once I understood the problem: I added <code className="text-sm bg-muted/50 px-1 rounded">export const dynamic = 'force-dynamic'</code> to the dashboard routes, which pushes all querying to request-time instead of build-time.
        </p>
        <p className="text-foreground leading-relaxed">
          The other issue was with Tremor's React components. They kept crashing the server render with Context and Hook errors because they rely on browser APIs that don't exist on the server. I had to pull all the Tremor elements into their own dedicated component files and apply the <code className="text-sm bg-muted/50 px-1 rounded">'use client'</code> directive to create a clean boundary between server and client code.
        </p>
      </section>

      {/* Chart Image */}
      <div className="my-8">
        <img
          src={aurovexChart}
          alt="Interactive area chart showing daily cloud run spending over time"
          className="w-full rounded-lg border border-border"
        />
      </div>

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

      {/* What's next */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">What's next</h2>
        <p className="text-foreground leading-relaxed">
          The dashboard does what it needs to right now, but there's more I want to do with it. I'd like to implement full Supabase Auth session sharing inside the Server Action so the app can support role-based access. I also want to add a date-range picker so stakeholders can filter and compare billing across different time windows. And on the engineering side, I want to set up Jest unit tests for the pricing engine — it's the most critical piece of logic and it deserves proper coverage.
        </p>
        <p className="text-foreground leading-relaxed">
          On the performance side, I haven't done formal benchmarking yet, but I'd like to track Lighthouse scores, Drizzle query latency, and Tremor render times as the dataset grows.
        </p>
      </section>

      {/* My Contributions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">My contributions</h2>
        <p className="text-foreground leading-relaxed">
          I built the entire dashboard from scratch. I bootstrapped the Next.js environment, ran Drizzle ORM introspection on an existing Supabase instance to generate the schema, wrote the pricing algorithm, designed the UI with Tremor, and navigated the SSR boundary issues that come with mixing server actions and client-side charting libraries.
        </p>
      </section>
    </div>
  );
};

export default AurovexDashboardContent;
