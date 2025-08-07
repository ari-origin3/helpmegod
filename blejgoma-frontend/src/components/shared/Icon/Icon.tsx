import React from "react";
import cs from "classnames";
import { IconSvg, IconDefinition } from "./Icon.generated";
import "./Icon.scss";
export * from "./Icon.generated";
interface Props {
  icon?: IconDefinition;
  alt?: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
  spin?: boolean;
}
export function Icon(props: Props) {
  const { style, spin, className, icon, ...rest } = props;
  if (!icon) {
    return null;
  }
  return (
    <div
      style={style}
      className={cs("Icon", spin ? "Icon--spin" : undefined, className)}
      {...rest}
    >
      {IconSvg[icon]}
    </div>
  );
}
