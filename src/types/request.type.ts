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
