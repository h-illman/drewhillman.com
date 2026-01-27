import opgImage from "@/assets/opg.jpg";
import gdlsImage from "@/assets/gdls.jpg";
import sunstangImage from "@/assets/sunstang.jpg";
import bmsTelemetryImage from "@/assets/bms-telemetry.jpg";

export interface Experience {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  date?: string;
  tags: string[];
  type: "work" | "project" | "club";
  githubUrl?: string;
}

export const experiences: Experience[] = [
  // Roles
  {
    id: "opg-intern",
    title: "Electrical Engineering Intern – OPG",
    description:
      "Incoming intern on the Monitoring and Diagnostics team, working with machine-learning models for equipment health monitoring and predictive analysis.",
    fullDescription:
      "When I start at OPG, I'll be working with the Monitoring & Diagnostics team to keep a large fleet of equipment-health models running reliably and producing useful alerts. That includes regularly refreshing the datasets these models rely on, reviewing anomaly flags against historical baselines, and updating the model logic when needed so the alerts stay accurate.\n\nI'll also be investigating unusual equipment trends by connecting model anomalies to related process signals and operating context, then documenting what's most likely happening, how risky it is, and what follow-ups make sense. On the reporting side, I'll be building equipment-health dashboards in Microsoft Power Platform to track KPIs, alert frequency/volume, and model performance, making reliability trends easier to see and act on.\n\nTo support all of this, I'll be developing and improving data pipelines and analytics workflows in Databricks and Azure to clean, validate, and contextualize operational data for automation and predictive analysis. I'll also be creating lightweight internal tools in Python to automate tasks like alert triage and data refresh checks, cutting down manual steps and improving consistency across the team's workflow.",
    image: opgImage,
    date: "May 2026 – August 2027 (Incoming)",
    tags: ["Python", "Databricks", "Azure", "Power Platform", "Machine Learning"],
    type: "work",
  },
  {
    id: "gdls-intern",
    title: "Manufacturing Engineering Intern – General Dynamics",
    description:
      "Designed electrical layouts and safety circuits using AutoCAD, oversaw equipment installations, and contributed to LEED Gold and ISO 50001 energy initiatives.",
    fullDescription:
      "Designed and updated electrical layouts and safety circuits using AutoCAD for new projects and installations, including highly specialized equipment such as water jets and laser cutters. Served as on-site liaison to oversee electrical equipment installations and system upgrades, ensuring compliance with electrical codes, safety standards, and project requirements while coordinating with contractors and safety staff. Contributed to LEED Gold and ISO 50001 energy initiatives by performing power usage audits and creating substation documentation, providing data-driven recommendations to improve facility electrical efficiency.",
    image: gdlsImage,
    date: "May 2025 – August 2025",
    tags: ["AutoCAD", "Electrical Design", "LEED", "ISO 50001"],
    type: "work",
  },
  {
    id: "aurovex",
    title: "Data Analytics Engineer – Aurovex",
    description:
      "Built Power BI dashboards for an AI image-analysis platform used by civil engineering consulting firms to streamline building assessment reports.",
    fullDescription:
      "Built Power BI dashboards to visualize model outputs for an AI image-analysis platform used by civil engineering consulting firms to streamline building assessment reports, helping to identify features gaps and data-quality issues. Provided data analytics on model performance and user behavior that fed directly into product decisions, helping keep the platform aligned with market needs and scalable as the customer base grows.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    date: "January 2026 – Present",
    tags: ["Power BI", "Data Analytics", "AI/ML", "Product Analytics"],
    type: "work",
  },
  {
    id: "sunstang",
    title: "Battery Pack Team Leader – Western Sunstang",
    description:
      "Leading ~20 members in designing, testing, and optimizing a custom lithium-ion battery pack and BMS integration for a solar-electric vehicle.",
    fullDescription:
      "Led the battery team (~20 members) in the design, testing, and optimization of a custom lithium-ion battery pack and Orion 2 BMS integration for a fully electric multi-occupancy vehicle, meeting all American Solar Challenge regulations. Organized weekly work sessions, assigning owners for design, build, and verification tasks across various systems of the battery pack such as the Orion 2 BMS and custom J1772 charging circuit.",
    image: sunstangImage,
    date: "September 2024 – Present",
    tags: ["Battery Systems", "BMS", "Leadership", "EV"],
    type: "work",
  },
  // Projects
  {
    id: "slo-monitoring",
    title: "Perf/W SLO Monitoring for AI Workloads",
    description:
      "Observability and regression gates for monitoring performance per watt SLOs in AI/ML workloads.",
    fullDescription:
      "Placeholder: Details about the SLO monitoring project for AI workloads, including observability pipelines and regression gates implementation.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop",
    date: "2025",
    tags: ["Observability", "AI/ML", "SLO", "Monitoring"],
    type: "project",
  },
  {
    id: "bms-telemetry",
    title: "Orion 2 BMS Telemetry Pipeline",
    description:
      "Built a CAN → Wi-Fi → InfluxDB → Grafana telemetry pipeline for real-time battery monitoring during testing and racing.",
    fullDescription: "custom", // This signals to use a custom detail component
    image: bmsTelemetryImage,
    date: "2025 – Present",
    tags: ["Python", "InfluxDB", "Grafana", "CAN Bus", "ESP32"],
    type: "project",
    githubUrl: "https://github.com/h-illman/Orion2BMS-dataLogging",
  },
  {
    id: "arduino-biometric",
    title: "Arduino Biometric Security System",
    description:
      "A biometric security system built with Arduino for fingerprint-based access control.",
    fullDescription:
      "Placeholder: Details about the Arduino-based biometric security system with fingerprint scanning and access control features.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=450&fit=crop",
    date: "2024",
    tags: ["Arduino", "Biometrics", "Security", "Embedded Systems"],
    type: "project",
  },
  {
    id: "spot2yt",
    title: "Spot2YT - Spotify to YouTube Playlist Converter",
    description:
      "A Python application that converts Spotify playlists to YouTube playlists automatically.",
    fullDescription:
      "Placeholder: Details about the Spot2YT Python application that uses Spotify and YouTube APIs to convert playlists between platforms.",
    image: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=800&h=450&fit=crop",
    date: "2024",
    tags: ["Python", "Spotify API", "YouTube API", "Automation"],
    type: "project",
  },
];

export const getExperienceById = (id: string): Experience | undefined => {
  return experiences.find((exp) => exp.id === id);
};
