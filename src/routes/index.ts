import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/pages/Home.vue"),
  },
  {
    path: "/about",
    component: () => import("@/pages/About.vue"),
  },
  {
    path: "/contact",
    component: () => import("@/pages/Contact.vue"),
  },
  {
    path: "/portfolio",
    component: () => import("@/pages/Portfolio.vue"),
  },
  {
    path: "/portfolio/:id",
    component: () => import("@/pages/PortfolioDetail.vue"),
  },
  {
    path: "/blog",
    component: () => import("@/pages/Blog.vue"),
  },
  {
    path: "/blog/:id",
    component: () => import("@/pages/BlogPost.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/pages/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, _savedPosition) {
    return { top: 0 };
  },
});

export default router;
