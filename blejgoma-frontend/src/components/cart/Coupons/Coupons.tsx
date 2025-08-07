import React from "react";
import cs from "classnames";
import { Icon } from "../../shared/Icon/Icon";
import { useAppliedCoupons } from "../../../lib/hooks/cart/useAppliedCoupons";
import { getSymbolByCouponType } from "../../../lib/helpers/getSymbolByCouponType";
import { Maybe } from "graphql/jsutils/Maybe";
import {
  GetCartDocument,
  useRemoveCouponMutation,
} from "../../../graphql/generated/generated";

import "./Coupons.scss";
import { useCartContext } from "../../../lib/context/CartContext/CartContext";
import { Spinner } from "reactstrap";
import { useToast } from "../../../lib/hooks/useToast";

interface Props {
  className?: string;
}
export const Coupons = (props: Props) => {
  const { isRemovingCoupon, setIsRemovingCoupon } = useCartContext();
  const coupons = useAppliedCoupons();
  const { addToast } = useToast();
  const [removeCouponMutation] = useRemoveCouponMutation();

  const handleRemoveCouponClick = async (code: Maybe<string> | undefined) => {
    const couponCode = code as string;

    try {
      setIsRemovingCoupon(couponCode);
      await removeCouponMutation({
        variables: {
          coupon: couponCode,
        },
        update(cache, { data: { removeCoupons } }: any) {
          cache.writeQuery({
            query: GetCartDocument,
            data: removeCoupons,
          });
        },
      });
      setIsRemovingCoupon("");
      addToast(`Kuponi ${couponCode} u fshi me sukses!`, {
        appearance: "success",
      });
    } catch (e) {
      setIsRemovingCoupon("");
      addToast(`Error gjatë fshirjes se kuponit!`, { appearance: "error" });
    }
  };

  return (
    <div className={cs("Coupons", props.className)}>
      {coupons.map((coupon, index) => {
        const couponSymbol = getSymbolByCouponType(coupon.discountType);

        return (
          <div className="Coupons__item" key={`Coupon--${index}`}>
            <p>
              {coupon.code} - <span>{`${coupon.amount}${couponSymbol}`}</span>
            </p>
            <div
              className="Coupons__remove_icon"
              onClick={() => handleRemoveCouponClick(coupon.code)}
            >
              {isRemovingCoupon === coupon.code ? (
                <Spinner size="sm" />
              ) : (
                <Icon icon="close" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
