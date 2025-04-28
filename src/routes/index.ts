import { createRouter, createWebHistory } from "vue-router";
import { useAdminAuthStore } from "@/stores/adminAuth";

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
    path: "/admin/login",
    component: () => import("@/pages/admin/Login.vue"),
  },
  {
    path: "/admin",
    component: () => import("@/pages/admin/Dashboard.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        component: () => import("@/pages/admin/Overview.vue"),
      },
      {
        path: "portfolio",
        component: () => import("@/pages/admin/PortfolioManager.vue"),
      },
      {
        path: "portfolio/edit/:id",
        component: () => import("@/pages/admin/PortfolioEdit.vue"),
      },
      {
        path: "portfolio/create",
        component: () => import("@/pages/admin/PortfolioCreate.vue"),
      },
      {
        path: "blog",
        component: () => import("@/pages/admin/BlogManager.vue"),
      },
      {
        path: "blog/edit/:id",
        component: () => import("@/pages/admin/BlogEdit.vue"),
      },
      {
        path: "blog/create",
        component: () => import("@/pages/admin/BlogCreate.vue"),
      },
      {
        path: "contact",
        component: () => import("@/pages/admin/ContactManager.vue"),
      },
      {
        path: "settings",
        component: () => import("@/pages/admin/Settings.vue"),
      },
    ],
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

router.beforeEach(async (to, _from, next) => {
  const adminStore = useAdminAuthStore();
  adminStore.initializeFromStorage();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!adminStore.isAuthenticated) {
      next({ path: "/admin/login" });
    } else {
      // Validate token before proceeding
      const isTokenValid = await adminStore.ensureValidToken();

      if (isTokenValid) {
        next();
      } else {
        // Token is invalid or couldn't be refreshed, redirect to login
        adminStore.clearAuthState();
        next({
          path: "/admin/login",
          query: { redirect: to.fullPath },
        });
      }
    }
  } else if (to.path === "/admin/login" && adminStore.isAuthenticated) {
    // Redirect to admin dashboard if already authenticated
    next({ path: "/admin" });
  } else {
    next();
  }
});

export default router;
