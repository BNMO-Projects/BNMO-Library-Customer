import { defineStore } from "pinia";
import axios, { AxiosError } from "axios";
import { CartItemListResponse } from "@/types/response.type";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      cartItems: [] as Array<CartItemListResponse>,
      subtotal: 0,
      isLoadingCartItems: false,
      isLoadingAddCartItem: false,
      isLoadingDeleteCartItem: false,
      isLoadingCheckoutCart: false,
      isErrorCheckoutCart: false
    };
  },
  actions: {
    async fetchCartItems() {
      this.isLoadingCartItems = true;
      try {
        const response = await axios.get("/cart");

        this.cartItems = response.data.data;
        this.subtotal = response.data.subtotal;
        this.isLoadingCartItems = false;
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
          this.isLoadingCartItems = false;
        }
      }
    },

    async addItemToCart(id: string) {
      this.isLoadingAddCartItem = true;
      try {
        const response = await axios.post("/cart/cart-item", {
          data: { book_id: id }
        });

        this.isLoadingAddCartItem = false;
        toast.success(response.data.message);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
          this.isLoadingAddCartItem = false;
        }
      }
    },

    async removeItemFromCart(id: string) {
      this.isLoadingDeleteCartItem = true;
      try {
        const response = await axios.delete(`/cart/cart-item/${id}`);

        this.isLoadingDeleteCartItem = false;
        toast.success(response.data.message);
        this.fetchCartItems();
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
          this.isLoadingDeleteCartItem = false;
        }
      }
    },

    async checkoutCart() {
      this.isLoadingCheckoutCart = true;
      this.isErrorCheckoutCart = false;
      try {
        const response = await axios.post(`/cart/checkout`);

        this.isLoadingCheckoutCart = false;
        toast.success(response.data.message);
      } catch (error) {
        if (error instanceof AxiosError) {
          this.isErrorCheckoutCart = true;
          toast.error(error.response?.data.message);
          this.isLoadingCheckoutCart = false;
        }
      }
    }
  },
  persist: true
});
