
import { Github, Linkedin, Facebook, Layout, Server, Terminal, Cpu, Globe, Zap, Award } from 'lucide-react';

export const SITE_CONTENT = {
  brand: {
    name: "NIKKO",
    domain: ".DEV",
    resume: "/CV/RESUME(DACARA).pdf"
  },
  hero: {
    greeting: "Hi, I'm",
    name: "NIKKO",
    title: "Full-Stack Developer | DevOps Engineer",
    subtitle: "Architecting resilient healthcare systems, local AI pipelines, and automated cloud infrastructure.",
    description: "Laravel · Python · React · Flutter · Docker · CI/CD — specializing in automated pipelines, intelligent document APIs, and mission-critical systems.",
    status: "Open to Work",
    cta: {
      primary: "View Projects",
      secondary: "Download CV"
    }
  },
  about: {
    title: "Building Scalable Systems & Automated Pipelines",
    description: [
      "Full-Stack Developer and DevOps Engineer based in Davao City, Philippines. I specialize in building scalable web applications, integrating local AI/OCR services, and automating CI/CD release pipelines.",
      "My work spans developing OCR-driven document processing APIs, maintaining high-availability Hospital Information Systems (HIS), and building clinical mobile applications in Flutter. I bridge backend architecture, modern frontend interfaces, and reliable deployment workflows to solve complex operational challenges."
    ],
    image: "/images/profile/NIKKO.jpg",
    stats: [
      { label: "10 HIS Systems", description: "Maintained 10 hospital information systems & PhilHealth V2 automation.", icon: Globe },
      { label: "Local AI & OCR", description: "High-throughput OCR web APIs with local AI models and document processing.", icon: Cpu },
      { label: "DevOps & Cloud", description: "Automated GitHub Actions CI/CD pipelines, Docker containerization & Nginx proxying.", icon: Server }
    ]
  },
  contact: {
    title: "Get in Touch",
    description: "Available for full-time roles, contract work, and technical consulting. Based in Davao City — open to remote.",
    email: "franzdacara25@gmail.com",
    phone: "+63264249587",
    socialHandle: "@nikkodacara",
    location: "Davao City, Philippines",
    socialLinks: [
      { platform: "Github", url: "https://github.com/franzdacara", icon: Github },
      { platform: "Linkedin", url: "https://www.linkedin.com/in/nikkodacara/", icon: Linkedin },
      { platform: "Facebook", url: "https://www.facebook.com/franz.dacara", icon: Facebook }
    ]
  }
};

export const SKILLS_DATA = [
  {
    title: "Frontend & Mobile",
    icon: Layout,
    skills: ["React.js", "Vue.js", "Angular", "Flutter", "React Native", "JavaScript", "TypeScript", "Tailwind CSS", "Bootstrap", "WordPress"]
  },
  {
    title: "Backend & Languages",
    icon: Server,
    skills: ["PHP", "Laravel", "Python", "Dart", "C++", "C#", "MySQL", "MongoDB", "FastAPI"]
  },
  {
    title: "DevOps & Infrastructure",
    icon: Terminal,
    skills: ["CI/CD Pipelines", "Docker", "Git", "GitHub", "cPanel", "Linux", "Nginx", "AWS"]
  }
];

