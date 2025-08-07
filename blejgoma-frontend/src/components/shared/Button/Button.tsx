import React from "react";
import cs from "classnames";
import { Icon, IconDefinition } from "../Icon/Icon";

import "./Button.scss";
import { Spinner } from "reactstrap";

type SizeType = "sm";
interface Props {
  className?: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset" | undefined;
  loading?: boolean;
  disabled?: boolean;
  size?: SizeType;
  icon?: IconDefinition;
  tabIndex?: number;
}

export default function Button(props: Props) {
  const {
    loading,
    type,
    className,
    disabled,
    icon,
    size,
    label,
    onClick,
    ...rest
  } = props;

  return (
    <button
      {...rest}
      className={cs(
        "Button",
        className && className,
        size === "sm" && "Button--small",
        (disabled || loading) && "Button--disabled"
      )}
      type={type}
      onClick={onClick}
      tabIndex={props.tabIndex}
    >
      {loading ? <Spinner size="sm" /> : label}
      {icon && <Icon className="Button__icon" icon={icon} />}
    </button>
  );
}
