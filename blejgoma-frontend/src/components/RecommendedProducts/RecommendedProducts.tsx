import { chunk } from "lodash";
import Skeleton from "react-loading-skeleton";
import Slider from "react-slick";

import {
  SimpleProduct,
  useGetRecommendedProductsQuery,
} from "../../graphql/generated/generated";
import { ProductItem } from "../products/ProductItem/ProductItem";

import "./RecommendedProducts.scss";

export const RecommendedProducts = () => {
  const { data, loading } = useGetRecommendedProductsQuery({
    variables: {
      limit: 4,
    },
  });
  const relatedProducts = data?.products?.nodes as SimpleProduct[];

  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    arrows: false,
  };

  const renderSliderProducts = () => {
    const productsOfTwo = chunk(relatedProducts, 2);
    return productsOfTwo.map((item, index) => {
      return (
        <div key={`RecommendedProducts-${index}`}>
          {item.map((item: SimpleProduct, index) => {
            return (
              <ProductItem
                key={`${item.databaseId}-${index}`}
                product={item}
                selectMenuPlacement={index === 1 ? "top" : undefined}
              />
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="RecommendedProducts">
      <div className="RecommendedProducts__heading">
        <h3>Më të kërkuarat</h3>
      </div>
      {loading ? (
        <Skeleton
          className="RecommendedProducts__skeleton"
          height="159px"
          count={2}
        />
      ) : (
        <Slider {...settings}>{renderSliderProducts()}</Slider>
      )}
    </div>
  );
};
