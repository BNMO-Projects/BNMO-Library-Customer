import { defineStore } from "pinia";
import axios, { AxiosError } from "axios";
import { WishlistSearchQuery } from "@/types/request.type";
import { PageMetadata, WishlistResponse } from "@/types/response.type";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useWishlistStore = defineStore("wishlist", {
  state: () => {
    return {
      wishlist: [] as Array<WishlistResponse>,
      wishlistMetadata: {} as PageMetadata,
      isLoadingWishlist: false,
      isLoadingAddWishlist: false,
      isLoadingDeleteWishlist: false
    };
  },
  actions: {
    async fetchWishlist(query: WishlistSearchQuery) {
      this.isLoadingWishlist = true;
      try {
        const response = await axios.get("/wishlist", {
          params: {
            currentPage: query.currentPage,
            limitPerPage: query.limitPerPage,
            bookType: query.bookType,
            searchQuery: query.searchQuery
          }
        });

        this.wishlist = response.data.data;
        this.wishlistMetadata = response.data.metadata;
        this.isLoadingWishlist = false;
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
          this.isLoadingWishlist = false;
        }
      }
    },

    async addToWishlist(id: string) {
      this.isLoadingAddWishlist = true;
      try {
        const response = await axios.post("/wishlist", {
          data: { book_id: id }
        });

        this.isLoadingAddWishlist = false;
        toast.success(response.data.message);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
          this.isLoadingAddWishlist = false;
        }
      }
    },

    async removeFromWishlist(id: string) {
      this.isLoadingDeleteWishlist = true;
      try {
        const response = await axios.delete(`/wishlist/${id}`);

        this.isLoadingDeleteWishlist = false;
        toast.success(response.data.message);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
          this.isLoadingDeleteWishlist = false;
        }
      }
    }
  },
  persist: true
});
