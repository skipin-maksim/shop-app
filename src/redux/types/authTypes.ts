import { User } from "firebase/auth";

export interface IAuthStore {
  isAuthenticated: boolean | string;
  user: User | null;
  loading: boolean;
  error: null | object | string;
}
