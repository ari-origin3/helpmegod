import React from "react";
import cs from "classnames";
import { Icon } from "../Icon/Icon";
import { IconDefinition } from "../Icon/Icon.generated";

import "./InfoPlaceholder.scss";

interface Props {
  className?: string;
  iconClassName?: string;
  icon?: IconDefinition;
  text: string;
  type?: "normal" | "warning" | "error" | "success";
}
export const InfoPlaceholder = (props: Props) => {
  return (
    <div
      className={cs(
        "InfoPlaceholder",
        props.className,
        props.type === "error" && "InfoPlaceholder--error",
        props.type === "warning" && "InfoPlaceholder--warning",
        props.type === "success" && "InfoPlaceholder--success"
      )}
    >
      {props.icon && (
        <Icon
          className={cs("InfoPlaceholder__icon", props.iconClassName)}
          icon={props.icon}
        />
      )}
      <p className="InfoPlaceholder__text">{props.text}</p>
    </div>
  );
};
