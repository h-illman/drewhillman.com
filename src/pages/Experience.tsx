import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ExperienceCard from "@/components/ExperienceCard";
import TextLink from "@/components/ui/TextLink";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { experiences } from "@/data/experiences";

const Experience = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") === "roles" ? "roles" : "projects";

  const projects = experiences.filter((exp) => exp.type === "project");
  const roles = experiences.filter((exp) => exp.type === "work");

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        <section className="space-y-4 mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">My experience</h1>
          <p className="text-lg text-foreground leading-relaxed">
            Welcome! Below you can find what I've been working on.
          </p>
          <p className="text-foreground">
            If you just want my resume,{" "}
            <TextLink href="/Hillman-Drew-Resume.pdf" external>
              click here
            </TextLink>
            .
          </p>
        </section>

        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="mb-6 bg-transparent p-0 h-auto gap-0">
            <TabsTrigger
              value="projects"
              className="bg-transparent px-0 py-0 text-sm data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground data-[state=active]:font-semibold data-[state=inactive]:text-muted data-[state=inactive]:font-normal hover:text-foreground transition-colors"
            >
              projects
            </TabsTrigger>
            <span className="text-muted mx-2">|</span>
            <TabsTrigger
              value="roles"
              className="bg-transparent px-0 py-0 text-sm data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground data-[state=active]:font-semibold data-[state=inactive]:text-muted data-[state=inactive]:font-normal hover:text-foreground transition-colors"
            >
              roles
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((experience) => (
                <ExperienceCard
                  key={experience.id}
                  id={experience.id}
                  title={experience.title}
                  company={experience.company}
                  companyUrl={experience.companyUrl}
                  description={experience.description}
                  image={experience.image}
                  date={experience.date}
                  tags={experience.tags}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="roles">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {roles.map((experience) => (
                <ExperienceCard
                  key={experience.id}
                  id={experience.id}
                  title={experience.title}
                  company={experience.company}
                  companyUrl={experience.companyUrl}
                  description={experience.description}
                  image={experience.image}
                  date={experience.date}
                  tags={experience.tags}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Experience;
