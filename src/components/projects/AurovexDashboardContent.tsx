import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, BarChart3, DollarSign, Server, Shield } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TextLink from "@/components/ui/TextLink";
import aurovexDashboard from "@/assets/aurovex-dashboard.png";

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

const features = [
  {
    icon: <BarChart3 className="w-5 h-5 text-primary" />,
    title: "Dynamic KPI Summary",
    description:
      "Built with Tremor UI, consuming raw numerical totals and formatting them into easily readable currency metrics with visual progress bars.",
  },
  {
    icon: <DollarSign className="w-5 h-5 text-primary" />,
    title: "Interactive Spend Chart",
    description:
      "Maps chronological report dates to aggregate spending amounts in an elegant Tremor AreaChart.",
  },
  {
    icon: <Server className="w-5 h-5 text-primary" />,
    title: "Micro-Billing Engine",
    description:
      "Houses the core algorithm for converting specific vCPU-second and GB-second memory usage into precise dollar amounts.",
  },
  {
    icon: <Shield className="w-5 h-5 text-primary" />,
    title: "Secure Server Actions",
    description:
      "Leverages Next.js 14 Server Actions to securely execute backend database queries and aggregation logic natively on the server.",
  },
];

const AurovexDashboardContent = () => {
  return (
    <div className="space-y-8">
      {/* Hero / Pitch */}
      <div className="prose prose-lg max-w-none">
        <p className="text-foreground leading-relaxed text-lg">
          A fast, read-only Next.js dashboard for visualizing cloud compute
          costs and report generation metrics derived directly from a PostgreSQL
          database.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <a href="#" target="_blank" rel="noopener noreferrer">
            View Repo <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href="#" target="_blank" rel="noopener noreferrer">
            Live Demo <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </Button>
      </div>

      {/* Problem → Solution */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">The Challenge</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-foreground leading-relaxed">
            Cloud resource usage and generative AI reporting costs are often
            buried within raw database tables or complex billing consoles.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-foreground mt-6">The Solution</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-foreground leading-relaxed">
            The Aurovex Finance Dashboard surfaces total spend, report volume,
            and average cost-per-report securely and beautifully. It allows
            internal stakeholders to monitor infrastructure spending trends at a
            glance without needing direct database access.
          </p>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <Card key={f.title}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  {f.icon}
                  <CardTitle className="text-lg">{f.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {f.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Architecture</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-foreground leading-relaxed">
            The Next.js page invokes a Server Action on render → Queries
            Postgres via Drizzle ORM → Raw data is processed chronologically in
            the Server → Clean props are piped down to Tremor Client Components.
          </p>
        </div>
        <Card className="overflow-hidden">
          <CardContent className="p-4">
            <pre className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
{`graph TD
    UI[Tremor UI Client Components] -->|Props| Page[Next.js Server Page]
    Page -->|Awaits| Action[Server Action: getFinanceData]
    Action -->|Calculates Cost| Engine[Pricing Engine]
    Action -->|SQL Query| Drizzle[Drizzle ORM]
    Drizzle -->|Read-only Connection| DB[(Supabase PostgreSQL)]`}
            </pre>
          </CardContent>
        </Card>
      </section>

      {/* Tech Stack */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-sm">
              {tech}
            </Badge>
          ))}
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          Challenges &amp; Solutions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Static Compilation vs. Row Level Security
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-foreground leading-relaxed mb-2">
                <strong>Problem:</strong>{" "}
                <code className="text-sm bg-muted px-1 py-0.5 rounded">npm run build</code>{" "}
                crashed with a Postgres 42501 (Insufficient Privilege) error.
                Next.js attempted to statically pre-render server actions
                mapping to an authenticated database without a live session.
              </p>
              <p className="text-foreground leading-relaxed">
                <strong>Fix:</strong> Added{" "}
                <code className="text-sm bg-muted px-1 py-0.5 rounded">
                  export const dynamic = 'force-dynamic'
                </code>{" "}
                to the dashboard routes to push querying safely to request-time.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Third-Party UI Context Errors
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-foreground leading-relaxed mb-2">
                <strong>Problem:</strong> Tremor components crashed the server
                render with Context/Hook errors.
              </p>
              <p className="text-foreground leading-relaxed">
                <strong>Fix:</strong> Abstracted Tremor elements into dedicated{" "}
                <code className="text-sm bg-muted px-1 py-0.5 rounded">
                  kpi-cards.tsx
                </code>{" "}
                component files and strictly applied the{" "}
                <code className="text-sm bg-muted px-1 py-0.5 rounded">
                  'use client'
                </code>{" "}
                boundary directive.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Results / Future Benchmarks */}
      <section className="space-y-4">
        <Card className="bg-muted/50">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Future Performance Benchmarks
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Not fully measured in production yet. Upcoming metrics to track
              include: Lighthouse Performance Score, Drizzle ORM query latency,
              and Tremor Client-side render times for large dataset arrays.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Gallery */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="aspect-video bg-muted border border-border rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Image placeholder</span>
            </div>
            <p className="text-sm text-muted mt-2 text-center">
              Dashboard KPI Metric Cards
            </p>
          </div>
          <div>
            <div className="aspect-video bg-muted border border-border rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Image placeholder</span>
            </div>
            <p className="text-sm text-muted mt-2 text-center">
              Daily Spend Interactive Area Chart
            </p>
          </div>
          <div>
            <div className="aspect-video bg-muted border border-border rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Image placeholder</span>
            </div>
            <p className="text-sm text-muted mt-2 text-center">
              Drizzle ORM Backend Server Logic
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Image */}
      <div className="my-8">
        <img
          src={aurovexDashboard}
          alt="Aurovex Finance Dashboard showing KPI cards and spending charts"
          className="w-full rounded-lg border border-border"
        />
        <p className="text-sm text-muted mt-2 text-center">
          Aurovex Finance Dashboard overview
        </p>
      </div>

      {/* Roadmap */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">Roadmap</h2>
        <ul className="list-disc list-inside text-foreground space-y-2">
          <li>
            Implement full Supabase Auth session sharing inside the Server
            Action.
          </li>
          <li>
            Add a date-range picker filter to query historical reporting billing
            windows.
          </li>
          <li>
            Setup automated Jest unit tests for the pricing engine algorithm.
          </li>
        </ul>
      </section>

      {/* My Contributions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          My Contributions
        </h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-foreground leading-relaxed">
            Architected and built the entire dashboard from scratch.
            Bootstrapped the Next.js environment, executed Drizzle ORM
            introspection on an existing Supabase instance, developed the
            pricing algorithm, designed the UI, and expertly navigated complex
            Next.js SSR build boundary issues.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AurovexDashboardContent;
