import { router } from "@/router/router";
import { LoginRequest, RegisterRequest } from "@/types/request.type";
import { ErrorRegisterResponse } from "@/types/response.type";
import axios, { AxiosError } from "axios";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      loadingRegister: false,
      errRegister: "" || undefined,
      errDetailRegister: {} as ErrorRegisterResponse,

      username: "",
      refreshToken: "",
      loadingLogin: false,
      errLogin: "" || undefined,

      loadingLogout: false,
      errLogout: "" || undefined,

      loadingRefreshToken: false
    };
  },
  getters: {
    isLoadingRegister: (state) => state.loadingRegister,
    errorRegister: (state) => state.errRegister,

    getUsername: (state) => state.username,
    getRefreshToken: (state) => state.refreshToken,
    isLoadingLogin: (state) => state.loadingLogin,
    errorLogin: (state) => state.errLogin,

    isLoadingLogout: (state) => state.loadingLogout,
    errorLogout: (state) => state.errLogout,

    isLoadingRefreshToken: (state) => state.loadingRefreshToken
  },
  actions: {
    async postRegister(payload: RegisterRequest) {
      this.loadingRegister = true;

      try {
        const response = await axios.post("/auth/register", {
          data: payload
        });

        void router.push({ name: "Login" });
        this.loadingRegister = false;

        toast.success(response.data.message);
      } catch (error) {
        if (error instanceof AxiosError) {
          this.errRegister = error.response?.data.message;
          this.errDetailRegister = error.response?.data.error;

          this.loadingRegister = false;

          toast.error(this.errRegister);
        }
      }
    },
    async postLogin(payload: LoginRequest) {
      this.loadingLogin = true;

      try {
        const response = await axios.post("/auth/login", {
          data: payload
        });

        axios.defaults.headers.common["Authorization"] =
          `Bearer ${response.data.access_token}`;

        this.username = response.data.username;
        this.refreshToken = response.data.refresh_token;
        this.loadingLogin = false;

        void router.push({ name: "Home" });
        toast.success(response.data.message);
      } catch (error) {
        if (error instanceof AxiosError) {
          this.errLogin = error.response?.data.message;
          this.loadingLogin = false;

          toast.error(this.errLogin);
        }
      }
    },
    async postLogout() {
      this.loadingLogout = true;

      localStorage.clear();
      delete axios.defaults.headers.common.Authorization;

      void router.push({ name: "Login" });
      toast.success("Logout successful");

      this.loadingLogout = false;
    },
    async refreshAccessToken() {
      this.loadingRefreshToken = true;

      try {
        const response = await axios.post("/auth/refresh-token", {
          refresh_token: this.refreshToken
        });

        axios.defaults.headers.common["Authorization"] =
          `Bearer ${response.data.token}`;

        this.loadingRefreshToken = false;
        toast.success("Session refreshed");
      } catch (error) {
        if (error instanceof AxiosError) {
          void router.push({ name: "Login" });
          this.loadingRefreshToken = false;
          toast.error(error.response?.data.message);
        }
      }
    }
  }
});
