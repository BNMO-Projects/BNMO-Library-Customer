import { router } from "@/router/router";
import { LoginRequest, RegisterRequest } from "@/types/request.type";
import axios, { AxiosError } from "axios";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      loadingRegister: false,
      errRegister: "" || undefined,

      refreshToken: "",
      loadingLogin: false,
      errLogin: "" || undefined,

      loadingLogout: false,
      errLogout: "" || undefined
    };
  },
  getters: {
    isLoadingRegister: (state) => state.loadingRegister,
    errorRegister: (state) => state.errRegister,

    getRefreshToken: (state) => state.refreshToken,
    isLoadingLogin: (state) => state.loadingLogin,
    errorLogin: (state) => state.errLogin,

    isLoadingLogout: (state) => state.loadingLogout,
    errorLogout: (state) => state.errLogout
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

        axios.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;

        this.refreshToken = response.data.refresh_token;
        this.loadingLogin = false;

        localStorage.setItem("refresh_token", this.refreshToken);

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
    }
  }
});
