import type { Product } from "@/interfaces/product";

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Vue.js Masterclass",
    description:
      "Complete Vue.js course covering fundamentals to advanced topics with real-world projects.",
    price: 99,
    originalPrice: 149,
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "courses",
    type: "Course",
    rating: 4.9,
    features: ["12 Hours", "Projects", "Support", "Certificate"],
  },
  {
    id: 2,
    title: "UI Design Templates",
    description:
      "Premium collection of modern UI/UX design templates for web and mobile applications.",
    price: 49,
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
    category: "digital",
    type: "Digital",
    rating: 4.7,
    features: ["50+ Templates", "Figma Files", "Commercial License"],
  },
  {
    id: 3,
    title: "Developer T-Shirt",
    description:
      "Premium quality t-shirt with unique developer-themed designs. Comfortable cotton blend.",
    price: 29,
    image:
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1259&q=80",
    category: "physical",
    type: "Merch",
    rating: 4.8,
    features: ["100% Cotton", "Multiple Sizes", "Free Shipping"],
  },
  {
    id: 4,
    title: "React Native Course",
    description:
      "Build mobile apps with React Native. From basics to publishing on app stores.",
    price: 79,
    originalPrice: 119,
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "courses",
    type: "Course",
    rating: 4.6,
    features: ["10 Hours", "iOS & Android", "Support"],
  },
  {
    id: 5,
    title: "Code Editor Theme Pack",
    description:
      "Beautiful syntax highlighting themes for popular code editors. Dark and light variants.",
    price: 19,
    image:
      "https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
    category: "digital",
    type: "Digital",
    rating: 4.5,
    features: ["VS Code", "Sublime", "Atom", "Updates"],
  },
  {
    id: 6,
    title: "Programmer Mug",
    description:
      "Ceramic mug with funny programming jokes. Perfect for your morning coffee routine.",
    price: 24,
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    category: "physical",
    type: "Merch",
    rating: 4.9,
    features: ["Ceramic", "Dishwasher Safe", "Gift Box"],
  },
  {
    id: 7,
    title: "Node.js Backend Course",
    description:
      "Master backend development with Node.js, Express, and MongoDB through hands-on projects.",
    price: 89,
    originalPrice: 129,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    category: "courses",
    type: "Course",
    rating: 4.8,
    features: ["15 Hours", "REST APIs", "Database", "Certificate"],
  },
  {
    id: 8,
    title: "Icon Set Pro",
    description:
      "Over 1,000 customizable icons for web and mobile apps in SVG and PNG formats.",
    price: 39,
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80",
    category: "digital",
    type: "Digital",
    rating: 4.6,
    features: ["1000+ Icons", "SVG & PNG", "Commercial Use"],
  },
  {
    id: 9,
    title: "Hacker Hoodie",
    description:
      "Cozy hoodie with minimalist hacker design. Ideal for coding marathons.",
    price: 49,
    image:
      "https://images.unsplash.com/photo-1593795899630-3f4851e072b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1259&q=80",
    category: "physical",
    type: "Merch",
    rating: 4.7,
    features: ["Cotton Blend", "Unisex", "Free Shipping"],
  },
  {
    id: 10,
    title: "GraphQL Essentials",
    description:
      "Learn GraphQL to build efficient APIs with this comprehensive course.",
    price: 69,
    originalPrice: 99,
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    category: "courses",
    type: "Course",
    rating: 4.7,
    features: ["8 Hours", "Projects", "Support"],
  },
  {
    id: 11,
    title: "Wireframe Kit",
    description:
      "Prototyping made easy with this extensive wireframe kit for UX designers.",
    price: 29,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80",
    category: "digital",
    type: "Digital",
    rating: 4.5,
    features: ["200+ Components", "Sketch & Figma", "Updates"],
  },
  {
    id: 12,
    title: "Code Sticker Pack",
    description:
      "Fun vinyl stickers with coding themes to decorate your laptop or water bottle.",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1535968905361-76e0ed3a0be2?ixlib=rb-4.0.3&auto=format&fit=crop&w=688&q=80",
    category: "physical",
    type: "Merch",
    rating: 4.9,
    features: ["Waterproof", "10 Stickers", "Giftable"],
  },
];
