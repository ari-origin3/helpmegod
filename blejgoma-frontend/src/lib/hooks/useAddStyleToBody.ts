/**
 * Modifies body style.
 *
 * @param {string} property Property of style attribute.
 * @param {string} value Value of the property.
 * @return void
 */

import { useEffect } from "react";

export const useAddStyleToBody = (property: string, value: string) => {
  useEffect(() => {
    //Set body style with the provided property and value
    document.body.setAttribute("style", `${property}:${value}`);

    //Remove the applied style on component un-mount
    return () => document.body.removeAttribute("style");
  }, [property, value]);
};
