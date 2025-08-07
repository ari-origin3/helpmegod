import React, { useContext } from "react";
import { ApolloError } from "@apollo/client";
import { Maybe } from "../../../graphql/generated/generated";

export interface UserFr {
  id?: Maybe<string>;
  databaseId?: Maybe<number>;
  firstName?: Maybe<string>;
  email?: Maybe<string>;
  lastName?: Maybe<string>;
  billing?: {
    phone: Maybe<string>;
  };
  jwtRefreshToken?: Maybe<string>;
  jwtAuthToken?: Maybe<string>;
  wishListProducts?: {
    wishlistProducts?: string;
  };
}
export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: UserFr;
  updateUser: React.Dispatch<React.SetStateAction<UserFr | undefined>>;
  // error?: string | { [key: string]: string };
  error?: ApolloError;
  checkAuthentication: () => void;
  logout: () => void;
  login: (u: UserFr) => void;
  wishlist: number[];
  setWishlist: (state: number[]) => void;
}

const voidFunction = () => {};

const AuthContextValues: AuthContextType = {
  isAuthenticated: false,
  isLoading: false,
  user: undefined,
  updateUser: () => {},
  error: undefined,
  checkAuthentication: () => {},
  logout: voidFunction,
  login: (user: UserFr) => {},
  wishlist: [],
  setWishlist: (state: number[]) => {},
};

export const AuthContext = React.createContext<AuthContextType>(
  AuthContextValues
);

export const useAuthContext = () => useContext(AuthContext);
