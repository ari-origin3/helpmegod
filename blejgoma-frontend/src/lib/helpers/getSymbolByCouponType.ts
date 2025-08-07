import { Maybe } from "graphql/jsutils/Maybe";
import { DiscountTypeEnum } from "../../graphql/generated/generated";

const couponTypes = [
  { type: "FIXED_CART", symbol: "€" },
  { type: "FIXED_PRODUCT", symbol: "€ për copë" },
  { type: "PERCENT", symbol: "%" },
];

export const getSymbolByCouponType = (type: Maybe<DiscountTypeEnum> | undefined) => 
     couponTypes.find((couponObj) => couponObj.type === type)?.symbol || ""; //prettier-ignore
