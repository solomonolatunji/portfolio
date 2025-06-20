export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  year: string;
  category: "web" | "mobile" | "ui";
  technologies: string[];
  demoUrl: string;
  codeUrl: string;
}
