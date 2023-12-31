import { CatalogSearchQuery } from "@/types/request.type";
import {
  PageMetadata,
  CatalogMetadataResponse,
  BookListResponse,
  BookDetailResponse
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

      genres: [] as Array<CatalogMetadataResponse>,
      loadingGenres: false,

      languages: [] as Array<CatalogMetadataResponse>,
      loadingLanguages: false,

      bookDetail: {} as BookDetailResponse,
      loadingBookDetail: false,
      errBookDetail: "" || undefined
    };
  },
  getters: {
    getBooks: (state) => state.books,
    getBooksMetadata: (state) => state.booksMetadata,
    isLoadingBooks: (state) => state.loadingBooks,
    errorBooks: (state) => state.errBooks,

    getCategories: (state) => state.categories,
    isLoadingCategories: (state) => state.loadingCategories,

    getGenres: (state) => state.genres,
    isLoadingGenres: (state) => state.loadingGenres,

    getLanguages: (state) => state.languages,
    isLoadingLanguages: (state) => state.loadingLanguages,

    getBookDetail: (state) => state.bookDetail,
    isLoadingBookDetail: (state) => state.loadingBookDetail,
    errorBookDetail: (state) => state.errBookDetail
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
    },

    async getBookDetails(id: string) {
      this.loadingBookDetail = true;
      try {
        const response = await axios.get(`/catalog/${id}`);

        this.bookDetail = response.data.data;
        this.loadingBookDetail = false;
      } catch (error) {
        if (error instanceof AxiosError) {
          this.loadingBookDetail = false;

          toast.error(error.response?.data.message);
        }
      }
    }
  },
  persist: true
});
