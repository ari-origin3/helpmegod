import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../Icon/Icon";

import "./ToastContent.scss";

interface Props {
  description: string;
  linkPath?: string;
  linkDescription?: string;
}

export const ToastContent = (props: Props) => (
  <div className="ToastContent">
    <p className="ToastContent__text">{props.description}</p>
    {props.linkPath && (
      <Link to={props.linkPath}>
        {props.linkDescription}
        <div className="ToastContent__icon">
          <Icon icon="arrow-right" />
        </div>
      </Link>
    )}
  </div>
);
