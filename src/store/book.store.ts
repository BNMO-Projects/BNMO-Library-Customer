import { defineStore } from "pinia";
import axios, { AxiosError } from "axios";

import { CatalogSearchQuery } from "@/types/request.type";
import {
  PageMetadata,
  CatalogMetadataResponse,
  BookListResponse,
  BookDetailResponse
} from "@/types/response.type";

import { useToast } from "vue-toastification";

const toast = useToast();

export const useBookStore = defineStore("book", {
  state: () => {
    return {
      books: [] as Array<BookListResponse>,
      booksMetadata: {} as PageMetadata,
      isLoadingBooks: false,

      categories: [] as Array<CatalogMetadataResponse>,
      isLoadingCategories: false,

      genres: [] as Array<CatalogMetadataResponse>,
      isLoadingGenres: false,

      languages: [] as Array<CatalogMetadataResponse>,
      isLoadingLanguages: false,

      bookDetail: {} as BookDetailResponse,
      isLoadingBookDetail: false
    };
  },
  actions: {
    async fetchBooks(query: CatalogSearchQuery) {
      this.isLoadingBooks = true;
      try {
        const response = await axios.get("/catalog", {
          params: {
            currentPage: query.currentPage,
            limitPerPage: query.limitPerPage,
            bookType: query.bookType,
            searchQuery: query.searchQuery,
            authorQuery: query.authorQuery,
            category: query.category,
            genre: query.genre,
            language: query.language
          }
        });

        this.books = response.data.data;
        this.booksMetadata = response.data.metadata;
        this.isLoadingBooks = false;
      } catch (error) {
        if (error instanceof AxiosError) {
          this.isLoadingBooks = false;
        }
      }
    },

    async fetchCategories(name: string | undefined) {
      this.isLoadingCategories = true;
      try {
        const response = await axios.get("/catalog-metadata/categories", {
          params: { name }
        });

        this.categories = response.data.data;
        this.isLoadingCategories = false;
      } catch (error) {
        if (error instanceof AxiosError) {
          this.isLoadingCategories = false;

          toast.error("Failed to fetch categories");
        }
      }
    },

    async fetchGenres(name: string | undefined) {
      this.isLoadingGenres = true;
      try {
        const response = await axios.get("/catalog-metadata/genres", {
          params: { name }
        });

        this.genres = response.data.data;
        this.isLoadingGenres = false;
      } catch (error) {
        if (error instanceof AxiosError) {
          this.isLoadingGenres = false;

          toast.error("Failed to fetch genres");
        }
      }
    },

    async fetchLanguages(name: string | undefined) {
      this.isLoadingLanguages = true;
      try {
        const response = await axios.get("/catalog-metadata/languages", {
          params: { name }
        });

        this.languages = response.data.data;
        this.isLoadingLanguages = false;
      } catch (error) {
        if (error instanceof AxiosError) {
          this.isLoadingLanguages = false;

          toast.error("Failed to fetch languages");
        }
      }
    },

    async fetchBookDetails(id: string) {
      this.isLoadingBookDetail = true;
      try {
        const response = await axios.get(`/catalog/${id}`);

        this.bookDetail = response.data.data;
        this.isLoadingBookDetail = false;
      } catch (error) {
        if (error instanceof AxiosError) {
          this.isLoadingBookDetail = false;

          toast.error(error.response?.data.message);
        }
      }
    }
  },
  persist: true
});
