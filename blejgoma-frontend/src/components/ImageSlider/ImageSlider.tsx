import React from "react";
import Slider from "react-slick";
import cs from "classnames";

import { useSkeleton } from "../../lib/hooks/useSkeleton";
import { useGetAdSliderContentQuery } from "../../graphql/generated/generated";

import "./ImageSlider.scss";

interface Props {
  className?: string;
}
export const ImageSlider = (props: Props) => {
  const { data, loading } = useGetAdSliderContentQuery();
  const handleLoading = useSkeleton(loading, {
    width: "460px",
    height: "380px",
  });
  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  const ads = data?.generalOptions?.generalOptions?.ads?.adSlider ?? [];

  return (
    <div className={cs("ImageSlider", props.className)}>
      <Slider {...settings}>
        {handleLoading(
          ads.map((ad, index) => (
            <a
              className="ImageSlider__slide"
              key={`ImageSlider-${index}`}
              href={(ad?.link as string) || undefined}
            >
              <img src={ad?.image?.mediaItemUrl || undefined} alt="" />
            </a>
          ))
        )}
      </Slider>
    </div>
  );
};
