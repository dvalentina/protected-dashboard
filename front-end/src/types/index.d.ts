export interface TypedResponse extends Response {
  message: string;
  accessToken: string;
}

export interface AuthForm {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
}
