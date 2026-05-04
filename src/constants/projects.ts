import type { Project } from "@/interfaces/portfolio";

export const projects: Project[] = [
  {
    id: "11",
    title: "DevPulse",
    year: "2026",
    category: "mobile",
    featured: true,
    description:
      "Built the React Native and Expo client for WakaTime users, turning coding activity into clearer daily, weekly, and project-level mobile insight.",
    technologies: ["React Native", "Expo", "TypeScript", "WakaTime API"],
    links: [
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.techx.devpulse&hl=en",
      },
      {
        label: "GitHub",
        href: "https://github.com/eminisolomon/DevPulse.git",
      },
      {
        label: "WakaTime",
        href: "https://wakatime.com/",
      },
    ],
  },
  {
    id: "1",
    title: "TakeNTrade",
    year: "2024",
    category: "mobile",
    featured: true,
    description:
      "Built across web, mobile, and backend to help users handle payments, savings, loans, and investments from one fintech product.",
    technologies: ["React", "React Native", "NestJS", "TypeScript", "PostgreSQL"],
    links: [
      { label: "Live", href: "https://takentrade.com" },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.takentrade.app",
      },
      {
        label: "App Store",
        href: "https://apps.apple.com/ng/app/xpress-takentrade/id6748635694",
      },
    ],
  },
  {
    id: "10",
    title: "XDrive",
    year: "2025",
    category: "mobile",
    description:
      "Built the mobile app and backend stack for a vehicle marketplace, making listings, search, and real-time updates work reliably across platforms.",
    technologies: ["React Native", "Expo", "TypeScript", "Laravel", "MySQL", "WebSockets"],
    links: [
      { label: "Live", href: "https://www.xdriveautos.com" },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.xdrive.app",
      },
    ],
  },
  {
    id: "8",
    title: "Tercescrow",
    year: "2025",
    category: "mobile",
    description:
      "Built the mobile trading experience for gift cards and crypto, improving transaction speed, trust, and day-to-day usability for users.",
    technologies: ["React Native", "TypeScript", "Node.js", "Express", "MongoDB"],
    links: [
      { label: "Live", href: "https://tercescrow.com" },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.tercescrow.app",
      },
      {
        label: "App Store",
        href: "https://apps.apple.com/ng/app/tercescrow/id6743555204",
      },
    ],
  },
  {
    id: "6",
    title: "Tickvo",
    year: "2025",
    category: "web",
    description:
      "Built the event operations platform for contests, awards, causes, and ticketing, giving organizers stronger control over engagement and workflows.",
    technologies: ["Laravel", "React", "Tailwind CSS", "PostgreSQL"],
    links: [{ label: "Live", href: "https://tickvo.com/" }],
  },
  {
    id: "9",
    title: "Kulipal",
    year: "2025",
    category: "mobile",
    description:
      "Built the mobile experience for food orders, bookings, rentals, and event discovery so users could handle everyday local commerce in one app.",
    technologies: ["React Native", "TypeScript", "Node.js", "Express", "MongoDB"],
    links: [
      { label: "Live", href: "https://kulipal.com" },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.kulipamegaglobal.kulipal",
      },
      {
        label: "App Store",
        href: "https://apps.apple.com/ng/app/kulipal/id6456947840",
      },
    ],
  },
  {
    id: "2",
    title: "Estudylab",
    year: "2023",
    category: "mobile",
    description:
      "Built the learning platform across web and mobile to make educational content, progress tracking, and delivery more accessible for students and educators.",
    technologies: ["React", "React Native", "NestJS"],
    links: [{ label: "Live", href: "http://e-studylab.com/" }],
  },
  {
    id: "3",
    title: "Martsity",
    year: "2023",
    category: "web",
    description:
      "Built the ecommerce platform and admin workflows needed to manage products, checkout, orders, and core business operations.",
    technologies: ["PHP", "Laravel", "Bootstrap", "MySQL"],
    links: [{ label: "Live", href: "https://martsity.com/" }],
  },
  {
    id: "4",
    title: "Learnmonie",
    year: "2022",
    category: "web",
    description:
      "Built the affiliate platform for tracking partnerships, commissions, and performance so operators could manage growth with better visibility.",
    technologies: ["PHP", "Bootstrap", "JavaScript", "MySQL"],
    links: [{ label: "Live", href: "https://learnmonie.com/" }],
  },
];
