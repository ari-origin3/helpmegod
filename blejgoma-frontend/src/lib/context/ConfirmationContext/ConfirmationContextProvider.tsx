import React, { ReactNode, useState } from "react";
import {
  ConfirmationContext,
  ConfirmationContextType,
} from "./ConfirmationContext";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import { IconDefinition } from "../../../components/shared/Icon/Icon.generated";

interface Props {
  children: ReactNode;
}

interface State {
  title?: string;
  icon?: IconDefinition;
  text?: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationContextProvider(props: Props) {
  const defaultText = "Are you sure?";
  const [state, setState] = useState<State>({
    title: undefined,
    icon: undefined,
    text: defaultText,
    isOpen: false,
    onConfirm: () => {},
    onCancel: () => {},
  });
  function confirm(txt?: string, icon?: IconDefinition, title?: string) {
    const text = txt || defaultText;
    return new Promise((resolve, reject) => {
      setState({
        icon: icon,
        title: title,
        text: text,
        isOpen: !state.isOpen,
        onConfirm() {
          setState({ ...state, isOpen: false, text: text });
          resolve(true);
        },
        onCancel() {
          setState({ ...state, isOpen: false, text: text });
          reject(false);
        },
      });
    });
  }
  const context: ConfirmationContextType = {
    isOpen: state.isOpen,
    confirm: confirm,
  };
  return (
    <ConfirmationContext.Provider value={context}>
      <ConfirmationModal confirmationData={state} />
      {props.children}
    </ConfirmationContext.Provider>
  );
}