export const EXPERIENCE_DATA = [
  {
    company: "EBOS Cloud Accountants",
    role: "Full-Stack Developer",
    period: "Jul 2025 — Present",
    type: "Full-time",
    location: "Remote",
    description: "Designed and developed an OCR-based AI Web API integrating local AI models to automate document processing and data extraction. Integrated new APIs into the core accounting platform to enhance functionality and system interoperability, while leading and managing automated CI/CD pipelines for reliable releases.",
    technologies: ["Python", "FastAPI", "Local AI / Ollama", "PHP", "Laravel", "CI/CD", "Docker", "MySQL", "Git", "AWS"]
  },
  {
    company: "Segworks Technologies",
    role: "Web & Mobile Developer",
    period: "Aug 2023 — Jul 2025",
    type: "Full-time",
    location: "Davao, Philippines",
    description: "Provided technical support and system maintenance for 10 Hospital Information Systems (HIS), ensuring high availability. Implemented hospital-specific workflows, developed web/backend solutions in PHP/SQL/AJAX, built a patient queuing system, integrated PhilHealth V2 to automate claims transmittal, and developed mobile applications for doctors and nurses using Dart/Flutter.",
    technologies: ["PHP", "Laravel", "Dart", "Flutter", "JavaScript", "SQL", "AJAX", "PhilHealth V2", "JRXML", "XML", "FPDF"]
  },
  {
    company: "Freelance",
    role: "Website Designer & Developer",
    period: "Nov 2022 — Jan 2024",
    type: "Freelance",
    location: "Remote",
    description: "Designed and developed responsive client websites using PHP, JavaScript, jQuery, and custom WordPress solutions. Applied SEO best practices to boost search visibility and managed multiple concurrent projects meeting strict quality and delivery deadlines.",
    technologies: ["PHP", "JavaScript", "jQuery", "WordPress", "HTML", "CSS", "MySQL", "SEO"]
  },
  {
    company: "SPLACE BPO Company",
    role: "Front End Developer (Intern)",
    period: "Feb 2023 — Mar 2023",
    type: "Internship",
    location: "Davao, Philippines",
    description: "Converted application concepts into user-friendly, responsive web interfaces for mobile and desktop. Contributed to the development of an internal data gathering and lead generation system, enabling structured data capture, storage, and reuse for operational processes.",
    technologies: ["JavaScript", "HTML", "CSS", "PHP", "MySQL"]
  },
  {
    company: "Jose Maria College Foundation Inc.",
    role: "Video & Photo Editor",
    period: "Aug 2021 — May 2022",
    type: "Part-time",
    location: "Davao, Philippines",
    description: "Edited video content and photography for school activities and events using Adobe tools. Organized and managed digital photo and video documentation archives for school operations.",
    technologies: ["Adobe Photoshop", "Adobe After Effects", "Figma", "Canva"]
  }
];

