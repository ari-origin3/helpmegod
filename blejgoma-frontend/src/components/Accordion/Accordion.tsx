import React, { ReactNode, useState } from "react";
import cs from "classnames";
import { Icon } from "../shared/Icon/Icon";

import "./Accordion.scss";

interface Props {
  title: string;
  children: ReactNode;
}

export const Accordion = (props: Props) => {
  const [open, setOpen] = useState(true);

  const toggleAccordion = () => setOpen((prev) => !prev);
  return (
    <div className="Accordion">
      <h6 className="Accordion__title" onClick={toggleAccordion}>
        {props.title}
        <Icon className="Accordion__arrow" icon="down-arrow" />
      </h6>
      <div
        className={cs(
          "Accordion__content",
          !open && "Accordion__content--closed "
        )}
      >
        {props.children}
      </div>
    </div>
  );
};
