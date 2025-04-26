import { defineStore } from "pinia";
import { ref } from "vue";

export interface Author {
  name: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  author: Author;
  featured?: boolean;
  tags?: string[];
}

export const useBlogStore = defineStore("blog", () => {
  // State
  const posts = ref<BlogPost[]>([
    {
      id: "1",
      title: "Building Responsive Web Applications with Vue 3 and Tailwind CSS",
      excerpt:
        "Learn how to create beautiful, responsive interfaces using the power of Vue 3 combined with the utility-first approach of Tailwind CSS.",
      content:
        "<p>Vue 3 and Tailwind CSS are powerful tools for creating responsive web applications. In this article, we will explore how to use these technologies together effectively.</p><p>Vue 3 is the latest version of the popular JavaScript framework, and it brings several new features that make it even more powerful and flexible. Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML.</p><h2>Getting Started with Vue 3</h2><p>Vue 3 offers a more modular architecture, improved TypeScript support, and the new Composition API. Here's how you can create a new Vue 3 project:</p><pre><code>npm create vite@latest my-project --template vue</code></pre><h2>Adding Tailwind CSS</h2><p>Tailwind CSS is easy to integrate with Vue. First, install Tailwind CSS and its dependencies:</p><pre><code>npm install tailwindcss postcss autoprefixer</code></pre><p>Then, initialize your Tailwind configuration:</p><pre><code>npx tailwindcss init -p</code></pre>",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      date: "April 15, 2025",
      category: "web-dev",
      author: {
        name: "Solomon Olatunji",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      featured: true,
      tags: ["Vue.js", "Tailwind CSS", "Frontend", "Web Development"],
    },
    // Other blog posts would be included here
  ]);

  // Actions
  function addPost(post: BlogPost) {
    // Generate a unique ID (in a real app, this would come from the backend)
    post.id = (posts.value.length + 1).toString();
    // Set the current date if not provided
    if (!post.date) {
      const today = new Date();
      post.date = today.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    posts.value.push(post);
  }

  function updatePost(updatedPost: BlogPost) {
    const index = posts.value.findIndex((p) => p.id === updatedPost.id);
    if (index !== -1) {
      posts.value[index] = { ...updatedPost };
    }
  }

  function deletePost(id: string) {
    const index = posts.value.findIndex((p) => p.id === id);
    if (index !== -1) {
      posts.value.splice(index, 1);
    }
  }

  function getPostById(id: string) {
    return posts.value.find((p) => p.id === id) || null;
  }

  function getCategories() {
    const categories = new Set<string>();
    posts.value.forEach((post) => {
      if (post.category) {
        categories.add(post.category);
      }
    });
    return Array.from(categories);
  }

  function setFeaturedPost(id: string) {
    posts.value.forEach((post) => {
      post.featured = post.id === id;
    });
  }

  return {
    posts,
    addPost,
    updatePost,
    deletePost,
    getPostById,
    getCategories,
    setFeaturedPost,
  };
});
