import React from "react";
import cs from "classnames";

import "./FindTiresTabs.scss";
interface Props {
  activeTab: number;
  onTabClick: (tab: number) => void;
}

export const FindTiresTabs = (props: Props) => {
  return (
    <ul className="FindTiresTabs">
      <li
        className={cs(
          "FindTiresTabs__tab FindTiresTabs__tab--one",
          props.activeTab === 1 && "FindTiresTabs__tab--active"
        )}
        onClick={() => props.onTabClick(1)}
      >
        GOMA SIPAS MADHËSISË
      </li>
      <li
        className={cs(
          "FindTiresTabs__tab FindTiresTabs__tab--two",
          props.activeTab === 2 && "FindTiresTabs__tab--active "
        )}
        onClick={() => props.onTabClick(2)}
      >
        GOMA SIPAS VETURËS
      </li>
    </ul>
  );
};
