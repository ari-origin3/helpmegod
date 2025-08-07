import { ReactNode } from "react";
import { useToasts, AddToast, Options } from "react-toast-notifications";

export const useToast = (removePreviousToasts: boolean = true) => {
  const { addToast: legacyAddToast, removeAllToasts, ...rest } = useToasts();

  const addToast: AddToast = (
    content: ReactNode,
    options?: Options,
    callback?: (id: string) => void
  ) => {
    if (removePreviousToasts) removeAllToasts();
    return legacyAddToast(content, options, callback);
  };
  return { addToast, removeAllToasts, ...rest };
};
