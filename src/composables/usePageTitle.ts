import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useHead } from "@vueuse/head";

export function usePageTitle() {
  const route = useRoute();
  const defaultTitle = "Solomon Olatunji | Software Engineer";

  const pageTitle = computed(() => {
    if (route.path === "/") {
      return defaultTitle;
    }

    if (route.path.startsWith("/admin")) {
      if (route.path === "/admin") return "Dashboard | Admin Portal";
      if (route.path.includes("/portfolio/create"))
        return "Create Project | Admin Portal";
      if (route.path.includes("/portfolio/edit"))
        return "Edit Project | Admin Portal";
      if (route.path.includes("/blog/create"))
        return "Create Blog Post | Admin Portal";
      if (route.path.includes("/blog/edit"))
        return "Edit Blog Post | Admin Portal";
      if (route.path === "/admin/portfolio")
        return "Portfolio Management | Admin Portal";
      if (route.path === "/admin/blog") return "Blog Management | Admin Portal";
      if (route.path === "/admin/login") return "Login | Admin Portal";
      return "Admin Portal";
    }

    if (route.path === "/about") return "About Me | Solomon Olatunji";
    if (route.path === "/contact") return "Contact | Solomon Olatunji";
    if (route.path === "/portfolio") return "Portfolio | Solomon Olatunji";
    if (route.path === "/blog") return "Blog | Solomon Olatunji";

    return defaultTitle;
  });

  const setupHead = () => {
    useHead({
      title: pageTitle.value,
    });
  };

  setupHead();

  watch(
    () => route.path,
    () => setupHead()
  );

  return {
    pageTitle,
  };
}
