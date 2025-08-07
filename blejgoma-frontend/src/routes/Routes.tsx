import React from "react";
import { RouteProps, Switch } from "react-router-dom";

import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { ForgotPassword } from "../pages/ForgotPassword/ForgotPassword";
import { ResetPassword } from "../pages/ResetPassword/ResetPassword";
import { Profile } from "../pages/Profile/Profile";
import { Home } from "../pages/Home/Home";
import { Page404 } from "../pages/Page404/Page404";
import { RestrictedRoute } from "./RestrictedRoute";
import { SingleProduct } from "../pages/SingleProduct/SingleProduct";
import { Wishlist } from "../pages/Wishlist/Wishlist";
import { Shop } from "../pages/Shop/Shop";
import { Contact } from "../pages/Contact/Contact";
import { AboutUs } from "../pages/AboutUs/AboutUs";
import { Cart } from "../pages/Cart/Cart";
import { Checkout } from "../pages/Checkout/Checkout";
import { FindTiresByCarResults } from "../components/FindTires/FindTiresByCar/FindTiresByCarResults/FindTiresByCarResults";
import { CheckoutConfirmation } from "../pages/Checkout/CheckoutConfirmation";
import { Orders } from "../pages/Orders/Orders";
import { OrderSingle } from "../pages/OrderSingle/OrderSingle";
import { SearchResults } from "../pages/SearchResults/SearchResults";
import { TermsOfUse } from "../pages/TermsOfUse/TermsOfUse";
import { Faq } from "../pages/FAQ/Faq";

export enum RouteType {
  PUBLIC,
  PRIVATE,
  RESTRICTED,
}
interface AppRoute extends RouteProps {
  type?: RouteType;
}

export const AppRoutes: AppRoute[] = [
  // Restricted Routes
  {
    type: RouteType.RESTRICTED,
    exact: true,
    path: "login",
    component: Login,
  },
  {
    type: RouteType.RESTRICTED,
    exact: true,
    path: "register",
    component: Register,
  },
  {
    type: RouteType.RESTRICTED,
    exact: true,
    path: "forgot-password",
    component: ForgotPassword,
  },
  {
    type: RouteType.RESTRICTED,
    exact: true,
    path: "reset-password",
    component: ResetPassword,
  },
  // Private Routes
  {
    type: RouteType.PRIVATE,
    path: "my-profile",
    component: Profile,
  },
  {
    type: RouteType.PRIVATE,
    path: "my-orders",
    component: Orders,
    exact: true,
  },
  {
    type: RouteType.PRIVATE,
    path: "my-orders/:orderId",
    component: OrderSingle,
    exact: true,
  },
  // Public Routes
  {
    type: RouteType.PUBLIC,
    exact: true,
    path: "/",
    component: Home,
  },
  {
    type: RouteType.PUBLIC,
    path: "wishlist",
    component: Wishlist,
  },
  {
    type: RouteType.PUBLIC,
    path: "product/:slug",
    component: SingleProduct,
  },
  {
    type: RouteType.PUBLIC,
    path: "shop",
    component: Shop,
  },
  {
    type: RouteType.PUBLIC,
    path: "contact",
    component: Contact,
  },
  {
    type: RouteType.PUBLIC,
    path: "about-us",
    component: AboutUs,
  },
  {
    type: RouteType.PUBLIC,
    path: "cart",
    component: Cart,
  },
  {
    type: RouteType.PUBLIC,
    path: "checkout",
    exact: true,
    component: Checkout,
  },
  {
    type: RouteType.PRIVATE,
    path: "checkout/:orderId",
    component: CheckoutConfirmation,
  },
  {
    type: RouteType.PUBLIC,
    path: "carSearch",
    component: FindTiresByCarResults,
  },
  {
    type: RouteType.PUBLIC,
    path: "search",
    component: SearchResults,
  },
  {
    type: RouteType.PUBLIC,
    path: "terms-of-use",
    component: TermsOfUse,
  },
  {
    type: RouteType.PUBLIC,
    path: "faq",
    component: Faq,
  },
];

export const Routes = () => {
  return (
    <Switch>
      {AppRoutes.map((r) => {
        const { type, path, ...rest } = r;
        if (type === RouteType.PRIVATE) {
          return (
            <PrivateRoute {...rest} key={`${r.path}`} path={`/${r.path}`} />
          );
        }
        if (type === RouteType.RESTRICTED) {
          return (
            <RestrictedRoute {...rest} key={`${r.path}`} path={`/${r.path}`} />
          );
        }

        return <PublicRoute {...rest} key={`${r.path}`} path={`/${r.path}`} />;
      })}
      <PublicRoute component={Page404} />
    </Switch>
  );
};
