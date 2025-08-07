import React from "react";
import "./FaqItem.scss";

interface Props {
  title: string;
  itemID: string;
  content: string;
  activeTab: string;
  onClick: (id: string) => void;
}

const FaqItem = (props: Props) => {
  const isActive = props.activeTab === props.itemID;

  const handleClick = () => {
    props.onClick(isActive ? "" : props.itemID);
  };

  return (
    <div className={`FaqItem${isActive ? " FaqItem--active" : ""}`}>
      <h4 className="FaqItem__title" onClick={handleClick}>
        {props.title}
      </h4>
      <div className="FaqItem__content">{props.content}</div>
    </div>
  );
};

export default FaqItem;
