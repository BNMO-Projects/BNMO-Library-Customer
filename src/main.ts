import { Component, createApp } from "vue";
import App from "./App.vue";
import "@/index.css";
import "vue-toastification/dist/index.css";
import { createPinia } from "pinia";
import { router } from "@/router/router";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig
} from "axios";
import Toast, { PluginOptions } from "vue-toastification";
import PiniaPluginPersistedState from "pinia-plugin-persistedstate";
import { useAuthStore } from "./store/auth.store";

const pinia = createPinia();
pinia.use(PiniaPluginPersistedState);

axios.defaults.baseURL = import.meta.env.VITE_BASE_APP_URL;

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry: boolean;
}

let refreshPromise: Promise<void> | null = null;
const clearPromise = () => (refreshPromise = null);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error instanceof AxiosError) {
      const authStore = useAuthStore();
      console.log(error.request.responseURL);
      if (
        error.request.responseURL.includes("/refresh-token") &&
        error.response?.status === 401
      ) {
        authStore.postLogout();
      } else if (
        !error.request.responseURL.includes("/login") &&
        error.response?.status === 401 &&
        error.config &&
        !(error.config as CustomAxiosRequestConfig)._retry
      ) {
        (error.config as CustomAxiosRequestConfig)._retry = true;

        if (!refreshPromise) {
          refreshPromise = authStore.refreshAccessToken().finally(clearPromise);
        }

        await refreshPromise;
        return axios(error.config as CustomAxiosRequestConfig);
      }
    }

    return Promise.reject(error);
  }
);

const toastOptions: PluginOptions = {
  timeout: 3000
};

const app = createApp(App as Component);
app.use(pinia);
app.use(router);
app.use(Toast, toastOptions);
app.mount("#app");
