import Layout from "@/components/layout/Layout";
import TextLink from "@/components/ui/TextLink";

const Me = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        <section className="space-y-8">
          {/* Name */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Your Name
          </h1>

          {/* About */}
          <div className="space-y-4 text-lg leading-relaxed text-foreground">
            <p>
              Hi, I'm a student and aspiring developer passionate about building
              things that make a difference. I love exploring the intersection of
              technology, design, and human experience.
            </p>
            <p>
              When I'm not coding, you can find me reading, hiking, or working on
              side projects that probably won't see the light of day.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-3 text-foreground">
            <p>
              Find me on{" "}
              <TextLink href="https://instagram.com" external>
                Instagram
              </TextLink>
              ,{" "}
              <TextLink href="https://linkedin.com" external>
                LinkedIn
              </TextLink>
              , or email me at{" "}
              <TextLink href="mailto:your.email@example.com" external>
                your.email@example.com
              </TextLink>
              .
            </p>
          </div>

          {/* Work link */}
          <p className="text-foreground">
            Check out my{" "}
            <TextLink href="/experience">work</TextLink>.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default Me;
