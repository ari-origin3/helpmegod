import React from "react";
import cn from "classnames";
import ContentLoader from "react-content-loader";

interface Props {
  className?: string;
}

export const CampaignGridLoader = (props: Props) => {
  return (
    <ContentLoader
      speed={2}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className={cn(props.className)}
    >
      <rect x="0" y="0" rx="0" ry="0" width="100%" height="165" />
    </ContentLoader>
  );
};
