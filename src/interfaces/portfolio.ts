export interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  image: string;
  year: string;
  category: "web" | "mobile" | "ui";
  technologies: string[];
  features?: string[];
  role?: string;
  challenges?: string;
  gallery?: string[];
  demoUrl?: string;
  codeUrl?: string;
}

export interface ProjectForm {
  title: string;
  description: string;
  detailedDescription: string;
  image: string | File | null;
  year: string;
  category: "web" | "mobile" | "ui";
  technologies: string[];
  features: string[];
  role: string;
  challenges: string;
  gallery: string[];
  demoUrl: string;
  codeUrl: string;
}
