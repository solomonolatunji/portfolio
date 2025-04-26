import type { Project } from "@/interfaces/portfolio";

export const projects: Project[] = [
  {
    id: "1",
    title: "Enterprise SaaS Dashboard",
    description:
      "A comprehensive analytics dashboard for enterprise SaaS platforms with real-time data visualization, role-based access control, and customizable reporting.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    year: "2025",
    category: "web",
    technologies: ["Vue 3", "TypeScript", "Pinia", "GraphQL", "Docker"],
    demoUrl: "#",
    codeUrl: "https://github.com/eminisolomon",
  },
  {
    id: "2",
    title: "Team Collaboration Platform",
    description:
      "A modern collaboration tool with real-time document editing, task management, video conferencing, and AI-powered workflow automation.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    year: "2024",
    category: "web",
    technologies: ["React 18", "NextJS 14", "TypeScript", "tRPC", "Prisma"],
    demoUrl: "#",
    codeUrl: "https://github.com/eminisolomon",
  },
  {
    id: "3",
    title: "Fintech Mobile Application",
    description:
      "A comprehensive financial management app with AI-powered insights, investment portfolio tracking, and advanced security features.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    year: "2024",
    category: "mobile",
    technologies: [
      "React Native",
      "TypeScript",
      "Redux Toolkit",
      "Firebase",
      "Stripe API",
    ],
    demoUrl: "#",
    codeUrl: "https://github.com/eminisolomon",
  },
  {
    id: "4",
    title: "Wellness & Fitness Platform",
    description:
      "A personalized health application with AI-driven workout plans, nutrition analysis, and wearable device integration for comprehensive health monitoring.",
    image:
      "https://images.unsplash.com/photo-1605296867724-fa87a8ef53fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    year: "2023",
    category: "mobile",
    technologies: [
      "Flutter",
      "Dart",
      "Firebase",
      "TensorFlow Lite",
      "BLE Integration",
    ],
    demoUrl: "#",
    codeUrl: "https://github.com/eminisolomon",
  },
  {
    id: "5",
    title: "Marketing Analytics Dashboard",
    description:
      "A comprehensive marketing analytics interface with multi-platform data integration, custom reporting, and predictive analytics for ROI optimization.",
    image:
      "https://images.unsplash.com/photo-1573152958734-1922c188fba3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    year: "2023",
    category: "ui",
    technologies: ["Figma", "Adobe XD", "Design Systems", "Data Visualization"],
    demoUrl: "#",
    codeUrl: "https://github.com/eminisolomon",
  },
  {
    id: "6",
    title: "EdTech Platform Redesign",
    description:
      "Complete UX/UI overhaul for an education technology platform with personalized learning paths, interactive content modules, and accessibility improvements.",
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    year: "2022",
    category: "ui",
    technologies: ["Figma", "Prototyping", "Design Systems", "User Research"],
    demoUrl: "#",
    codeUrl: "https://github.com/eminisolomon",
  },
];

export default projects;
