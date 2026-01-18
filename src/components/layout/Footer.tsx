import { Moon, Sun, Linkedin } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <footer className="border-t border-border py-8 mt-16">
      <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          made with React, TypeScript, Tailwind CSS, and Vite
        </p>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full"
          aria-label="Toggle theme"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

        <a
          href="https://www.linkedin.com/in/drew-hillman-forest/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
