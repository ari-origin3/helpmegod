import React from "react";
import cs from "classnames";

import { ReactComponent as TruckSVG } from "../../assets/not-generated/delivery-truck.svg";
import { ReactComponent as TireSVG } from "../../assets/not-generated/tire.svg";
import { ReactComponent as SafePurchSVG } from "../../assets/not-generated/safe-purchase.svg";

import "./Banner.scss";
import { useGetInfoBannerContentQuery } from "../../graphql/generated/generated";
import { useSkeleton } from "../../lib/hooks/useSkeleton";
import { useWindowWidth } from "../../lib/hooks/useWindowWidth";
interface Props {
  className?: string;
}

export const Banner = (props: Props) => {
  const { data, loading } = useGetInfoBannerContentQuery();
  const windowWidth = useWindowWidth();
  const s = useSkeleton(loading, {
    width: getBannerSkeletonWidthBasedOnScreen(windowWidth),
    style: {
      backgroundColor: "#393e47",
      backgroundImage: "linear-gradient(90deg, #393e47, #444b55, #393e47",
    },
  });

  const content = data?.generalOptions?.generalOptions?.ads?.infoBanner;

  return (
    <div className={cs("Banner", props.className && props.className)}>
      <div className="Banner__wrapper">
        <div className="Banner__truck_icon">
          <TruckSVG />
        </div>
        <div className="Banner__description">
          <h4>{s(content?.delivery?.[0]?.title, { height: "15px" })}</h4>
          <p>{s(content?.delivery?.[0]?.content)}</p>
        </div>
      </div>

      <div className="Banner__wrapper">
        <div className="Banner__safe_icon">
          <SafePurchSVG />
        </div>
        <div className="Banner__description">
          <h4>{s(content?.purchase?.[0]?.title, { height: "15px" })}</h4>
          <p>{s(content?.purchase?.[0]?.content)}</p>
        </div>
      </div>
      <div className="Banner__wrapper">
        <div className="Banner__tire_icon">
          <TireSVG />
        </div>
        <div className="Banner__description">
          <h4>{s(content?.tires?.[0]?.title, { height: "15px" })}</h4>
          <p>{s(content?.tires?.[0]?.content)}</p>
        </div>
      </div>
    </div>
  );
};

function getBannerSkeletonWidthBasedOnScreen(windowWidth: number) {
  if (windowWidth < 321) {
    return "30px";
  }
  if (windowWidth < 376) {
    return "50px";
  }
  if (windowWidth < 415) {
    return "60px";
  }
  if (windowWidth < 615) {
    return "100px";
  }
  return "150px";
}
