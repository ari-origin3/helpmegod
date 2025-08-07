import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { AuthContextProvider } from "./lib/context/AuthContext/AuthContextProvider";
import { NotificationContextProvider } from "./lib/context/NotificationContext/NotificationContextProvider";
import { CartContextProvider } from "./lib/context/CartContext/CartContextProvider";
import { UIContextProvider } from "./lib/context/UIContext/UIContextProvider";
import { ConfirmationContextProvider } from "./lib/context/ConfirmationContext/ConfirmationContextProvider";
import { createApolloClient } from "./apollo/createApolloClient";

/****
 * * IMPORTANT NOTE: Do not change _main.scss_ import order.
 * It needs to be imported before main App component
 ****/

import "./styles/main.scss";

import App from "./App";
const apolloClient = createApolloClient();
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={apolloClient}>
        <AuthContextProvider>
          <NotificationContextProvider>
            <CartContextProvider>
              <UIContextProvider>
                <ConfirmationContextProvider>
                  <App />
                </ConfirmationContextProvider>
              </UIContextProvider>
            </CartContextProvider>
          </NotificationContextProvider>
        </AuthContextProvider>
      </ApolloProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
