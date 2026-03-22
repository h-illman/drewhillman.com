import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ExperienceCardProps {
  id: string;
  title: string;
  company?: string;
  companyUrl?: string;
  description: string;
  image: string;
  date?: string;
  tags: string[];
}

const ExperienceCard = ({
  id,
  title,
  company,
  companyUrl,
  description,
  image,
  date,
  tags,
}: ExperienceCardProps) => {
  return (
    <Link
      to={`/experience/${id}`}
      className="group block cursor-pointer transition-all hover:opacity-90"
    >
      <article className="space-y-4">
        <div className="overflow-hidden aspect-video">
          <img
            src={image}
            alt={title}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold text-foreground">{title}</h3>
          <p className="text-muted leading-relaxed">{description}</p>
          {date && <p className="text-sm text-muted">{date}</p>}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-2 text-muted group-hover:text-foreground transition-colors pt-2">
            <span className="text-sm">Read more</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ExperienceCard;
