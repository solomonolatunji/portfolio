import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead, VueHeadMixin } from "@vueuse/head";
import "@/assets/css/style.css";
import App from "./App.vue";
import router from "./routes";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const toastOptions = {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
};

const app = createApp(App);
const head = createHead();
const pinia = createPinia();

app.use(head);
app.use(pinia);
app.use(router);
app.use(Toast, toastOptions);
app.mixin(VueHeadMixin);

app.mount("#app");
