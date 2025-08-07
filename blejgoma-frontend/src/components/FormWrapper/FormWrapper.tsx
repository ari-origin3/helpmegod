// import React from "react";
import cs from "classnames";

import "./FormWrapper.scss";

interface Props {
  className?: string;
  title?: string;
  children: React.ReactElement | React.ReactElement[];
}

export const FormWrapper = (props: Props) => {
  return (
    <div className={cs("FormWrapper", props.className)}>
      {props.title && <h5 className="FormWrapper__title">{props.title}</h5>}
      {props.children}
    </div>
  );
};
