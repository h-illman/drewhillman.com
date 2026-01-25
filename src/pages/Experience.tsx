import Layout from "@/components/layout/Layout";
import ExperienceCard from "@/components/ExperienceCard";
import TextLink from "@/components/ui/TextLink";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { experiences } from "@/data/experiences";

const Experience = () => {
  const projects = experiences.filter((exp) => exp.type === "project");
  const roles = experiences.filter((exp) => exp.type === "work");

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        {/* Intro */}
        <section className="space-y-4 mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">my portfolio</h1>
          <p className="text-lg text-foreground leading-relaxed">
            Welcome! Below you can find what I've been working on.
          </p>
          <p className="text-foreground">
            If you just want my resume,{" "}
            <TextLink href="/resume.pdf" external>
              click here
            </TextLink>
            .
          </p>
        </section>

        {/* Tabbed Experience */}
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((experience) => (
                <ExperienceCard
                  key={experience.id}
                  id={experience.id}
                  title={experience.title}
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