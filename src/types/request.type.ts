import { CatalogMetadataResponse } from "@/types/response.type";

export type LoginRequest = {
  username: string;
  password: string;
};

export type RegisterRequest = {
  first_name: string;
  last_name: string | undefined;
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
};

export type CatalogSearchQuery = {
  currentPage: number;
  limitPerPage: number;
  bookType: string;
  searchQuery: string | undefined;
  authorQuery: string | undefined;
  category: string | undefined;
  genre: string | undefined;
  language: string | undefined;
};
