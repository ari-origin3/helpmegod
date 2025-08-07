import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink, ApolloLink, Operation, NextLink } from "@apollo/client";

import { handleWooSession, attachRequestHeaders } from "./apolloHelpers";
import introspectionQueryResultData from "./fragmentTypes.json";
import { errorLink } from "./errorLink.middleware";

const cache = new InMemoryCache({
  possibleTypes: introspectionQueryResultData,
});

// const httpLink = new HttpLink({
//   uri: process.env.REACT_APP_GRAPHQL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// }) as HttpLink;

const httpLink = new HttpLink({
  uri: "https://management.blejgoma.com/graphql",
  headers: {
    "Content-Type": "application/json",
  },
}) as HttpLink;

const middleware = new ApolloLink((operation: Operation, forward: NextLink) => {
  const requestHeaders = attachRequestHeaders();

  if (Object.entries(requestHeaders).length) {
    operation.setContext(() => ({
      headers: {
        ...requestHeaders,
      },
      
      
    }));
  }

  return forward(operation);
});

const afterware = new ApolloLink((operation: Operation, forward: NextLink) =>
  forward(operation).map((response) => {
    const context = operation.getContext();
    const {
      response: { headers },
    } = context;
    handleWooSession(headers.get("woocommerce-session"));
    return response;
  })
);

const link = ApolloLink.from([errorLink, middleware, afterware, httpLink]);

export function createApolloClient() {
  return new ApolloClient({
    link: link,
    cache,
  });
}
