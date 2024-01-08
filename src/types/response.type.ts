import { Component } from "vue";

export type ToastComponentConfig = {
  component: Component;
  props: {
    heading: string;
    description: string | undefined;
  };
};

export type RegisterErrorDetails = {
  email: string | undefined;
  username: string | undefined;
  password: string | undefined;
  password_confirmation: string | undefined;
};

export type PageMetadata = {
  total: number;
  page: number;
  totalPage: number;
};

export type CatalogMetadataResponse = {
  id: string;
  name: string;
};

export type BookListResponse = {
  id: string;
  title: string;
  book_cover: string;
  original_stock: number;
  current_stock: number;
  book_type: string;
  price: number;
  author_name: string;
};

export type BookDetailResponse = {
  id: string;
  title: string;
  publication_year: Date;
  isbn: string;
  book_cover: string;
  cover_file_name: string;
  original_stock: number;
  current_stock: number;
  description: string;
  book_type: string;
  price: number | null;
  created_at: Date;
  updated_at: Date;
  author_name: string;
  category_name: string;
  genre_name: string;
  language_name: string;
  in_wishlist: boolean;
  wishlist_id: string;
  in_cart: boolean;
  cart_item_id: string;
};

export type CartItemListResponse = {
  id: string;
  book_id: string;
  price: number | null;
  title: string;
  book_cover: string;
  book_type: string;
  author_name: string;
};

export type WishlistResponse = {
  id: string;
  book_id: string;
  created_at: Date;
  title: string;
  publication_year: Date;
  book_cover: string;
  original_stock: number;
  current_stock: number;
  book_type: string;
  price: number | null;
  description: string | null;
  author_name: string;
  category_name: string;
  genre_name: string;
  language_name: string;
  in_cart: boolean;
  cart_item_id: string | null;
};

export type OrderHistoryCartItemResponse = {
  price: number | null;
  status: string | null;
  book_id: string;
  title: string;
  book_cover: string;
  book_type: string;
  author_name: string;
};

export type OrderHistoryResponse = {
  id: string;
  validation_code: string;
  status: string;
  created_at: Date;
  cart_items: Array<OrderHistoryCartItemResponse>;
};
