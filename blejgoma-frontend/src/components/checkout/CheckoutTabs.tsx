import React from "react";
import cs from "classnames";
import "./CheckoutTabs.scss";

export interface CheckoutStepType {
  index: number;
  label: string;
  component: React.ReactNode;
  disabled?: boolean;
}

interface Props {
  tabs: CheckoutStepType[];
  activeTab: number;
  onTabClick: React.Dispatch<React.SetStateAction<number>>;
}
export const CheckoutTabs = (props: Props) => {
  return (
    <ul className="CheckoutTabs">
      {props.tabs.map((tab, index) => (
        <li
          className={cs(
            "CheckoutTabs__tab",
            props.activeTab === tab.index && "CheckoutTabs__tab--active",
            tab.disabled && "CheckoutTabs__tab--disabled"
          )}
          onClick={() => props.onTabClick(tab.index)}
          key={`CheckoutTab--${index}`}
        >
          {tab.label}
        </li>
      ))}
    </ul>
  );
};
