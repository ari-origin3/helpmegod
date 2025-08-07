import React from "react";
import cs from "classnames";

import { Icon } from "../Icon/Icon";
import { IconDefinition } from "../Icon/Icon.generated";

import "./RatingStars.scss";

interface Props {
  className?: string;
  rate: number;
  icon?: IconDefinition;
}

export const RatingStars = (props: Props) => {
  const { rate, icon } = props;

  const getIconName = (index: number, rate: number) => {
    return (index < rate ? "star" : "star-outline") as IconDefinition;
  };

  return (
    <div className={cs("RatingStars", props.className)}>
      {Array.from({ length: 5 }).map((star, index) => (
        <Icon
          key={`Ratingstar-${index}`}
          className="RatingStars__star"
          icon={icon || getIconName(index, rate)}
        />
      ))}
    </div>
  );
};
