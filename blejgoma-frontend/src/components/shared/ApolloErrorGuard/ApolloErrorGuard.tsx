import React from "react";
import { ApolloError } from "@apollo/client";

import { GraphQLError } from "graphql";
import { useToast } from "../../../lib/hooks/useToast";

interface Props {
  error?: ApolloError | ReadonlyArray<GraphQLError>;
  errorComponent?: JSX.Element;
  children: React.ReactNode;
}

export const ApolloErrorGuard = (props: Props) => {
  const { addToast } = useToast();

  if (!props.error) {
    return <>{props.children}</>;
  }

  if (props.errorComponent) {
    return <>{props.errorComponent}</>;
  }

  addToast(props.error.toString(), { appearance: "error" });

  return <></>;
};
