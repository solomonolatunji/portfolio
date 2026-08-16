import { vueform } from "@vueform/vueform";

export default defineNuxtPlugin(async (nuxtApp) => {
  const [{ default: theme }, { default: en }] = await Promise.all([
    import("@vueform/vueform/themes/vueform"),
    import("@vueform/vueform/locales/en"),
  ]);

  nuxtApp.vueApp.use(vueform, {
    theme,
    locales: { en },
    locale: "en",
  });
});
