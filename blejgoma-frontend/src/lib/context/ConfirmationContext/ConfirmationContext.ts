import React, { useContext } from "react";
import { IconDefinition } from "../../../components/shared/Icon/Icon.generated";

const defaultContext = {
  isOpen: false,
  confirm: (txt?: string, icon?: IconDefinition, title?: string) => Promise, // tslint:disable-line: no-empty
};
export interface ConfirmationContextType {
  isOpen: boolean;
  confirm: (txt?: string, icon?: IconDefinition, title?: string) => any;
}

export const ConfirmationContext = React.createContext<ConfirmationContextType>(
  defaultContext
);

export function useConfirmation() {
  return useContext(ConfirmationContext);
}
