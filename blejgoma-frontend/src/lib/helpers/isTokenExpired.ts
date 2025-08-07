import jwt_decode from "jwt-decode";

export function isTokenExpired(token: string | null) {
  if (!token) {
    return true;
  }

  try {
    const decoded: any = jwt_decode(token);
    return Date.now() >= decoded.exp * 1000;
  } catch (e) {
    return true;
  }
}
