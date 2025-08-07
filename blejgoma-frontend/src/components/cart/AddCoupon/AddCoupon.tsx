import React, { useState } from "react";
import cs from "classnames";
import Button from "../../shared/Button/Button";

import {
  GetCartDocument,
  useApplyCouponMutation,
} from "../../../graphql/generated/generated";
import { useToast } from "../../../lib/hooks/useToast";
import { useCartContext } from "../../../lib/context/CartContext/CartContext";

import "./AddCoupon.scss";

export const AddCoupon = () => {
  const [coupon, setCoupon] = useState("");
  const [error, setError] = useState("");

  const { addToast } = useToast();
  const { setIsApplyingCoupon } = useCartContext();

  const [
    applyCouponMutation,
    { loading: applyingCoupon },
  ] = useApplyCouponMutation();

  const handleAddClick = async () => {
    if (!coupon) {
      //TODO:Add notification when there's an error!
      setError("Kodi është i nevojshëm!");
      return;
    }
    try {
      setIsApplyingCoupon(coupon);
      await applyCouponMutation({
        variables: {
          coupon,
        },
        update(cache, { data: { applyCoupon } }: any) {
          cache.writeQuery({
            query: GetCartDocument,
            data: applyCoupon,
          });
        },
      });

      addToast(`Kuponi ${coupon} u shtua me sukses!`, {
        appearance: "success",
      });
      setCoupon("");
      setIsApplyingCoupon("");
    } catch (e) {
      setError("Kuponi nuk u shtua, provoni përseri!");
      setIsApplyingCoupon("");
    }
  };

  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) setError("");
    setCoupon(e.target.value);
  };

  return (
    <div className={cs("AddCoupon", error && "AddCoupon--error")}>
      <input
        className="AddCoupon__input"
        placeholder="Kodi promocional"
        value={coupon}
        onChange={handleCouponChange}
      />
      <Button
        className="AddCoupon__button"
        label="APLIKO"
        onClick={handleAddClick}
        loading={applyingCoupon}
      />
      <p className="AddCoupon__error">{error}</p>
    </div>
  );
};
