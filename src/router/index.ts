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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
