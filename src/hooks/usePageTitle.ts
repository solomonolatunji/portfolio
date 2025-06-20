import { computed } from "vue";
import { useRoute } from "vue-router";
import { useHead } from "@vueuse/head";
import {
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  PAGE_TITLES,
  PAGE_DESCRIPTIONS,
} from "../constants/pageMeta";
import { createMetaTags, createLinkTags } from "../constants/metaConfigs";

export function usePageTitle() {
  const route = useRoute();
  const currentPath = computed(() => route.path);

  const pageTitle = computed(() => {
    const pathTitleMap: { [key: string]: string } = {
      "/": PAGE_TITLES.home,
      "/about": PAGE_TITLES.about,
      "/contact": PAGE_TITLES.contact,
      "/portfolio": PAGE_TITLES.portfolio,
      "/blog": PAGE_TITLES.blog,
    };

    return pathTitleMap[route.path] || DEFAULT_TITLE;
  });

  const pageDescription = computed<string>(() => {
    const descriptionMap: Record<string, string> = {
      "/": PAGE_DESCRIPTIONS.home,
      "/about": PAGE_DESCRIPTIONS.about,
      "/contact": PAGE_DESCRIPTIONS.contact,
      "/portfolio": PAGE_DESCRIPTIONS.portfolio,
      "/blog": PAGE_DESCRIPTIONS.blog,
    };

    return (
      descriptionMap[route.path] ||
      route.meta?.description?.toString() ||
      DEFAULT_DESCRIPTION
    );
  });

  const ogImage = computed<string>(() => {
    if (["/blog", "/portfolio"].includes(route.path) && route.meta?.image) {
      return String(route.meta.image);
    }

    return DEFAULT_OG_IMAGE;
  });

  useHead({
    title: pageTitle,
    meta: createMetaTags(pageTitle, pageDescription, ogImage, currentPath),
    link: createLinkTags(currentPath),
  });

  return {
    pageTitle,
    pageDescription,
    ogImage,
  };
}
