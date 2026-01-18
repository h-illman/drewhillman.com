import { Moon, Sun, Linkedin } from "lucide-react";
import { useTheme } from "next-themes";

const Footer = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <footer className="py-8 mt-16">
      <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © 2025 Drew Hillman - made with React, TypeScript, Tailwind CSS, and Vite
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 absolute" />
            <Moon className="h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>

          <a
            href="https://www.linkedin.com/in/drew-hillman-forest/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
