import React, { useEffect, useState } from "react";
import cs from "classnames";

import { useWindowWidth } from "../../../lib/hooks/useWindowWidth";
import { TyreTab } from "./TyreTab";
import { FindCarTires } from "./FindCarTires";
import { FindCommercialTires } from "./FindCommercialTires";
import { FindMotoTires } from "./FindMotoTires";
import { FindIndustrialTires } from "./FindIndustrialTires";
import { FindAgroTires } from "./FindAgroTires";
import { FindInnerTires } from "./FindInnerTires";
import { MobileTabsSlider } from "./MobileTabsSlider/MobileTabsSlider";

import "./FindTiresBySize.scss";
import { useUIContext } from "../../../lib/context/UIContext/UIContext";

export interface FindTiresBySizeInterface {
  paWidths: string;
  paDiameters: string;
  paHeights: string;
  paSeasons?: string;
}
export interface Tab {
  index: number;
  label: string;
  component: JSX.Element;
}
const tyreTabs: Tab[] = [
  {
    index: 1,
    label: "AUTO GOMA",
    component: <FindCarTires />,
  },
  {
    index: 2,
    label: "KOMERCIALE",
    component: <FindCommercialTires />,
  },
  {
    index: 3,
    label: "MOTO GOMA",
    component: <FindMotoTires />,
  },
  {
    index: 4,
    label: "INDUSTRIALE",
    component: <FindIndustrialTires />,
  },
  {
    index: 5,
    label: "BUJQËSORE",
    component: <FindAgroTires />,
  },
  {
    index: 6,
    label: "TË BRENDSHME",
    component: <FindInnerTires />,
  },
];

export const FindTiresBySize = () => {
  const [activeTab, setActiveTab] = useState(1);
  const { setIsOnMotoTab } = useUIContext();
  const windowWidth = useWindowWidth();
  const noWheelSVGTabs = [3];

  useEffect(() => {
    if (activeTab === 3) {
      setIsOnMotoTab(true);
      return;
    }
    setIsOnMotoTab(false);
  }, [activeTab, setIsOnMotoTab]);

  const shouldRemoveSVG = noWheelSVGTabs.includes(activeTab);
  const shouldRenderMobile = windowWidth < 800;
  return (
    <div
      className={cs(
        "FindTiresBySize",
        shouldRemoveSVG && "FindTiresBySize--no_svg"
      )}
    >
      {
        tyreTabs.find((tab) => {
          return tab.index === activeTab;
        })?.component
      }
      {shouldRenderMobile ? (
        <MobileTabsSlider
          tabs={tyreTabs}
          activeTab={activeTab}
          onTabClick={setActiveTab}
        />
      ) : (
        <ul className="FindTiresBySize__tabs">
          {tyreTabs.map((tab) => (
            <TyreTab
              key={`${tab.label}-${tab.index}`}
              label={tab.label}
              active={tab.index === activeTab}
              onClick={() => setActiveTab(tab.index)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