export interface ProjectItem {
  title: string;
  category: string;
  filterCategory: string;
  description: string;
  longDescription: string;
  highlights: string[];
  tags: string[];
  image: string;
  link?: string;
  github?: string;
  domain?: string;
  status?: string;
  videoEmbedUrl?: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    title: "E-Resonz",
    category: "OCR / AI Platform",
    filterCategory: "AI & Full-Stack",
    description: "Enterprise document OCR platform integrating Python/FastAPI with local Ollama LLMs for automated invoice extraction and structured data processing.",
    longDescription: "E-Resonz is an intelligent document processing engine engineered to eliminate manual accounting data entry. It processes multi-format invoices, receipts, and financial statements, extracting tabular data and metadata with high precision while keeping inference fully local.",
    highlights: [
      "Local LLM inference via Ollama to ensure complete data sovereignty and zero cloud leakage",
      "High-performance asynchronous FastAPI microservice deployed on AWS EC2 with Nginx reverse proxy",
      "Type-safe React + TypeScript frontend featuring drag-and-drop document intake and structured JSON schema export"
    ],
    tags: ["React", "TypeScript", "Python", "FastAPI", "Ollama", "AWS", "Nginx", "Docker"],
    image: "/images/projects/E_Resonz.png",
    link: "https://test.app-prokakis.com/",
    github: "#",
    domain: "test.app-prokakis.com",
    status: "Live Production"
  },
  {
    title: "Shape and Glow",
    category: "WordPress / Client",
    filterCategory: "CMS & Client",
    description: "Production website for an Australian aesthetics salon, featuring custom theme architecture, service booking integrations, and targeted SEO optimization.",
    longDescription: "Built for an Australian beauty salon client, Shape and Glow provides a sleek customer journey from service discovery to online booking. Developed with custom WordPress theme files, mobile-responsive layout, and high-performance server-side caching.",
    highlights: [
      "Custom bespoke WordPress theme engineered without bloated page builders for maximum performance",
      "Integrated third-party booking gateway with automatic client reservation confirmations",
      "Optimized technical SEO, WebP image compression, and cPanel/Linux server configuration"
    ],
    tags: ["WordPress", "PHP", "cPanel", "Linux", "SEO", "Custom Theme"],
    image: "/images/projects/shape_and_glow.png",
    link: "https://www.shapeandglow.com.au/",
    github: "#",
    domain: "shapeandglow.com.au",
    status: "Live Client"
  },
  {
    title: "Davista",
    category: "Game / Unreal Engine 5",
    filterCategory: "3D & Interactive",
    description: "Interactive 3D exploration experience built in Unreal Engine 5 showcasing Davao City landmarks with custom architectural assets and dynamic lighting.",
    longDescription: "Davista is an interactive tourism exploration project showcasing notable landmarks in Davao City, Philippines. Powered by Unreal Engine 5, it features realistic architectural models created in Blender, dynamic Lumen global illumination, and intuitive exploration mechanics.",
    highlights: [
      "Custom 3D modeling and texturing of real-world Davao City architectural landmarks in Blender",
      "Interactive gameplay mechanisms, quest triggers, and navigation implemented in UE5 Blueprints",
      "Utilized Lumen lighting and Nanite geometry for high-fidelity real-time rendering"
    ],
    tags: ["Unreal Engine 5", "Blender", "3D Modeling", "Game Design", "Blueprint Scripting"],
    image: "/images/projects/davista.png",
    link: "https://www.youtube.com/watch?v=m6YKyCJjtlA",
    videoEmbedUrl: "https://www.youtube-nocookie.com/embed/m6YKyCJjtlA?autoplay=1",
    github: "#",
    domain: "youtube.com/watch?v=m6YKyCJjtlA",
    status: "Video Showcase"
  },
  {
    title: "NIKX",
    category: "Web Application",
    filterCategory: "Web Applications",
    description: "Real-time typing speed and accuracy engine with live telemetry, dynamic sentence generation, and persistent personal record tracking.",
    longDescription: "NIKX is a typing test web application built for keyboard enthusiasts. It monitors keystroke timing at millisecond resolution, calculates real-time Words Per Minute (WPM) and accuracy percentages, and provides a distraction-free keyboarding environment.",
    highlights: [
      "Real-time keystroke event processing and accurate WPM telemetry engine",
      "Dynamic prompt generation with variable test durations and error highlighting",
      "Responsive Tailwind CSS UI deployed on Vercel with automated preview deployments"
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "Vercel"],
    image: "/images/projects/nikx.png",
    link: "https://nikx-mu.vercel.app/",
    github: "https://github.com/franzdacara/NIKX",
    domain: "nikx-mu.vercel.app",
    status: "Live Web App"
  },
  {
    title: "NiksBakerySystem",
    category: "Inventory & POS",
    filterCategory: "Web Applications",
    description: "Commercial bakery inventory management and point-of-sale portal designed for batch recipe tracking, stock depletion, and sales reporting.",
    longDescription: "Designed to streamline retail bakery operations, NiksBakerySystem provides ingredient inventory management, batch production tracking, and sales analytics in a fast, intuitive client-side portal.",
    highlights: [
      "Ingredient-to-product mapping for automated recipe stock depletion tracking",
      "Point-of-sale transaction logging and daily revenue reporting dashboards",
      "Modular React state architecture engineered for rapid order entry on tablet touchscreens"
    ],
    tags: ["TypeScript", "React", "Tailwind CSS", "Vite", "CRUD"],
    image: "/images/projects/niks_bakery_system.png",
    link: "https://niks-bakery-system.vercel.app/",
    github: "https://github.com/franzdacara/NiksBakerySystem",
    domain: "niks-bakery-system.vercel.app",
    status: "Live Web App"
  },
  {
    title: "Dine Out",
    category: "Frontend Static",
    filterCategory: "Web Applications",
    description: "High-performance restaurant reservation and dining menu platform built exclusively with vanilla JavaScript, modern CSS, and semantic HTML5.",
    longDescription: "Dine Out demonstrates core web fundamentals: building a modern, responsive, and visually rich dining reservation website with zero dependencies, zero bundlers, and minimal overhead.",
    highlights: [
      "Sub-50KB total asset payload delivering near-instant First Contentful Paint",
      "Custom vanilla JavaScript form validation and accessible interactive booking controls",
      "Responsive multi-tier layout styled with modern CSS variables and flexbox"
    ],
    tags: ["HTML5", "CSS3", "JavaScript", "GitHub Pages", "Performance"],
    image: "/images/projects/dinteout.png",
    link: "https://franzdacara.github.io/Dine-Our-Restaurant/",
    github: "https://github.com/franzdacara/Dine-Our-Restaurant",
    domain: "franzdacara.github.io",
    status: "Live Web App"
  }
];
