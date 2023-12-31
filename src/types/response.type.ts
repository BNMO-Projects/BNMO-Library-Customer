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
