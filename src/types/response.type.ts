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
