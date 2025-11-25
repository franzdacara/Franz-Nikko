
import { Github, Linkedin, Twitter, Facebook, Layout, Server, Terminal, Cpu, Globe, Zap, Mail, MessageSquare, MapPin } from 'lucide-react';
import { title } from 'process';

export const SITE_CONTENT = {
  brand: {
    name: "NIKKO",
    domain: ".DEV",
    resume: "/CV/RESUME(DACARA).pdf"
  },
  hero: {
    greeting: "Hi, I'm",
    name: "NIKKO",
    title: "Software Developer",
    subtitle: "Architecting the digital future.",
    description: "I build immersive web experiences with code and creativity. Specializing in React, TypeScript, and modern UI/UX.",
    status: "Available for Hire",
    cta: {
      primary: "View Work",
      secondary: "Contact Me"
    }
  },
  about: {
    title: "Refining the Digital Experience",
    description: [
      "I'm Nikko, a passionate developer with a deep interest in modern web technologies and interactive design. My journey began with a curiosity for how things work under the hood, leading me to master the art of full-stack development.",
      "I specialize in PHP with Laravel Framework for backend development, and I love working with modern frontend frameworks like Vue.js and React.js. When I'm not coding, I'm exploring new tech trends, optimizing algorithms, or designing intuitive user interfaces."
    ],
    image: "/images/profile/profile_about.jpg",
    stats: [
      { label: "Fast", description: "Optimized for speed and efficiency.", icon: Cpu },
      { label: "Global", description: "Accessible and responsive design.", icon: Globe },
      { label: "Dynamic", description: "Interactive and fluid animations.", icon: Zap }
    ]
  },
  contact: {
    title: "Let's Connect",
    description: "Have a project in mind or just want to discuss the latest in tech? Send me a signal. I'm always open to new opportunities and collaborations.",
    email: "franzdacara25@gmail.com",
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
    title: "Frontend",
    icon: Layout,
    skills: ["Vue.js", "React", "TypeScript", "Tailwind CSS", "Next.js", "Flutter", "Blender"]
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["PHP", "Laravel", "MySQL", "Python", "JavaScript", "MongoDB", "GraphQL"]
  },
  {
    title: "Tools & DevOps",
    icon: Terminal,
    skills: ["Git", "GitHub", "Docker", "Cpanel", "Linux", "CI/CD", "Nginx", "AWS"]
  }
];

export const EXPERIENCE_DATA = [
  {
    company: "EBOS Cloud Accountants",
    role: "Full-stack Developer",
    period: "Sep 2025 - Present",
    type: "Full-time",
    description: "Specializing in maintaining and development a Hospital Information System that provides healthcare solutions. My focus involves maintaining and securing confidential hospital information. I contribute to developing software applications that handle sensitive data with top-notch security measures. Committed to advancing healthcare technology, I aim to empower institutions with innovative solutions while prioritizing data confidentiality.",
    technologies: ["Laravel", "Python", "PHP", "Flutter", "JavaScript", "MySQL", "JQuery", "Bootstrap", "Tailwind CSS", "Git", "GitHub", "Cpanel", "Linux", "CI/CD", "Nginx", "AWS"]
  },
  {
    company: "EBOS Cloud Accountants",
    role: "Back End Developer",
    period: "Aug 2025 - Sep 2025",
    type: "Remote",
    description: "Focused on backend development and optimization.",
    technologies: ["Laravel", "PHP", "Vue.js"]
  },
  {
    company: "Segworks Technologies Corporation",
    role: "Software Developer",
    period: "Sep 2023 - Aug 2025",
    type: "Hybrid",
    location: "Davao, Philippines",
    description: "Specializing in maintaining and development a Hospital Information System that provides healthcare solutions. My focus involves maintaining and securing confidential hospital information. I contribute to developing software applications that handle sensitive data with top-notch security measures.",
    technologies: ["Flutter", "PHP", "Laravel", "JavaScript", "MySQL", "JQuery", "Bootstrap", "Tailwind CSS", "Git", "GitHub", "Cpanel", "Linux", "CI/CD", "Nginx", "AWS"]
  },
  {
    company: "Freelance",
    role: "Web Developer",
    period: "Nov 2022 - Jan 2025",
    type: "Freelance",
    location: "Remote",
    description: "I offer freelance web development services, crafting both personal and company websites to showcase their unique services and identity. Whether you need a personal site or a platform to promote your company's offerings, I'm here to bring your vision to life.",
    technologies: ["JavaScript", "MySQL", "HTML", "CSS", "Wordpress", "PHP", "Laravel"]
  },
  {
    company: "SPLACE BPO",
    role: "Software Developer",
    period: "Feb 2023 - May 2023",
    type: "Internship",
    location: "Davao, Philippines",
    description: "Recognized as the \"Best Intern\" by SPLACE in June 2023 for outstanding contributions in accomplishing the company's request system. Demonstrated exceptional dedication and skill in software development during the internship period.",
    technologies: ["JavaScript", "MySQL", "PHP", "DigitalOcean"]
  }
];

export const PROJECTS_DATA = [
  {
    title: "Shape and Glow",
    category: "Wordpress Website",
    description: "A website for a beauty salon that showcases their services and products.",
    tags: ["Wordpress", "PHP", "Cpanel", "Linux"],
    image: "/images/projects/shape_and_glow.png",
    link: "https://www.shapeandglow.com.au/",
    github: "#"
  },
  {
    title: "Davista - Davao Tourism Game",
    category: "Game",
    description: "Davista is a captivating tourism game that immerses players in Davao City's vibrant culture and rich history. Players explore iconic landmarks while uncovering historical facts and trivia through engaging gameplay.",
    tags: ["Unreal Engine 5", "3D Modeling", "Game Design", "Blueprint Scripting"],
    image: "/images/projects/davista.png",
    link: "https://www.youtube.com/watch?v=m6YKyCJjtlA",
    github: "#"
  },
  {
    title: "NIKX",
    category: "Web Game",
    description: "NIKX is a web game that allows users to test their typing speed and accuracy.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    image: "/images/projects/nikx.png",
    link: "https://nikx-mu.vercel.app/",
    github: "https://github.com/franzdacara/NIKX"
  },
  {
    title: "Dine Out",
    category: "E-Commerce",
    description: "Dine Out is a restaurant reservation platform that allows users to book tables at their favorite restaurants with ease.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "/images/projects/dinteout.png",
    link: "https://franzdacara.github.io/Dine-Our-Restaurant/",
    github: "https://github.com/franzdacara/Dine-Our-Restaurant"
  }
];
