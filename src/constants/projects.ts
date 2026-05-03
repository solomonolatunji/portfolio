import type { Project } from "@/interfaces/portfolio";

export const projects: Project[] = [
  {
    id: "11",
    title: "DevPulse",
    year: "2026",
    category: "mobile",
    description:
      "A React Native and Expo mobile client for WakaTime with focused coding stats, streak tracking, and project-level insight.",
    technologies: ["React Native", "Expo", "TypeScript", "WakaTime API"],
    links: [
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.techx.devpulse&hl=en",
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
    description:
      "A fintech product for airtime, data, electricity, transfers, savings, loans, and investments across web and mobile.",
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
      "A vehicle marketplace with a customer-facing mobile app and a Laravel backend for listings, search, and real-time updates.",
    technologies: ["React Native", "Expo", "TypeScript", "Laravel", "MySQL", "WebSockets"],
    links: [
      { label: "Live", href: "https://www.xdriveautos.com" },
      {
        label: "Android Build",
        href: "https://expo.dev/accounts/realsolomon/projects/xdrive/builds/12326bd6-ca28-4299-b67a-8881b2f544b8",
      },
    ],
  },
  {
    id: "8",
    title: "Tercescrow",
    year: "2025",
    category: "mobile",
    description:
      "A gift card and crypto trading app focused on quick settlements, secure transactions, and a smooth mobile experience.",
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
      "An event platform for contests, awards, causes, ticketing, and audience engagement with strong operations tooling.",
    technologies: ["Laravel", "React", "Tailwind CSS", "PostgreSQL"],
    links: [{ label: "Live", href: "https://tickvo.com/" }],
  },
  {
    id: "9",
    title: "Kulipal",
    year: "2025",
    category: "mobile",
    description:
      "A lifestyle app for food ordering, bookings, rentals, and event discovery built around convenience and local commerce.",
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
      "An edtech platform for learning content, student progress, and mobile-first delivery for students and educators.",
    technologies: ["React", "React Native", "NestJS"],
    links: [{ label: "Live", href: "http://e-studylab.com/" }],
  },
  {
    id: "3",
    title: "Martsity",
    year: "2023",
    category: "web",
    description:
      "An ecommerce platform with catalog management, checkout flows, order handling, and business-side admin operations.",
    technologies: ["PHP", "Laravel", "Bootstrap", "MySQL"],
    links: [{ label: "Live", href: "https://martsity.com/" }],
  },
  {
    id: "4",
    title: "Learnmonie",
    year: "2022",
    category: "web",
    description:
      "An affiliate platform for partnership management, performance tracking, and commission reporting.",
    technologies: ["PHP", "Bootstrap", "JavaScript", "MySQL"],
    links: [{ label: "Live", href: "https://learnmonie.com/" }],
  },
];
