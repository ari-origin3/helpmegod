import { isTokenExpired } from "../lib/helpers/isTokenExpired";
import { RefreshJwtAuthTokenDocument } from "../graphql/generated/generated";
import { LOCAL_STORAGE_KEY } from "../lib/context/AuthContext/AuthContextProvider";

export const handleWooSession = (token: string | null) => {
  const localStorageUser = localStorage.getItem(LOCAL_STORAGE_KEY);
  const localValues = localStorageUser && JSON.parse(localStorageUser);
  const wooSession = localValues?.wooSession;

  if (!token || wooSession === token) {
    return;
  }

  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({ ...localValues, wooSession: token })
  );
};

interface RequestHeadersType {
  authorization?: string;
  "woocommerce-session"?: string;
}

export const attachRequestHeaders = () => {
  let requestHeaders: RequestHeadersType = {};
  const localStorageUser = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!localStorageUser) return requestHeaders;
  const wooSession = JSON.parse(localStorageUser).wooSession;
  const jwtAuthToken = JSON.parse(localStorageUser).jwtAuthToken;

  if (jwtAuthToken) {
    requestHeaders["authorization"] = `Bearer ${jwtAuthToken}`;
  }

  if (wooSession && !isTokenExpired(wooSession)) {
    requestHeaders["woocommerce-session"] = `Session ${wooSession}`;    
  }

  return requestHeaders;
};


export const getJWTRefreshToken = (): string => {
  const localStorageUser = localStorage.getItem(LOCAL_STORAGE_KEY);
  const refreshToken =
    localStorageUser && JSON.parse(localStorageUser).jwtRefreshToken;

  return refreshToken;
};

// TODO: Refactor the use of getNewTokenQuery variable, to moved inside the function or a file
let getNewTokenQuery: Promise<any>;
let isTokenNewQueryResolving: Boolean = false;

export const getNewToken = async () => {
  if (getNewTokenQuery && isTokenNewQueryResolving) {
    return getNewTokenQuery;
  }

  isTokenNewQueryResolving = true;
  try {
    const refreshToken = await getJWTRefreshToken();
    const res = await fetch("https://management.blejgoma.com/graphql" as RequestInfo, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        variables: {
          refreshToken: refreshToken,
        },
        query: RefreshJwtAuthTokenDocument.loc?.source.body,
      }),
    });
    console.log("response", res);

    const resNew = await res.json();
    console.log("resNew", resNew);
    isTokenNewQueryResolving = false;
    return resNew.data.refreshJwtAuthToken.authToken;
  } catch (error) {
    console.error(error);
  }
  return getNewTokenQuery;
};
