import { defineStore } from "pinia";
import axios, { AxiosError } from "axios";
import { router } from "@/router/router";

import { LoginRequest, RegisterRequest } from "@/types/request.type";
import { ToastComponentConfig } from "@/types/response.type";

import { useToast } from "vue-toastification";
import ToastComponent from "@/components/global/ToastComponent.vue";

const toast = useToast();

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      isLoadingRegister: false,
      errorRegister: [] as Array<String>,

      username: "",
      refreshToken: "",
      isLoadingLogin: false,
      isLoadingLogout: false,
      isLoadingRefreshToken: false
    };
  },
  actions: {
    async postRegister(payload: RegisterRequest) {
      this.isLoadingRegister = true;

      try {
        const response = await axios.post("/auth/register", {
          data: payload
        });

        void router.push({ name: "Login" });
        this.isLoadingRegister = false;

        toast.success(response.data.message);
      } catch (error) {
        if (error instanceof AxiosError) {
          this.errorRegister = error.response?.data.errors;

          this.isLoadingRegister = false;

          toast.error(error.response?.data.message);
        }
      }
    },
    async postLogin(payload: LoginRequest) {
      this.isLoadingLogin = true;

      try {
        const response = await axios.post("/auth/login", {
          data: payload
        });

        axios.defaults.headers.common["Authorization"] =
          `Bearer ${response.data.access_token}`;

        this.username = response.data.username;
        this.refreshToken = response.data.refresh_token;
        this.isLoadingLogin = false;

        void router.push({ name: "Home" });
        toast.success(response.data.message);
      } catch (error) {
        if (error instanceof AxiosError) {
          this.isLoadingLogin = false;

          const config: ToastComponentConfig = {
            component: ToastComponent,
            props: {
              heading: error.response?.data.message,
              description: error.response?.data.errors[0]
            }
          };

          toast.error(config);
        }
      }
    },
    async postLogout() {
      this.isLoadingLogout = true;

      localStorage.clear();
      delete axios.defaults.headers.common.Authorization;

      void router.push({ name: "Login" });
      toast.success("Logout successful");

      this.isLoadingLogout = false;
    },
    async refreshAccessToken() {
      this.isLoadingRefreshToken = true;

      try {
        const response = await axios.post("/auth/refresh-token", {
          refresh_token: this.refreshToken
        });

        axios.defaults.headers.common["Authorization"] =
          `Bearer ${response.data.token}`;

        this.isLoadingRefreshToken = false;
        toast.success(response.data.message);
      } catch (error) {
        if (error instanceof AxiosError) {
          void router.push({ name: "Login" });
          this.isLoadingRefreshToken = false;
          toast.error(error.response?.data.message);
        }
      }
    }
  },
  persist: true
});
