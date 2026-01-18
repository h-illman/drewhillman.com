import Layout from "@/components/layout/Layout";
import TextLink from "@/components/ui/TextLink";
const Me = () => {
  return <Layout>
      <div className="max-w-2xl mx-auto py-16 md:py-24 px-[8px]">
        <section className="space-y-8">
          {/* Name */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">hello!!!</h1>

          {/* About */}
          <div className="space-y-4 text-lg leading-relaxed text-foreground">
            <p>My name is Drew and I'm a student studying electrical engineering at Western University. I'm in my third year!

I love all things computers, especially new and interesting ones. 

I also like listening to music, reading, and cats! </p>
            
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
    </Layout>;
};
export default Me;