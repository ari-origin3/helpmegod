import React, { useState, useEffect } from "react";
import { useLocalStorage, deleteFromStorage } from "@rehooks/local-storage";
import { createApolloClient } from "../../../apollo/createApolloClient";
import { AuthContextType, AuthContext, UserFr } from "./AuthContext";
import {
  GetViewerDocument,
  GetViewerQueryResult,
  GetViewerQueryVariables,
} from "../../../graphql/generated/generated";
// import { setFieldToStorage } from "../../helpers/setFieldToStorage";
import jwtDecode from "jwt-decode";

interface AuthContextProviderProps {
  children: React.ReactNode | null;
}
interface JwtPayload {
  iss: string;
  iat: number;
  nbf: number;
  exp: number;
  data: {
    user: {
      id: string;
    };
  };
}

export const LOCAL_STORAGE_KEY = "BLEJGOMA_USER";
const WISHLIST_LOCAL_STORAGE_KEY = "wishlist";

interface LocalStorageDataType {
  jwtAuthToken: string;
  jwtRefreshToken: string;
}

export const AuthContextProvider = (props: AuthContextProviderProps) => {
  const apolloClient = createApolloClient();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [user, setUser] = useState<UserFr | undefined>(undefined);

  const [wishlist, setWishlist] = useLocalStorage<number[]>(
    WISHLIST_LOCAL_STORAGE_KEY
  );

  const [userStorageDetails] = useLocalStorage<LocalStorageDataType>(
    LOCAL_STORAGE_KEY
  );

  useEffect(() => {
    checkAuthentication();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const checkAuthentication = async () => {
    if (!userStorageDetails) {
      setLoading(false);
      setUser(undefined);
      return;
    }
    try {
      const { data } = await apolloClient.query<
        GetViewerQueryVariables,
        GetViewerQueryResult
      >({
        query: GetViewerDocument,
        fetchPolicy: "network-only",
      });
      const viewer = data?.viewer as any;

      if (viewer) {
        login({
          id: viewer.id,
          databaseId: viewer.databaseId,
          firstName: viewer.firstName,
          lastName: viewer.lastName,
          email: viewer.email,
          jwtAuthToken: viewer.jwtAuthToken,
          jwtRefreshToken: viewer.jwtRefreshToken,
          billing: { phone: viewer.phoneNumber },
          wishListProducts: viewer.wishListProducts,
        } as UserFr);
      }
    } catch (err) {
      setError(err);
      deleteFromStorage(LOCAL_STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  };

  const login = (user: UserFr) => {
    const { jwtAuthToken, jwtRefreshToken } = user;
    // setFieldToStorage("jwtAuthToken", jwtAuthToken);
    // setFieldToStorage("jwtRefreshToken", jwtRefreshToken);

    // if (jwtAuthToken) {
    //   const decodedToken: JwtPayload | null = jwtAuthToken
    //     ? (jwtDecode(jwtAuthToken) as JwtPayload)
    //     : null;

    //   if (decodedToken) {
    //     const userId = decodedToken.data.user.id;

    //     localStorage.setItem("userId", userId);

    //     console.log(userId); // Outputs the user ID
    //   }
    // }

    setUser(user);
    user.wishListProducts?.wishlistProducts &&
      setWishlist(JSON.parse(user.wishListProducts?.wishlistProducts));
  };

  const logout = async () => {
    setUser(undefined);
    setWishlist([]);
    await apolloClient.clearStore();
    deleteFromStorage(LOCAL_STORAGE_KEY);

    // Finally we redirect to login page (optional)
    // router.history.push("/");
  };
  const context: AuthContextType = {
    isAuthenticated: user !== undefined,
    isLoading: loading,
    error: error,
    user: user,
    updateUser: setUser,
    login: login,
    logout: logout,
    checkAuthentication,
    wishlist: wishlist as number[],
    setWishlist,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};
