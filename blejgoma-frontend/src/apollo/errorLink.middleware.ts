import { fromPromise } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

import { removeFieldFromStorage } from "../lib/helpers/removeFieldFromStorage";
import { setFieldToStorage } from "../lib/helpers/setFieldToStorage";
import { getNewToken } from "./apolloHelpers";

export const errorLink = onError(({ graphQLErrors, forward, operation }) => {
  let hasExpiredTokenError = false;
  if (!graphQLErrors) return;
  for (let err of graphQLErrors) {
    let errM = err as any;
    if (
      errM.debugMessage &&
      errM.debugMessage.indexOf("invalid-jwt") >= 0 &&
      !hasExpiredTokenError
    ) {
      hasExpiredTokenError = true;
      return fromPromise(
        getNewToken().catch((e) => {
          removeFieldFromStorage("jwtAuthToken");
          removeFieldFromStorage("jwtRefreshToken");
          window.location.reload();
          return;
        })
        // eslint-disable-next-line no-loop-func
      ).flatMap((accessToken: any) => {
        if (accessToken && accessToken.length > 0) {
          setFieldToStorage("jwtAuthToken", accessToken);
          // window.location.reload();
        }
        return forward(operation);
      });
    }
  }
});
