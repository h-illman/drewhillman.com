import opgImage from "@/assets/opg.jpg";
import gdlsImage from "@/assets/gdls.jpg";
import sunstangImage from "@/assets/sunstang.jpg";
import bmsTelemetryImage from "@/assets/bms-accumulator.png";
import sloTelemetryDashboard from "@/assets/slo-telemetry-dashboard.png";
import thermalModelImage from "@/assets/thermal-model.png";
import arduinoBiolockImage from "@/assets/arduino-biolock.png";
import aurovexDashboardImage from "@/assets/aurovex-code.png";
import fpgaBoardImage from "@/assets/fpga-board.png";
import fpgaPongCardImage from "@/assets/fpga-pong-card.png";
import chargingSolderingImage from "@/assets/charging-soldering.png";
import eyebertOscilloscopeImage from "@/assets/eyebert-oscilloscope.jpg";
export interface Experience {
  id: string;
  title: string;
  company?: string;
  companyUrl?: string;
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
    title: "Reliability Engineer (PEY) — Monitoring & Diagnostics",
    company: "Ontario Power Generation",
    companyUrl: "https://opg.com",
    description:
      "Joining OPG's Monitoring & Diagnostics team for a 12-month PEY placement, working on equipment-health models and reliability analytics across the nuclear and hydro fleet.",
    fullDescription:
      "I'm joining OPG's Monitoring & Diagnostics team for a 12-month reliability engineering placement (PEY). OPG is the largest nuclear generator in Canada, and the M&D team sits at the centre of keeping a fleet of equipment-health models running accurately across the company's nuclear and hydroelectric assets — basically catching problems in big rotating machines before they actually become problems.\n\nMy work will span model maintenance and anomaly screening in AVEVA Predictive Analytics and Seeq, digging into signals to connect flagged anomalies back to operating context, and building reliability dashboards in Microsoft Power Platform. On the data side, I'll be developing pipelines in Databricks and Azure and writing Python tools to automate alert triage and data-refresh workflows so the team spends less time on plumbing.\n\nI'm early in the term and learning fast — I'll keep this page updated as the work develops and I get a clearer sense of what I'm actually contributing.",
    image: opgImage,
    date: "May 2026 – May 2027 (Incoming)",
    tags: ["AVEVA Predictive Analytics", "Seeq", "OSIsoft PI", "Databricks", "Python"],
    type: "work",
  },
  {
    id: "gdls-intern",
    title: "Manufacturing Engineering Intern",
    company: "General Dynamics",
    companyUrl: "https://gdls.com",
    description:
      "Designed electrical layouts and safety circuits using AutoCAD, oversaw equipment installations, and contributed to LEED Gold and ISO 50001 energy initiatives.",
    fullDescription:
      "custom",
    image: gdlsImage,
    date: "May 2025 – August 2025",
    tags: ["AutoCAD", "Electrical Design", "LEED", "ISO 50001"],
    type: "work",
  },
  {
    id: "aurovex",
    title: "Data Analytics Engineer",
    company: "Aurovex",
    companyUrl: "https://aurovex.ca",
    description:
      "Built Power BI dashboards for an AI image-analysis platform used by civil engineering consulting firms to streamline building assessment reports.",
    fullDescription: "custom",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    date: "January 2026 – Present",
    tags: ["Power BI", "Data Analytics", "AI/ML", "Product Analytics"],
    type: "work",
  },
  {
    id: "sunstang",
    title: "Battery Pack Team Leader",
    company: "Western Sunstang",
    companyUrl: "https://sunstang.ca",
    description:
      "Leading ~20 members in designing, testing, and optimizing a custom lithium-ion battery pack and BMS integration for a solar-electric vehicle.",
    fullDescription: "custom",
    image: sunstangImage,
    date: "September 2024 – Present",
    tags: ["Battery Systems", "BMS", "Leadership", "EV"],
    type: "work",
  },
  // Projects
  {
    id: "eyebert",
    title: "Eye-BERT",
    description:
      "A SerDes Bit Error Rate Tester on the Terasic DE25 FPGA that generates PRBS patterns, measures link quality, and produces BER waterfall curves and eye diagrams.",
    fullDescription: "custom",
    image: eyebertOscilloscopeImage,
    date: "2026 (In Progress)",
    tags: ["FPGA", "Intel Agilex 5", "SerDes", "RTL", "Signal Integrity", "High-Speed I/O"],
    type: "project",
    githubUrl: "https://github.com/h-illman/eye-bert",
  },
  {
    id: "open-hw-validation",
    title: "Open Hardware Validation Harness",
    description:
      "An open-source Python framework for automating the RTL validation lifecycle from simulation through physical FPGA bring-up on the Terasic DE25.",
    fullDescription: "custom",
    image: fpgaBoardImage,
    date: "2026",
    tags: ["Python", "cocotb", "Verilator", "FPGA", "GTKWave", "RTL Verification"],
    type: "project",
    githubUrl: "https://github.com/h-illman/open-hw-validation-harness",
  },
  {
    id: "slo-monitoring",
    title: "Perf/W SLO Monitoring for AI Workloads",
    description:
      "A reliability-style monitoring system for AI compute efficiency with benchmark harness, telemetry, regression detection, and runbooks.",
    fullDescription: "custom",
    image: sloTelemetryDashboard,
    date: "2026",
    tags: ["Python", "InfluxDB", "Grafana", "NVIDIA NVML", "Observability"],
    type: "project",
    githubUrl: "https://github.com/h-illman/perfw-ai-runner",
  },
  {
    id: "bms-telemetry",
    title: "Orion 2 BMS Integration & Telemetry",
    description:
      "Retrofitted an Orion 2 BMS into an existing solar car battery pack and built a full CAN-to-cloud telemetry pipeline for real-time monitoring.",
    fullDescription: "custom",
    image: bmsTelemetryImage,
    date: "2025 – Present",
    tags: ["Python", "Supabase", "React", "CAN Bus", "BMS", "Embedded Systems"],
    type: "project",
    githubUrl: "https://github.com/h-illman/Orion2BMS-dataLogging",
  },
  {
    id: "charging-system",
    title: "Solar Car Charging System Integration",
    description:
      "Designed and integrated the full charging path for a solar-electric vehicle, including the Elcon charger, J1772/OpenEVSE control logic, and Orion 2 BMS supervision.",
    fullDescription: "custom",
    image: chargingSolderingImage,
    date: "2026",
    tags: ["Electrical Design", "J1772", "BMS", "Systems Integration", "EV Charging"],
    type: "project",
  },
  {
    id: "fpga-pong",
    title: "FPGA Pong",
    description:
      "A hardware implementation of Pong on a DE10-Standard FPGA with VGA output, ADC-based paddle control, real-time collision detection, and seven-segment score display.",
    fullDescription: "custom",
    image: fpgaPongCardImage,
    date: "2026",
    tags: ["FPGA", "DE10-Standard", "VGA", "ADC", "Embedded Systems", "C"],
    type: "project",
    githubUrl: "https://github.com/h-illman/fpga-pong",
  },
  {
    id: "aurovex-dashboard",
    title: "Aurovex Finance Dashboard",
    description:
      "A fast, read-only Next.js dashboard for visualizing cloud compute costs and report generation metrics derived directly from a PostgreSQL database.",
    fullDescription: "custom",
    image: aurovexDashboardImage,
    date: "2026",
    tags: ["Next.js 14", "TypeScript", "Tremor UI", "Drizzle ORM", "Supabase", "PostgreSQL"],
    type: "project",
  },
  {
    id: "thermal-model",
    title: "Solar Car Battery Thermal Model",
    description:
      "A high-fidelity MATLAB simulation to predict thermal behavior of a 14.5 kWh 40p30s battery pack under racing and environmental conditions.",
    fullDescription: "custom",
    image: thermalModelImage,
    date: "2026",
    tags: ["MATLAB", "Simscape", "Thermal Physics", "Battery Systems"],
    type: "project",
  },
  {
    id: "arduino-biometric",
    title: "Arduino SmartLatch BioLock",
    description:
      "A multi-factor biometric security system combining fingerprint, RFID, and keypad authentication with a custom PCB and Bluetooth event logging.",
    fullDescription: "custom",
    image: arduinoBiolockImage,
    date: "2025",
    tags: ["C++", "Arduino", "PCB Design", "Security", "Embedded Systems"],
    type: "project",
  },
];

export const getExperienceById = (id: string): Experience | undefined => {
  return experiences.find((exp) => exp.id === id);
};
