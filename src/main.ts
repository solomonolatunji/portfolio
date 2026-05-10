import { createApp } from "vue";
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import "@/assets/css/style.css";
import App from "./App.vue";

const app = createApp(App);
const queryClient = new QueryClient();

app.use(VueQueryPlugin, { queryClient });
app.mount("#app");
