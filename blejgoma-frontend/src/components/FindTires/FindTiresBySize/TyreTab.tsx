import React from "react";
import cs from "classnames";

import "./TyreTab.scss";

interface Props {
  className?: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}
export const TyreTab = (props: Props) => {
  return (
    <li
      onClick={props.onClick}
      className={cs(
        "TyreTab",
        props.className,
        props.active && "TyreTab--active"
      )}
    >
      <span data-attr={props.label}>{props.label}</span>
    </li>
  );
};
