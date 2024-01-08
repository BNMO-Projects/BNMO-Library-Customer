import { defineStore } from "pinia";
import axios, { AxiosError } from "axios";
import { OrderHistoryResponse } from "@/types/response.type";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useOrderHistoryStore = defineStore("order_history", {
  state: () => {
    return {
      orderHistory: [] as Array<OrderHistoryResponse>,
      isLoadingOrderHistory: false
    };
  },
  actions: {
    async fetchWishlist() {
      this.isLoadingOrderHistory = true;
      try {
        const response = await axios.get("/order-history");

        this.orderHistory = response.data.data;
        this.isLoadingOrderHistory = false;
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
          this.isLoadingOrderHistory = false;
        }
      }
    }
  },
  persist: true
});
