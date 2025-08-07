import React from "react";
import cs from "classnames";
import { Container } from "reactstrap";

import { useSkeleton } from "../../lib/hooks/useSkeleton";
import { useGetBannerAdQuery } from "../../graphql/generated/generated";

import "./BannerAd.scss";

interface Props {
  className?: string;
}

export const BannerAd = (props: Props) => {
  const { data, loading } = useGetBannerAdQuery();
  const skeleton = useSkeleton(loading, { width: "100%", height: "110px" });

  const adImg =
    data?.generalOptions?.generalOptions?.ads?.adBanner?.image?.mediaItemUrl ??
    "";
  return (
    <div className={cs("BannerAd", props.className)}>
      {skeleton(
        <Container>
          <img src={adImg} alt="banner-ad" />
        </Container>
      )}
    </div>
  );
};
