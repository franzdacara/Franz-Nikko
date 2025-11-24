
import { Github, Linkedin, Twitter, Layout, Server, Terminal, Cpu, Globe, Zap, Mail, MessageSquare, MapPin } from 'lucide-react';

export const SITE_CONTENT = {
  brand: {
    name: "NIKKO",
    domain: ".DEV"
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
      "I specialize in building scalable applications using React, TypeScript, and Node.js. When I'm not coding, I'm exploring new tech trends, optimizing algorithms, or designing intuitive user interfaces."
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
    email: "hello@nikko.dev",
    socialHandle: "@nikkodev",
    location: "San Francisco, CA (Remote)",
    socialLinks: [
      { platform: "Github", url: "https://github.com", icon: Github },
      { platform: "Linkedin", url: "https://linkedin.com", icon: Linkedin },
      { platform: "Twitter", url: "https://twitter.com", icon: Twitter }
    ]
  }
};

export const SKILLS_DATA = [
  {
    title: "Frontend",
    icon: Layout,
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Framer Motion", "Three.js"]
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Python", "PostgreSQL", "GraphQL", "Redis", "Docker"]
  },
  {
    title: "Tools & DevOps",
    icon: Terminal,
    skills: ["Git", "AWS", "Linux", "CI/CD", "Jest", "Webpack"]
  }
];

export const PROJECTS_DATA = [
  {
    title: "Neon Nexus",
    category: "Dashboard UI",
    description: "A futuristic data visualization dashboard for crypto analytics featuring real-time socket connections and WebGL charts.",
    tags: ["React", "Three.js", "WebSocket", "Tailwind"],
    image: "https://picsum.photos/seed/nexus/800/600",
    link: "#",
    github: "#"
  },
  {
    title: "Echo Chat",
    category: "AI Communication",
    description: "Real-time messaging platform integrated with LLMs for smart replies and automated translation services.",
    tags: ["TypeScript", "Node.js", "OpenAI", "Socket.io"],
    image: "https://picsum.photos/seed/echo/800/600",
    link: "#",
    github: "#"
  },
  {
    title: "Void Commerce",
    category: "E-Commerce",
    description: "Headless e-commerce solution with a focus on speed, accessibility, and immersive product interactions.",
    tags: ["Next.js", "GraphQL", "Stripe", "Framer"],
    image: "https://picsum.photos/seed/void/800/600",
    link: "#",
    github: "#"
  }
];
