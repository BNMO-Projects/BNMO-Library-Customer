import { CatalogSearchQuery } from "@/types/request.type";
import {
  PageMetadata,
  CatalogMetadataResponse,
  BookListResponse
} from "@/types/response.type";
import axios, { AxiosError } from "axios";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useBookStore = defineStore("book", {
  state: () => {
    return {
      books: [] as Array<BookListResponse>,
      booksMetadata: {} as PageMetadata,
      loadingBooks: false,
      errBooks: "" || undefined,

      categories: [] as Array<CatalogMetadataResponse>,
      loadingCategories: false,
      errCategories: "" || undefined,

      genres: [] as Array<CatalogMetadataResponse>,
      loadingGenres: false,
      errGenres: "" || undefined,

      languages: [] as Array<CatalogMetadataResponse>,
      loadingLanguages: false,
      errLanguages: "" || undefined
    };
  },
  getters: {
    getBooks: (state) => state.books,
    getBooksMetadata: (state) => state.booksMetadata,
    isLoadingBooks: (state) => state.loadingBooks,
    errorBooks: (state) => state.errBooks,

    getCategories: (state) => state.categories,
    isLoadingCategories: (state) => state.loadingCategories,
    errorCategories: (state) => state.errCategories,

    getGenres: (state) => state.genres,
    isLoadingGenres: (state) => state.loadingGenres,
    errorGenres: (state) => state.errGenres,

    getLanguages: (state) => state.languages,
    isLoadingLanguages: (state) => state.loadingLanguages,
    errorLanguages: (state) => state.errLanguages
  },
  actions: {
    async getBooksList(query: CatalogSearchQuery) {
      this.loadingBooks = true;
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
        this.loadingBooks = false;
      } catch (error) {
        if (error instanceof AxiosError) {
          this.errBooks = error.response?.data.message;
          this.loadingBooks = false;
        }
      }
    },

    async getCategoriesList(name: string | undefined) {
      this.loadingCategories = true;
      try {
        const response = await axios.get("/catalog-metadata/categories", {
          params: { name }
        });

        this.categories = response.data.data;
        this.loadingCategories = false;
      } catch (error) {
        if (error instanceof AxiosError) {
          this.loadingCategories = false;

          toast.error("Failed to fetch categories");
        }
      }
    },

    async getGenresList(name: string | undefined) {
      this.loadingGenres = true;
      try {
        const response = await axios.get("/catalog-metadata/genres", {
          params: { name }
        });

        this.genres = response.data.data;
        this.loadingGenres = false;
      } catch (error) {
        if (error instanceof AxiosError) {
          this.loadingGenres = false;

          toast.error("Failed to fetch genres");
        }
      }
    },

    async getLanguagesList(name: string | undefined) {
      this.loadingLanguages = true;
      try {
        const response = await axios.get("/catalog-metadata/languages", {
          params: { name }
        });

        this.languages = response.data.data;
        this.loadingLanguages = false;
      } catch (error) {
        if (error instanceof AxiosError) {
          this.loadingLanguages = false;

          toast.error("Failed to fetch languages");
        }
      }
    }
  },
  persist: true
});
