import React from "react";
import { UseErrorHandler } from "../../../lib/hooks/useErrorHandler";
import { ApolloError } from "@apollo/client";
import { Alert } from "../Alert/Alert";

interface Props {
  onClose?: () => void;
  error?: string | UseErrorHandler | ApolloError;
  errorText?: string;
  children?: React.ReactNode;
  showCloseButton?: boolean;
  // alertProps?: AlertProps;
}

export const ErrorMessage = (props: Props) => {
  if (!props.errorText) return null;

  return (
    <Alert color="danger" toggle={props.onClose}>
      <div>{props.errorText}</div>
    </Alert>
  );
};
