import React, { useMemo } from "react";

import { Maybe } from "graphql/jsutils/Maybe";
import background from "../../assets/images/tyre-label-bg.png";
import arrow from "../../assets/images/tyre-label-arrow.png";

import "./EUTyreLabel.scss";
export type LetterRange = "A" | "B" | "C" | "D" | "E" | "F" | "G";

interface Props {
  fuel: LetterRange;
  rain: LetterRange;
  noise?: Maybe<string>;
}

//TODO:Add react memo

export const EUTyreLabel = (props: Props) => {
  const arrowPositionByLetter = useMemo(
    () => [
      { letter: "A", top: 61 },
      { letter: "B", top: 73 },
      { letter: "C", top: 85 },
      { letter: "D", top: 96 },
      { letter: "E", top: 108 },
      { letter: "F", top: 120 },
      { letter: "G", top: 122 },
    ],
    []
  );

  const fuelArrowTopPosition = arrowPositionByLetter.find(
    (ltrObj) => ltrObj.letter === props.fuel
  )?.top;

  const rainArrowTopPosition = arrowPositionByLetter.find(
    (ltrObj) => ltrObj.letter === props.rain
  )?.top;

  return (
    <div className="EUTyreLabel">
      <img src={background} alt="" />
      <span className="EUTyreLabel__fuel" style={{ top: fuelArrowTopPosition }}>
        <span className="position-relative">
          <img className="EUTyreLabel__arrow" src={arrow} alt="arrow" />
          <h5 className="EUTyreLabel__value">{props.fuel}</h5>
        </span>
      </span>
      <span className="EUTyreLabel__rain" style={{ top: rainArrowTopPosition }}>
        <span className="position-relative">
          <img className="EUTyreLabel__arrow" src={arrow} alt="arrow" />
          <h5 className="EUTyreLabel__value">{props.rain}</h5>
        </span>
      </span>
      <h5 className="EUTyreLabel__noise">{props.noise}</h5>
    </div>
  );
};
