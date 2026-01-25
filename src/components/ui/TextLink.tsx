import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TextLinkProps {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}

const TextLink = ({ href, children, external = false, className }: TextLinkProps) => {
  const baseStyles = "text-foreground hover:text-foreground transition-colors underline underline-offset-2";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseStyles, className)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={cn(baseStyles, className)}>
      {children}
    </Link>
  );
};

export default TextLink;
