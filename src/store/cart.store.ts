import { CartItemListResponse } from "@/types/response.type";
import axios, { AxiosError } from "axios";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      cartItems: [] as Array<CartItemListResponse>,
      subtotal: 0,
      loadingCartItems: false,
      loadingAddCartItem: false,
      loadingDeleteCartItem: false,
      loadingCheckoutCart: false
    };
  },
  getters: {
    getCartItems: (state) => state.cartItems,
    getSubtotal: (state) => state.subtotal,
    isLoadingCartItems: (state) => state.loadingCartItems,
    isLoadingAddCartItem: (state) => state.loadingAddCartItem,
    isLoadingDeleteCartItem: (state) => state.loadingDeleteCartItem,
    isLoadingCheckoutCart: (state) => state.loadingCheckoutCart
  },
  actions: {
    async getAllCartItems() {
      this.loadingCartItems = true;
      try {
        const response = await axios.get("/cart");

        this.cartItems = response.data.data;
        this.subtotal = response.data.subtotal;
        this.loadingCartItems = false;
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
          this.loadingCartItems = false;
        }
      }
    },

    async addItemToCart(id: string) {
      this.loadingAddCartItem = true;
      try {
        const response = await axios.post("/cart/cart-item", {
          data: { book_id: id }
        });

        this.loadingAddCartItem = false;
        toast.success(response.data.message);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
          this.loadingAddCartItem = false;
        }
      }
    },

    async removeItemFromCart(id: string) {
      this.loadingDeleteCartItem = true;
      try {
        const response = await axios.delete(`/cart/cart-item/${id}`);

        this.loadingDeleteCartItem = false;
        toast.success(response.data.message);
        this.getAllCartItems();
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
          this.loadingDeleteCartItem = false;
        }
      }
    },

    async checkoutCart() {
      this.loadingCheckoutCart = true;
      try {
        const response = await axios.post(`/cart/checkout`);

        this.loadingCheckoutCart = false;
        toast.success(response.data.message);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
          this.loadingCheckoutCart = false;
        }
      }
    }
  },
  persist: true
});
