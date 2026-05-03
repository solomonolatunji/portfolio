export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;
  year: string;
  category: "web" | "mobile" | "ui";
  description: string;
  technologies: string[];
  links: ProjectLink[];
}
