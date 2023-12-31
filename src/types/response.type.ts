export type ErrorRegisterResponse = {
  email: Array<string>;
  username: Array<string>;
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
};
