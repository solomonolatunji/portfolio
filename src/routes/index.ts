import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import About from "@/pages/About.vue";
import Contact from "@/pages/Contact.vue";
import Portfolio from "@/pages/Portfolio.vue";
import PortfolioDetail from "@/pages/PortfolioDetail.vue";
import Blog from "@/pages/Blog.vue";
import BlogPost from "@/pages/BlogPost.vue";
import NotFound from "@/pages/NotFound.vue";
import AdminLayout from "@/components/Admin/Layout/AdminLayout.vue";
import AdminLogin from "@/pages/Admin/Login.vue";
import AdminDashboard from "@/pages/Admin/Dashboard.vue";
import AdminUsers from "@/pages/Admin/Users.vue";
import AdminProjects from "@/pages/Admin/Projects.vue";
import AdminActivity from "@/pages/Admin/Activity.vue";
import AdminSettings from "@/pages/Admin/Settings.vue";
import AdminPosts from "@/pages/Admin/Posts.vue";
import { useAuthStore } from "@/stores/authStore";

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
    path: "/admin/login",
    name: "AdminLogin",
    component: AdminLogin,
    meta: { guestOnly: true },
  },
  {
    path: "/admin",
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: "",
        redirect: { name: "AdminDashboard" },
      },
      {
        path: "dashboard",
        name: "AdminDashboard",
        component: AdminDashboard,
      },
      {
        path: "users",
        name: "AdminUsers",
        component: AdminUsers,
      },
      {
        path: "projects",
        name: "AdminProjects",
        component: AdminProjects,
      },
      {
        path: "posts",
        name: "AdminPosts",
        component: AdminPosts,
      },
      {
        path: "activity",
        name: "AdminActivity",
        component: AdminActivity,
      },
      {
        path: "settings",
        name: "AdminSettings",
        component: AdminSettings,
      },
    ],
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

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();

  // Initialize auth if not done (e.g. page refresh)
  if (!authStore.isAuthenticated && localStorage.getItem("auth_token")) {
    authStore.initializeAuth();
  }

  const isAuthenticated = authStore.isLoggedIn;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "AdminLogin" });
  } else if (to.meta.guestOnly && isAuthenticated) {
    next({ name: "AdminDashboard" });
  } else {
    next();
  }
});

export default router;
