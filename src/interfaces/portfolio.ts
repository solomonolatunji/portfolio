export interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  image: string;
  year: string;
  category: "web" | "mobile" | "ui";
  technologies: string[];
  demoUrl: string;
  codeUrl: string;
  features: string[];
  role: string;
  challenges: string;
  gallery: string[];
}
