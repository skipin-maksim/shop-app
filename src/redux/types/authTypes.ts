import { User } from "firebase/auth";

export interface IAuthStore {
  user: User | null;
  loading: boolean;
  error: null | object | string;
}
