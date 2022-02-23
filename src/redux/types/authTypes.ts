import { User } from "firebase/auth";

export interface IAuthStore {
  isAuthenticated: boolean | string;
  user: IReturnedUser | null;
  loading: boolean;
  error: null | {
    msg?: string;
  };
}
//====================================================================================

export type TCreateUserInFirebase = (
  user: User,
  role: TRole,
  customData?: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }
) => Promise<IReturnedUser | null | undefined>;
//====================================================================================

export type TGetUserByIDInFirebase = (
  uid: string
) => Promise<IReturnedUser | null>;
//====================================================================================

export type TCheckUserInFirebase = (
  uid: string
) => Promise<boolean | undefined>;
//====================================================================================

export type TSetterCallback = (data: boolean) => void;
//====================================================================================

export type TRole = "client" | "admin" | "owner";
//====================================================================================

export interface IReturnedUser {
  readonly photoURL: string | null;
  uid: string;
  approved: boolean;
  metadata: {
    readonly lastSignInTime?: string;
    readonly creationTime?: string;
  };
  readonly phoneNumber: string | null;
  role: TRole;
  readonly displayName: string | null;
  readonly providerId: string;
  readonly email: string | null;
}
//====================================================================================

export type TCreateDataOfUserInfo = (user: User, role: TRole) => IReturnedUser;
//====================================================================================
