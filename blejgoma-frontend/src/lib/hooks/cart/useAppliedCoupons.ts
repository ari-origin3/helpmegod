import { Coupon } from "../../../graphql/generated/generated";
import { useCartContext } from "../../context/CartContext/CartContext";

export const useAppliedCoupons = () => {
  const { cart } = useCartContext();
  return (cart?.appliedCoupons?.nodes ?? []) as Coupon[];
};
