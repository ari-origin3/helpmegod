import React, { Dispatch, useRef, useState } from "react";
import Slider from "react-slick";
import cs from "classnames";

import { Tab } from "../FindTiresBySize";
import { TyreTab } from "../TyreTab";

import "./MobileTabsSlider.scss";
import { Icon } from "../../../shared/Icon/Icon";
interface Props {
  tabs: Tab[];
  activeTab: number;
  onTabClick: Dispatch<React.SetStateAction<number>>;
}
interface ArrowProps {
  className?: string;
  type: "next" | "prev";
  onClick?: any;
  disabled?: boolean;
}
const Arrow = (props: ArrowProps) => (
  <div onClick={props.onClick}>
    <Icon
      className={cs(
        "MobileTabsSlider__arrow",
        `MobileTabsSlider__arrow--${props.type}`,
        props.disabled && "MobileTabsSlider__arrow--disabled",
        props.className
      )}
      icon="arrow-back"
    />
  </div>
);
export const MobileTabsSlider = (props: Props) => {
  const sliderRef = useRef<Slider | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const sliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    dots: false,
    arrows: false,
    onSwipe: handleSwipe,
  };

  function handleSwipe(direction: string) {
    if (direction === "right") {
      props.onTabClick((prev) => (prev === 1 ? props.tabs.length : prev - 1));
      return;
    }
    props.onTabClick((prev) => (prev === props.tabs.length ? 1 : prev + 1));
  }

  const handleClick = (arrowType: "next" | "prev") => {
    if (buttonDisabled) return;

    setButtonDisabled(true);
    if (arrowType === "prev") {
      sliderRef.current?.slickPrev();
      props.onTabClick((prev) => (prev === 1 ? props.tabs.length : prev - 1));
      setTimeout(() => setButtonDisabled(false), 550);
      return;
    }
    props.onTabClick((prev) => (prev === props.tabs.length ? 1 : prev + 1));
    sliderRef.current?.slickNext();
    setTimeout(() => setButtonDisabled(false), 550);
  };
  return (
    <div className="MobileTabsSlider">
      <div className="MobileTabsSlider__wrapper">
        <Arrow
          className="MobileTabsSlider__arrow MobileTabsSlider__arrow--prev"
          type="prev"
          onClick={() => handleClick("prev")}
          disabled={buttonDisabled}
        />
        <Arrow
          className="MobileTabsSlider__arrow MobileTabsSlider--next"
          type="next"
          onClick={() => handleClick("next")}
        />
        <Slider ref={(c) => (sliderRef.current = c)} {...sliderSettings}>
          {props.tabs.map((tab) => (
            <TyreTab
              className="MobileTabsSlider__tab"
              key={`${tab.label}-${tab.index}`}
              label={tab.label}
              active={tab.index === props.activeTab}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};
