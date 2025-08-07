import React from "react";
import { Route, RouteProps, useLocation, Redirect } from "react-router-dom";
import { useAuthContext } from "../lib/context/AuthContext/AuthContext";
export const PrivateRoute = (props: RouteProps) => {
  const authCtx = useAuthContext();
  const location = useLocation();

  if (!authCtx.isAuthenticated) {
    return <Redirect to={location.pathname} />;
  }

  return <Route {...props} />;
};
