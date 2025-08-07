import React, { useEffect, useState } from "react";
import Button from "../Button/Button";

import "./ScrollToTopWrapper.scss";

interface Props {
  children: React.ReactNode;
}

export const ScrollToTopWrapper = (props: Props) => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      window.pageYOffset > 700
        ? setShowScrollButton(true)
        : setShowScrollButton(false);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  return (
    <div className="ScrollWrapper">
      <div className="ScrollWrapper__btn">
        {showScrollButton && (
          <Button label="" icon="arrow-right" onClick={() => scrollToTop()} />
        )}
      </div>
      {props.children}
    </div>
  );
};
