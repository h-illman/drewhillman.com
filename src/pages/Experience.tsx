import Layout from "@/components/layout/Layout";
import ExperienceCard from "@/components/ExperienceCard";
import TextLink from "@/components/ui/TextLink";
import { experiences } from "@/data/experiences";
const Experience = () => {
  return <Layout>
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        {/* Intro */}
        <section className="space-y-4 mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">my portfolio</h1>
          <p className="text-lg text-foreground leading-relaxed">Welcome! Below you can find what I've been working on.
        </p>
          <p className="text-foreground">
            If you just want my resume,{" "}
            <TextLink href="/resume.pdf" external>
              click here
            </TextLink>
            .
          </p>
        </section>

        {/* Featured Experience */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-foreground">
            Featured Experience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experiences.map(experience => <ExperienceCard key={experience.id} id={experience.id} title={experience.title} description={experience.description} image={experience.image} date={experience.date} tags={experience.tags} />)}
          </div>
        </section>
      </div>
    </Layout>;
};
export default Experience;