import React from "react";
import cs from "classnames";
import { Maybe } from "graphql/jsutils/Maybe";

import "./ProductPrice.scss";

interface Props {
  onSale: Maybe<boolean> | undefined;
  salePrice: Maybe<string> | undefined;
  regularPrice: Maybe<string> | undefined;
}
export const ProductPrice = (props: Props) => {
  return (
    <span className="ProductPrice">
      <h5 className="ProductPrice__sale">
        {props.onSale ? props.salePrice : props.regularPrice}
      </h5>
      <h5
        className={cs(
          "ProductPrice__regular",
          props.onSale && "ProductPrice__regular--sale"
        )}
      >
        {props.onSale ? props.regularPrice : props.salePrice}
      </h5>
    </span>
  );
};
