import React from "react";
import { InfoPlaceholder } from "../../components/shared/InfoPlaceholder/InfoPlaceholder";

//styles
import "./Page404.scss";

export const Page404 = () => {
  return (
    <div className="Page404">
      <InfoPlaceholder
        type="warning"
        icon="vemendje-icon"
        text="Kjo faqe nuk u gjet!"
      />
    </div>
  );
};
