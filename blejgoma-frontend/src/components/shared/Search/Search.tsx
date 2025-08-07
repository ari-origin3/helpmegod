import React from "react";
import cs from "classnames";
import { Icon } from "../Icon/Icon";

import "./Search.scss";
interface Props {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyUpCapture: React.KeyboardEventHandler<HTMLDivElement> | undefined;
  onSearchIconClick?: () => void;
}
export const Search = (props: Props) => {
  const {
    className,
    value,
    onChange,
    onKeyUpCapture,
    onSearchIconClick,
  } = props;

  return (
    <div className={cs("Search", className)} onKeyUpCapture={onKeyUpCapture}>
      <input className="Search__input" value={value} onChange={onChange} />
      <Icon
        className="Search__icon"
        icon="search"
        onClick={onSearchIconClick}
      />
    </div>
  );
};
