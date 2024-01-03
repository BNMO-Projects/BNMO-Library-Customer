import { WishlistSearchQuery } from "@/types/request.type";
import { PageMetadata, WishlistResponse } from "@/types/response.type";
import axios, { AxiosError } from "axios";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useWishlistStore = defineStore("wishlist", {
  state: () => {
    return {
      wishlist: [] as Array<WishlistResponse>,
      wishlistMetadata: {} as PageMetadata,
      loadingWishlist: false,
      loadingAddWishlist: false,
      loadingDeleteWishlist: false
    };
  },
  getters: {
    getWishlist: (state) => state.wishlist,
    getWishlistMetadata: (state) => state.wishlistMetadata,
    isLoadingWishlist: (state) => state.loadingWishlist,
    isLoadingAddWishlist: (state) => state.loadingAddWishlist,
    isLoadingDeleteWishlist: (state) => state.loadingDeleteWishlist
  },
  actions: {
    async getWishlistData(query: WishlistSearchQuery) {
      this.loadingWishlist = true;
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
        this.loadingWishlist = false;
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
          this.loadingWishlist = false;
        }
      }
    },

    async addNewWishlist(id: string) {
      this.loadingAddWishlist = true;
      try {
        const response = await axios.post("/wishlist", {
          data: { book_id: id }
        });

        this.loadingAddWishlist = false;
        toast.success(response.data.message);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
          this.loadingAddWishlist = false;
        }
      }
    },

    async removeFromWishlist(id: string) {
      this.loadingDeleteWishlist = true;
      try {
        const response = await axios.delete(`/wishlist/${id}`);

        this.loadingDeleteWishlist = false;
        toast.success(response.data.message);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
          this.loadingDeleteWishlist = false;
        }
      }
    }
  },
  persist: true
});
