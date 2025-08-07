import React from "react";
import cs from "classnames";
import { Icon } from "../Icon/Icon";
import { IconDefinition } from "../Icon/Icon.generated";

interface Props {
  icon: IconDefinition;
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const IconButton = (props: Props) => {
  return (
    <button
      className={cs("IconButton", props.className)}
      onClick={props.onClick}
    >
      <Icon icon={props.icon} />
    </button>
  );
};
