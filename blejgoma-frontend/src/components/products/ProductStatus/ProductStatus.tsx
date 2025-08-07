import React from "react";
import cs from "classnames";
import { Maybe } from "graphql/jsutils/Maybe";
import { StockStatusEnum } from "../../../graphql/generated/generated";

import "./ProductStatus.scss";

interface Props {
  stockStatus: Maybe<StockStatusEnum> | undefined;
}
export const ProductStatus = (props: Props) => {
  return (
    <p
      className={cs(
        "ProductStatus",
        props.stockStatus === "OUT_OF_STOCK" && "ProductStatus--out"
      )}
    >
      {props.stockStatus === "IN_STOCK" ? "Në Stok" : "Jashtë Stokut"}
    </p>
  );
};
