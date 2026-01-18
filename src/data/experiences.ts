export interface Experience {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  date?: string;
  tags: string[];
  type: "work" | "project" | "club";
}

export const experiences: Experience[] = [
  {
    id: "opg-intern",
    title: "Electrical Engineering Intern – OPG",
    description:
      "Incoming intern on the Monitoring and Diagnostics team, working with machine-learning models for equipment health monitoring and predictive analysis.",
    fullDescription:
      "When I start at OPG, I'll be working with the Monitoring & Diagnostics team to keep a large fleet of equipment-health models running reliably and producing useful alerts. That includes regularly refreshing the datasets these models rely on, reviewing anomaly flags against historical baselines, and updating the model logic when needed so the alerts stay accurate.\n\nI'll also be investigating unusual equipment trends by connecting model anomalies to related process signals and operating context, then documenting what's most likely happening, how risky it is, and what follow-ups make sense. On the reporting side, I'll be building equipment-health dashboards in Microsoft Power Platform to track KPIs, alert frequency/volume, and model performance, making reliability trends easier to see and act on.\n\nTo support all of this, I'll be developing and improving data pipelines and analytics workflows in Databricks and Azure to clean, validate, and contextualize operational data for automation and predictive analysis. I'll also be creating lightweight internal tools in Python to automate tasks like alert triage and data refresh checks, cutting down manual steps and improving consistency across the team's workflow.",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&h=450&fit=crop",
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
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=450&fit=crop",
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
    type: "club",
  },
  {
    id: "sunstang",
    title: "Battery Pack Team Leader – Western Sunstang",
    description:
      "Leading ~20 members in designing, testing, and optimizing a custom lithium-ion battery pack and BMS integration for a solar-electric vehicle.",
    fullDescription:
      "Led the battery team (~20 members) in the design, testing, and optimization of a custom lithium-ion battery pack and Orion 2 BMS integration for a fully electric multi-occupancy vehicle, meeting all American Solar Challenge regulations. Organized weekly work sessions, assigning owners for design, build, and verification tasks across various systems of the battery pack such as the Orion 2 BMS and custom J1772 charging circuit.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop",
    date: "September 2024 – Present",
    tags: ["Battery Systems", "BMS", "Leadership", "EV"],
    type: "club",
  },
  {
    id: "orion-bms",
    title: "Orion 2 Battery Management System Integration",
    description:
      "Integrated an Orion 2 BMS into a 108V, 40 cell custom lithium-ion battery pack with custom wiring harnesses and validation testing.",
    fullDescription:
      "Integrated an Orion 2 BMS into a 108V, 40 cell custom lithium-ion battery pack by creating and installing the voltage tap wiring harness, thermistor harness, and current sensor wiring, ensuring proper cable management and thermals. Configured and validated the BMS in Orion software, ensuring proper cell counts, protection limits, fault logic, and CAN outputs, and created a custom test PCB to support scrutineering tests at competition.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop",
    date: "May 2025 – December 2025",
    tags: ["BMS", "Lithium-Ion", "PCB Design", "CAN Bus"],
    type: "project",
  },
  {
    id: "telemetry-system",
    title: "Real-Time Telemetry and Remote Monitoring System",
    description:
      "Designed a real-time battery telemetry system using ESP32 with custom PCB shield for live monitoring of pack voltage, SOC, and temperature.",
    fullDescription:
      "Designed and implemented a real-time battery telemetry system for a moving vehicle using an ESP32 with a custom PCB shield, allowing for the decoding of CAN-based pack data received from the BMS and transmission of live metrics such as pack voltage, SOC, and temperature over Wi-Fi for live monitoring. Utilized InfluxDB and Grafana to log and visualize the data through dashboards and time-series trend plots.",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&h=450&fit=crop",
    date: "January 2026 – Present",
    tags: ["ESP32", "PCB Design", "InfluxDB", "Grafana", "CAN Bus"],
    type: "project",
  },
];

export const getExperienceById = (id: string): Experience | undefined => {
  return experiences.find((exp) => exp.id === id);
};
