import { defineStore } from "pinia";
import { ref } from "vue";

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

export const usePortfolioStore = defineStore("portfolio", () => {
  // State
  const projects = ref<Project[]>([
    {
      id: "1",
      title: "E-commerce Dashboard",
      description:
        "A comprehensive admin dashboard for e-commerce platforms with sales analytics, inventory management, and customer insights.",
      detailedDescription:
        "This e-commerce dashboard serves as a central control panel for online store owners to manage their business operations efficiently. It provides a real-time overview of sales performance, inventory levels, customer behavior, and marketing campaign effectiveness, all in one intuitive interface.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      year: "2024",
      category: "web",
      technologies: ["Vue.js", "Tailwind CSS", "Chart.js", "Node.js"],
      features: [
        "Interactive sales analytics with customizable date ranges and filters",
        "Inventory management system with low-stock alerts and reorder recommendations",
        "Customer insights with segmentation based on purchasing behavior",
        "Order management with status tracking and processing tools",
        "Marketing campaign performance tracking and ROI calculation",
      ],
      role: "As the lead frontend developer, I designed and implemented the user interface using Vue.js and Tailwind CSS. I worked closely with UX designers to create intuitive data visualizations and dashboards that make complex information accessible and actionable for store owners.",
      challenges:
        "The main challenge was creating a responsive dashboard that could display large amounts of data without overwhelming users or causing performance issues. I solved this by implementing lazy loading, virtual scrolling for large data sets, and optimizing chart rendering based on viewport visibility.",
      gallery: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1533628635777-112b2239b1c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      ],
      demoUrl: "https://demo-link.com",
      codeUrl: "https://github.com/eminisolomon",
    },
    // Other projects would be included here
  ]);

  // Actions
  function addProject(project: Project) {
    // Generate a unique ID (in a real app, this would come from the backend)
    project.id = (projects.value.length + 1).toString();
    projects.value.push(project);
  }

  function updateProject(updatedProject: Project) {
    const index = projects.value.findIndex((p) => p.id === updatedProject.id);
    if (index !== -1) {
      projects.value[index] = { ...updatedProject };
    }
  }

  function deleteProject(id: string) {
    const index = projects.value.findIndex((p) => p.id === id);
    if (index !== -1) {
      projects.value.splice(index, 1);
    }
  }

  function getProjectById(id: string) {
    return projects.value.find((p) => p.id === id) || null;
  }

  return {
    projects,
    addProject,
    updateProject,
    deleteProject,
    getProjectById,
  };
});
