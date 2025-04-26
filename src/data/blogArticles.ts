import type { BlogPost } from "../interfaces/blog";

export const articles: BlogPost[] = [
  {
    id: "1",
    title: "Building Responsive Web Applications with Vue 3 and Tailwind CSS",
    excerpt:
      "Learn how to create beautiful, responsive interfaces using the power of Vue 3 combined with the utility-first approach of Tailwind CSS.",
    content:
      '<p>Vue 3 and Tailwind CSS are powerful tools for creating responsive web applications. In this article, we will explore how to use these technologies together effectively.</p><p>Vue 3 is the latest version of the popular JavaScript framework, and it brings several new features that make it even more powerful and flexible. Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML.</p><h2 id="heading-0">Getting Started with Vue 3</h2><p>Vue 3 offers a more modular architecture, improved TypeScript support, and the new Composition API. Here\'s how you can create a new Vue 3 project:< /p><pre><code>npm create vite@latest my-project --template vue</code > </pre><h2 id="heading-1">Adding Tailwind CSS</h2 > <p>Tailwind CSS is easy to integrate with Vue.First, install Tailwind CSS and its dependencies: </p><pre><code>npm install tailwindcss postcss autoprefixer</code > </pre><p>Then, initialize your Tailwind configuration:</p > <pre><code>npx tailwindcss init - p < /code></pre > <h2 id="heading-2" > Building Responsive Components < /h2><p>Tailwind CSS makes it easy to create responsive designs with its mobile-first approach and responsive modifiers. Here\'s an example of a responsive component:</p > <pre><code>& lt;div class="w-full md:w-1/2 lg:w-1/3 p-4" & gt; \n & lt;div class="bg-white shadow-lg rounded-lg overflow-hidden" & gt; \n & lt;img class="w-full h-48 object-cover" src = "image.jpg" alt = "Card image" & gt; \n & lt;div class="p-6" & gt; \n & lt;h2 class="text-xl font-bold mb-2" & gt;Card Title & lt; /h2&gt;\n      &lt;p class="text-gray-700"&gt;This is a card description.&lt;/p & gt; \n & lt; /div&gt;\n  &lt;/div & gt; \n & lt; /div&gt;</code > </pre><h2 id="heading-3">Advanced Techniques</h2 > <p>Once you\'ve mastered the basics, you can explore more advanced techniques like:</p><ul><li>Using Tailwind\'s JIT(Just - In - Time) mode for faster development < /li><li>Creating custom theme configurations</li > <li>Integrating Tailwind with Vue\'s component system</li><li>Building responsive layouts with Flexbox and Grid</li></ul><h2 id="heading-4">Conclusion</h2><p>By combining Vue 3 and Tailwind CSS, you can create beautiful, responsive web applications with less effort. The flexibility of Vue 3\'s Composition API and the utility - first approach of Tailwind CSS make them a perfect match for modern web development.</p>',
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    date: "April 26, 2025",
    category: "web-dev",
    author: {
      name: "Solomon Olatunji",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    featured: true,
    readTime: "8 min read",
    tags: ["Vue.js", "Tailwind CSS", "Frontend", "Responsive Design"],
  },
  {
    id: "2",
    title: "Modern UI/UX Design Principles Every Developer Should Know",
    excerpt:
      "Explore essential design principles that can help developers create more user-friendly and aesthetically pleasing applications.",
    content: "",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    date: "April 10, 2025",
    category: "ui-ux",
    author: {
      name: "Solomon Olatunji",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    readTime: "6 min read",
    tags: ["UI/UX", "Design", "User Experience"],
  },
  {
    id: "3",
    title: "Optimizing Performance in JavaScript Applications",
    excerpt:
      "Discover techniques and best practices for improving the performance of your JavaScript applications to provide a better user experience.",
    content: "",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "April 2, 2025",
    category: "web-dev",
    author: {
      name: "Solomon Olatunji",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    readTime: "5 min read",
    tags: ["JavaScript", "Performance", "Web Development"],
  },
  {
    id: "4",
    title: "Navigating a Career in Software Development: Tips from the Field",
    excerpt:
      "Insights and advice for both new and experienced developers to grow their skills and advance their careers in the ever-changing tech industry.",
    content: "",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "March 25, 2025",
    category: "career",
    author: {
      name: "Solomon Olatunji",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    readTime: "7 min read",
    tags: ["Career", "Development", "Advice"],
  },
  {
    id: "5",
    title: "Designing for Accessibility: Creating Inclusive Web Experiences",
    excerpt:
      "Why accessibility matters and how to implement it effectively in your design process to create web applications that everyone can use.",
    content: "",
    image:
      "https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
    date: "March 18, 2025",
    category: "ui-ux",
    author: {
      name: "Solomon Olatunji",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    readTime: "5 min read",
    tags: ["Accessibility", "Design", "Inclusion"],
  },
];
