import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { getExperienceById } from "@/data/experiences";
import BMSTelemetryContent from "@/components/projects/BMSTelemetryContent";
import SLOMonitoringContent from "@/components/projects/SLOMonitoringContent";
import ThermalModelContent from "@/components/projects/ThermalModelContent";
import BioLockContent from "@/components/projects/BioLockContent";
import TextLink from "@/components/ui/TextLink";
const ExperienceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const experience = id ? getExperienceById(id) : undefined;

  if (!experience) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
          <p className="text-foreground">Experience not found.</p>
          <Link
            to="/experience"
            className="text-link hover:text-link-foreground transition-colors inline-flex items-center gap-2 mt-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to experience
          </Link>
        </div>
      </Layout>
    );
  }

  // Check if this experience uses custom content
  const isCustomContent = experience.fullDescription === "custom";

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        {/* Back link */}
        <Link
          to="/experience"
          className="text-muted hover:text-foreground transition-colors inline-flex items-center gap-2 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to experience
        </Link>

        <article className="space-y-8">
          {/* Image */}
          <div className="overflow-hidden bg-muted aspect-video">
            <img
              src={experience.image}
              alt={experience.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Header */}
          <header className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {experience.title}
            </h1>
            {experience.date && (
              <p className="text-muted">{experience.date}</p>
            )}
          </header>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {experience.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Content - either custom component or standard text */}
          {isCustomContent && id === "bms-telemetry" ? (
            <BMSTelemetryContent />
          ) : isCustomContent && id === "slo-monitoring" ? (
            <SLOMonitoringContent />
          ) : isCustomContent && id === "thermal-model" ? (
            <ThermalModelContent />
          ) : isCustomContent && id === "arduino-biometric" ? (
            <BioLockContent />
          ) : (
            <>
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground leading-relaxed text-lg">
                  {experience.fullDescription}
                </p>
              </div>

              {/* GitHub link if available */}
              {experience.githubUrl && (
                <div className="pt-4">
                  <p className="text-foreground">
                    View the code on{" "}
                    <TextLink href={experience.githubUrl} external>
                      GitHub
                    </TextLink>
                    .
                  </p>
                </div>
              )}

              {/* Placeholder for additional content */}
              <div className="pt-8 border-t border-border">
                <p className="text-muted text-sm">
                  More details, images, and resources can be added here.
                </p>
              </div>
            </>
          )}
        </article>
      </div>
    </Layout>
  );
};

export default ExperienceDetail;
