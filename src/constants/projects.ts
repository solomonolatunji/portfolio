import type { Project } from "@/interfaces/portfolio";
import takentradeImg from '@/assets/images/takentrade.png';
import estudylabImg from '@/assets/images/estudylab.png';
import tickvoImg from '@/assets/images/tickvo.png';
import tercescrowImg from '@/assets/images/tercescrow.jpg';
import kulipalImg from '@/assets/images/kulipal.png';

export const projects: Project[] = [
  {
    id: "1",
    title: "TakeNTrade",
    description:
      "A robust fintech platform for utilities and bills payment, airtime, data, electricity, loans, money transfers, Ajo (thrift), and investments. TakeNTrade simplifies financial transactions and daily payments for users.",
    detailedDescription:
      "TakeNTrade is a comprehensive fintech solution that enables users to pay for utilities (airtime, data, electricity), manage bills, access loans, perform money transfers, participate in Ajo (thrift savings), and invest in various opportunities. The platform is designed for ease of use, security, and reliability, making everyday financial tasks seamless for individuals and businesses.",
    image: takentradeImg,
    year: "2024",
    category: "mobile",
    technologies: ["React", "React Native", "NestJS", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    demoUrl: "https://play.google.com/store/apps/details?id=com.takentrade.app",
    codeUrl: "https://github.com/eminisolomon",
    features: [
      "Airtime, data, and electricity bill payments",
      "Loans and micro-lending services",
      "Money transfers and wallet management",
      "Ajo (thrift savings) management",
      "Investment opportunities and tracking",
      "User-friendly dashboard and transaction history",
      "Secure authentication and payment processing"
    ],
    role: "Full-stack developer responsible for frontend, backend, and mobile app development, including payment integrations, loan management, and thrift savings features.",
    challenges: "Key challenges included integrating multiple payment gateways, ensuring transaction security, and building a reliable thrift (Ajo) system. Solutions involved robust API integrations, secure authentication, and thorough transaction auditing.",
    gallery: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    ]
  },
  {
    id: "2",
    title: "Estudylab",
    description:
      "An educational technology platform with mobile app and web interface for students and educators. Features interactive learning modules and progress tracking.",
    detailedDescription:
      "Estudylab is an innovative educational technology platform designed to enhance the learning experience for students and educators. The platform combines web and mobile interfaces to provide seamless access to educational content, interactive learning modules, and comprehensive progress tracking. Built with React and React Native for cross-platform compatibility, with a robust NestJS backend.",
    image: estudylabImg,
    year: "2023",
    category: "mobile",
    technologies: ["React", "React Native", "NestJS"],
    demoUrl: "http://e-studylab.com/",
    codeUrl: "https://github.com/eminisolomon",
    features: [
      "Interactive learning modules and quizzes",
      "Progress tracking and analytics dashboard",
      "Cross-platform mobile app for offline learning",
      "Real-time collaboration features",
      "Content management system for educators",
      "Personalized learning paths and recommendations"
    ],
    role: "Full-stack developer focusing on creating an intuitive learning experience across web and mobile platforms, implementing interactive features, and building a scalable backend system.",
    challenges: "Key challenges included creating engaging interactive content, implementing offline functionality for mobile users, and building a recommendation system for personalized learning. Solutions involved progressive web app features, local storage strategies, and machine learning algorithms for content recommendations.",
    gallery: [
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    ]
  },
  {
    id: "3",
    title: "Martsity",
    description:
      "A full-featured ecommerce web platform with product management, shopping cart, payment integration, and admin dashboard for business operations.",
    detailedDescription:
      "Martsity is a comprehensive ecommerce platform built with PHP and Laravel, featuring a complete online shopping experience with product management, secure payment processing, and an intuitive admin dashboard. The platform includes advanced features like inventory management, order tracking, and customer relationship management.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    year: "2023",
    category: "web",
    technologies: ["PHP", "Laravel", "Bootstrap", "MySQL"],
    demoUrl: "https://martsity.com/",
    codeUrl: "https://github.com/eminisolomon",
    features: [
      "Complete product catalog with search and filtering",
      "Shopping cart and secure checkout process",
      "Payment gateway integration (Stripe/PayPal)",
      "Order management and tracking system",
      "Admin dashboard for inventory and sales management",
      "Customer account management and order history"
    ],
    role: "Full-stack developer responsible for building the entire ecommerce platform, including frontend design, backend logic, database design, and third-party payment integrations.",
    challenges: "Main challenges included implementing secure payment processing, managing inventory in real-time, and creating an intuitive admin interface. These were addressed through proper API integrations, database transactions, and responsive design principles.",
    gallery: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    ]
  },
  {
    id: "4",
    title: "Learnmonie",
    description:
      "An affiliate marketing platform with web interface for content creators and marketers to manage partnerships and track performance metrics.",
    detailedDescription:
      "Learnmonie is a specialized affiliate marketing platform that enables content creators and marketers to manage partnerships, track performance metrics, and optimize their affiliate marketing strategies. The platform provides comprehensive analytics, commission tracking, and partnership management tools.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    year: "2022",
    category: "web",
    technologies: ["PHP", "Bootstrap", "JavaScript", "MySQL"],
    demoUrl: "https://learnmonie.com/",
    codeUrl: "https://github.com/eminisolomon",
    features: [
      "Affiliate link generation and tracking",
      "Commission calculation and payout system",
      "Performance analytics and reporting dashboard",
      "Partner relationship management",
      "Real-time conversion tracking",
      "Automated payment processing"
    ],
    role: "Full-stack developer focused on creating a user-friendly platform for affiliate marketers, implementing tracking systems, and building comprehensive analytics dashboards.",
    challenges: "Key challenges included implementing accurate tracking systems, handling high-volume data processing, and creating intuitive analytics dashboards. Solutions involved efficient database design, caching strategies, and responsive data visualization.",
    gallery: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    ]
  },
  {
    id: "5",
    title: "Kinpeak",
    description:
      "An educational technology platform with mobile app and backend services for personalized learning experiences and content management.",
    detailedDescription:
      "Kinpeak is an advanced educational technology platform that leverages modern web technologies and mobile development to deliver personalized learning experiences. The platform features intelligent content management, adaptive learning algorithms, and comprehensive analytics for both students and educators.",
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    year: "2024",
    category: "mobile",
    technologies: ["React", "Node.js", "JavaScript", "MongoDB"],
    demoUrl: "#",
    codeUrl: "https://github.com/eminisolomon",
    features: [
      "Personalized learning paths and adaptive content",
      "Real-time collaboration and discussion forums",
      "Advanced analytics and progress tracking",
      "Content creation and management tools",
      "Mobile-first responsive design",
      "Integration with external learning resources"
    ],
    role: "Full-stack developer responsible for building the learning platform, implementing adaptive algorithms, creating mobile-responsive interfaces, and developing the backend API with MongoDB integration.",
    challenges: "Main challenges included implementing adaptive learning algorithms, ensuring smooth performance across devices, and managing complex data relationships in MongoDB. Solutions involved efficient algorithm design, progressive enhancement, and optimized database queries.",
    gallery: [
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    ]
  },
  {
    id: "6",
    title: "Tickvo",
    description:
      "A comprehensive event management platform for Contests, Awards, Causes, and general event planning. Tickvo streamlines event organization, ticketing, and attendee engagement for a variety of purposes.",
    detailedDescription:
      "Tickvo is a versatile event management platform designed for organizing Contests, Awards, Causes, and other events. It features advanced ticketing systems, attendee management, event analytics, and seamless integration with payment gateways and marketing tools. The platform empowers organizers to manage voting, nominations, fundraising, and community engagement for diverse event types.",
    image: tickvoImg,
    year: "2025",
    category: "web",
    technologies: ["Laravel", "React", "Tailwind CSS", "PostgreSQL"],
    demoUrl: "https://tickvo.com/",
    codeUrl: "https://github.com/eminisolomon",
    features: [
      "Contest and award management (nominations, voting, results)",
      "Fundraising and cause support tools",
      "Event creation and management dashboard",
      "Advanced ticketing system with multiple tiers",
      "Real-time attendee tracking and analytics",
      "Payment processing and refund management",
      "Marketing tools and social media integration",
      "Mobile-responsive event pages and check-in system"
    ],
    role: "Full-stack developer responsible for building the event management platform, implementing contest and award features, creating responsive interfaces, and developing comprehensive backend services.",
    challenges: "Key challenges included handling high-concurrency voting and ticket sales, implementing real-time analytics, and supporting diverse event types. Solutions involved queue systems, WebSocket implementations, and flexible data models.",
    gallery: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    ]
  },
  {
    id: "7",
    title: "Econnect",
    description:
      "A platform for students of Adekunle Ajasin University (AAUA) to connect, learn, and collaborate. Econnect AAUA provides educational resources, networking opportunities, and tools for academic and social engagement.",
    detailedDescription:
      "Econnect AAUA is an educational and social platform designed specifically for students of Adekunle Ajasin University. It enables students to connect with peers, access learning resources, participate in academic discussions, and engage in campus activities. The platform fosters a collaborative environment for both academic and extracurricular growth.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    year: "2023",
    category: "mobile",
    technologies: ["Node.js", "React", "Tailwind CSS", "MySQL"],
    demoUrl: "#",
    codeUrl: "https://github.com/eminisolomon",
    features: [
      "Student networking and connection tools",
      "Access to educational resources and materials",
      "Academic discussion forums and study groups",
      "Event and activity management for campus life",
      "Real-time messaging and notifications",
      "Profile management and academic achievements tracking"
    ],
    role: "Full-stack developer responsible for building the platform, implementing educational and social features, and ensuring a seamless user experience for AAUA students.",
    challenges: "Key challenges included creating a platform tailored to the unique needs of AAUA students, integrating academic and social features, and ensuring data privacy. Solutions involved user research, modular feature design, and robust authentication systems.",
    gallery: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    ]
  },
  {
    id: "8",
    title: "Tercescrow",
    description:
      "A secure mobile platform for trading and buying gift cards and cryptocurrencies. Tercescrow ensures fast processing, a wide selection of cards, and a user-friendly experience.",
    detailedDescription:
      "Tercescrow is the ultimate mobile app for securely buying and selling gift cards and cryptocurrencies. Users can convert unused gift cards into cash, purchase discounted cards from trusted sellers, and trade crypto assets with confidence. The app features instant payouts, a wide selection of brands, and an intuitive interface for effortless trading.",
    image: tercescrowImg,
    year: "2025",
    category: "mobile",
    technologies: ["React Native", "TypeScript", "Node.js", "Express", "MongoDB"],
    demoUrl: "https://play.google.com/store/apps/details?id=com.tercescrow.app",
    codeUrl: "https://github.com/eminisolomon",
    features: [
      "Fast processing and instant payouts",
      "Buy and sell gift cards from top brands",
      "Trade cryptocurrencies securely",
      "User-friendly and intuitive interface",
      "Secure authentication and encrypted transactions",
      "Transaction history and notifications"
    ],
    role: "Mobile app developer responsible for building the trading platform, integrating payment and crypto APIs, and ensuring a secure user experience.",
    challenges: "Key challenges included integrating multiple payment and crypto APIs, ensuring transaction security, and providing a seamless user experience. Solutions involved robust API integrations, secure authentication, and real-time notifications.",
    gallery: [
      "https://play-lh.googleusercontent.com/2wQnQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQw=w240-h480-rw"
    ]
  },
  {
    id: "9",
    title: "Kulipal",
    description:
      "A mobile app for food shopping and delivery, house bookings and rent, and event exploration. Kulipal makes it easy to order food, reserve spaces, and discover events in your area.",
    detailedDescription:
      "Kulipal is a lifestyle mobile app that provides a platform to buy food, reserve spaces in restaurants, rent or book apartments and hotel rooms, explore local events, and purchase event tickets. The app offers a seamless experience for users to manage their daily needs, from food delivery to accommodation and entertainment, all in one place.",
    image: kulipalImg,
    year: "2025",
    category: "mobile",
    technologies: ["React Native", "TypeScript", "Node.js", "Express", "MongoDB"],
    demoUrl: "https://play.google.com/store/apps/details?id=com.kulipamegaglobal.kulipal",
    codeUrl: "https://github.com/eminisolomon",
    features: [
      "Order food and get fast delivery",
      "Reserve spaces in restaurants",
      "Rent or book apartments and hotel rooms",
      "Explore local events and purchase tickets",
      "User-friendly interface and secure payments",
      "Real-time notifications and order tracking"
    ],
    role: "Mobile app developer responsible for building the lifestyle platform, integrating food delivery, booking, and event APIs, and ensuring a seamless user experience.",
    challenges: "Key challenges included integrating multiple service APIs, managing real-time order and booking updates, and providing a unified user experience. Solutions involved modular API integration, real-time notifications, and intuitive UI design.",
    gallery: [
      "https://play-lh.googleusercontent.com/2wQnQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQw=w240-h480-rw"
    ]
  },
];
