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
    id: "software-engineer-intern",
    title: "Software Engineer Intern",
    description:
      "Worked on building scalable microservices and internal tooling to improve developer productivity across the organization.",
    fullDescription:
      "During my internship, I focused on developing and maintaining microservices that handled millions of requests daily. I collaborated with senior engineers to design and implement new features, participated in code reviews, and contributed to improving our CI/CD pipelines. Key achievements include reducing API latency by 40% and implementing a new caching strategy that saved infrastructure costs.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop",
    date: "Summer 2024",
    tags: ["TypeScript", "Node.js", "AWS", "Docker"],
    type: "work",
  },
  {
    id: "robotics-club",
    title: "Robotics Club Lead",
    description:
      "Led a team of 12 members in designing and building an autonomous robot for the annual engineering competition.",
    fullDescription:
      "As the club lead, I managed project timelines, delegated tasks, and mentored newer members in robotics fundamentals. Our team designed a robot capable of navigating obstacle courses autonomously using computer vision and sensor fusion. We placed 2nd in the regional competition and qualified for nationals.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=450&fit=crop",
    date: "2023 - Present",
    tags: ["Python", "ROS", "Computer Vision", "Arduino"],
    type: "club",
  },
  {
    id: "personal-website",
    title: "Personal Portfolio",
    description:
      "Designed and developed a minimalist portfolio website to showcase my work and experience.",
    fullDescription:
      "Built a clean, responsive portfolio website using React and Tailwind CSS. Focused on simplicity, fast loading times, and accessible design. The site features smooth animations, dark mode support, and optimized performance scoring 98+ on Lighthouse.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    date: "2024",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    type: "project",
  },
  {
    id: "ml-research",
    title: "Machine Learning Research Assistant",
    description:
      "Assisted in research on natural language processing models for sentiment analysis and text classification.",
    fullDescription:
      "Worked under a faculty advisor to conduct research on transformer-based models for NLP tasks. Implemented and fine-tuned BERT models for domain-specific sentiment analysis, achieving a 15% improvement over baseline models. Co-authored a paper submitted to an ACL workshop.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop",
    date: "Fall 2023",
    tags: ["Python", "PyTorch", "NLP", "Transformers"],
    type: "work",
  },
];

export const getExperienceById = (id: string): Experience | undefined => {
  return experiences.find((exp) => exp.id === id);
};
