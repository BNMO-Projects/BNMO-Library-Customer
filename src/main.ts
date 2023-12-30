import { Component, createApp } from "vue";
import App from "./App.vue";
import "@/index.css";
import "vue-toastification/dist/index.css";
import { createPinia } from "pinia";
import { router } from "@/router/router";
import axios from "axios";
import Toast, { PluginOptions } from "vue-toastification";

const pinia = createPinia();

axios.defaults.baseURL = import.meta.env.VITE_BASE_APP_URL;

const toastOptions: PluginOptions = {
  timeout: 3000
};

const app = createApp(App as Component);
app.use(pinia);
app.use(router);
app.use(Toast, toastOptions);
app.mount("#app");
