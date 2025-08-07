import React from "react";
import cs from "classnames";
import { Maybe } from "graphql/jsutils/Maybe";

import "./CheckBox.scss";
interface Props {
  className?: string;
  label: Maybe<string>;
  value?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  small?: boolean;
}
export const CheckBox = (props: Props) => {
  return (
    <label
      className={cs(
        "CheckBox",
        props.className,
        props.small && "CheckBox--small"
      )}
    >
      {props.label}
      <input type="checkbox" checked={props.value} onChange={props.onChange} />
      <span className="CheckBox__checkmark"></span>
    </label>
  );
};
