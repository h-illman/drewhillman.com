import Layout from "@/components/layout/Layout";
import TextLink from "@/components/ui/TextLink";

const Me = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-16 md:py-24 px-[8px]">
        <section className="space-y-8">
          {/* Name */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">hello my name is Drew</h1>

          {/* About */}
          <div className="space-y-4 text-lg leading-relaxed text-foreground">
            <p>
              I'm a third year electrical engineering student at Western University.
            </p>
            <p>
              I love music, playing games, and my cat{" "}
              <a 
                href="/opal.png" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cursor-text"
              >
                Opal
              </a>
              .
            </p>
            <p>
              I also love new and interesting, innovative stuff. I think AI is incredibly interesting, and love to try and use it to it's fullest potential. My aim, both professionally and in life overall, is to contribute to meaningful projects that help to make the world a better place!
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-3 text-foreground">
            <p>
              You can find me on{" "}
              <TextLink href="https://www.instagram.com/h.illman/" external>
                Instagram
              </TextLink>
              ,{" "}
              <TextLink href="https://www.linkedin.com/in/drew-hillman-forest/" external>
                LinkedIn
              </TextLink>
              ,{" "}
              <TextLink href="https://github.com/h-illman" external>
                GitHub
              </TextLink>
              , or email me at{" "}
              <TextLink href="mailto:drewhillman63@gmail.com" external>
                drewhillman63@gmail.com
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
