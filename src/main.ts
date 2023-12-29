import { Component, createApp } from "vue";
import App from "./App.vue";
import "@/index.css";
import { createPinia } from "pinia";
import { router } from "@router/router";

const pinia = createPinia();

const app = createApp(App as Component);
app.use(pinia);
app.use(router);
app.mount("#app");
