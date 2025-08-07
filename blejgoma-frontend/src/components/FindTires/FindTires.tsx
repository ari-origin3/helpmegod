import React, { useState } from "react";
import cs from "classnames";
import { FindTiresTabs } from "./FindTiresTabs/FindTiresTabs";
import { FindTiresByCar } from "./FindTiresByCar/FindTiresByCar";
import { FindTiresBySize } from "./FindTiresBySize/FindTiresBySize";
import { useUIContext } from "../../lib/context/UIContext/UIContext";

import "./FindTires.scss";
import { useWindowWidth } from "../../lib/hooks/useWindowWidth";

interface Props {
  intialTab?: number;
}
export const FindTires = (props: Props) => {
  const [activeTab, setActiveTab] = useState(props.intialTab || 1);
  const { isOnMotoTab } = useUIContext();
  const windowWidth = useWindowWidth();

  const isMobile = windowWidth < 800;

  const handleTabClick = (tab: number) => {
    setActiveTab(tab);
  };

  return (
    <div
      className={cs("FindTires", isOnMotoTab && isMobile && "FindTires--moto")}
    >
      <FindTiresTabs activeTab={activeTab} onTabClick={handleTabClick} />

      {activeTab === 1 ? <FindTiresBySize /> : <FindTiresByCar />}
    </div>
  );
};
