import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import About from "@/pages/About.vue";
import Contact from "@/pages/Contact.vue";
import Portfolio from "@/pages/Portfolio.vue";
import PortfolioDetail from "@/pages/PortfolioDetail.vue";
import Blog from "@/pages/Blog.vue";
import BlogPost from "@/pages/BlogPost.vue";
import NotFound from "@/pages/NotFound.vue";
import Shop from "@/pages/Shop.vue";
import ProductView from "@/pages/ProductView.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/contact",
    component: Contact,
  },
  {
    path: "/portfolio",
    component: Portfolio,
  },
  {
    path: "/shop",
    component: Shop,
  },
  {
    path: "/shop/:id",
    component: ProductView,
  },
  {
    path: "/portfolio/:id",
    component: PortfolioDetail,
  },
  {
    path: "/blog",
    component: Blog,
  },
  {
    path: "/blog/:id",
    component: BlogPost,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
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
