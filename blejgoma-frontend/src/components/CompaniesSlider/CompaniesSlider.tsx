import React from "react";
import Slider from "react-slick";
import cs from "classnames";
import { Container } from "reactstrap";

import { useRouter } from "../../lib/hooks/useRouter";
import { useGetManufacterersQuery } from "../../graphql/generated/generated";
import { Image } from "../shared/Image/Image";
import { Icon } from "../shared/Icon/Icon";
import { Maybe } from "graphql/jsutils/Maybe";

import "./CompaniesSlider.scss";

export const CompaniesSlider = () => {
  const { data } = useGetManufacterersQuery();
  const router = useRouter();
  const brands = data?.productManufacturers?.nodes ?? [];

  const settings = {
    slidesToShow: 6,
    slidesToScroll: 6,
    nextArrow: <Arrow type="next" />,
    prevArrow: <Arrow type="prev" />,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 5 } },
      { breakpoint: 765, settings: { slidesToShow: 3 } },
    ],
  };

  const handleBrandClickRedirect = (brandSlug?: Maybe<string> | undefined) => {
    if (!brandSlug) return;
    router.history.push("/shop?productManufacturers=" + brandSlug);
  };

  return (
    <Container>
      <div className="CompaniesSlider">
        <Slider {...settings}>
          {brands.map((brand, index) => {
            const imageSrc = brand?.manufacturerOptions?.manufacturerPhoto
              ?.mediaItemUrl as string;
            return (
              <div
                className="CompaniesSlider__slide"
                onClick={() => handleBrandClickRedirect(brand?.slug)}
                key={`CompaniesSlider-${brand?.slug}-${index}`}
              >
                <Image dynamicFit src={imageSrc} />
              </div>
            );
          })}
        </Slider>
      </div>
    </Container>
  );
};

interface ArrowProps {
  className?: string;
  type: "next" | "prev";
  onClick?: () => void;
}

const Arrow = (props: ArrowProps) => (
  <span onClick={props.onClick}>
    <Icon
      className={cs(
        "CompaniesSlider__arrow",
        `CompaniesSlider__arrow--${props.type}`,
        props.className
      )}
      icon="arrow-back"
    />
  </span>
);
