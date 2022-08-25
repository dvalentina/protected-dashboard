export interface TypedResponse extends Response {
  message?: string;
  accessToken?: string;
  userId?: number;
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

export interface ISignIn {
  handleUserIdChange: (value: number) => void;
}

export interface IDashboard {
  userId: number;
}

type LocationProps = {
  state: {
    from: Location;
  };
};

interface IRequireAuth {
  children: JSX.Element;
}
