import React, { useEffect, useState } from "react";
import { Cart, useGetCartQuery } from "../../../graphql/generated/generated";
import { useAuthContext } from "../AuthContext/AuthContext";
import { CartContext, CartContextType } from "./CartContext";
interface CartContextProviderProps {
  children: React.ReactNode | null;
}

export const CartContextProvider = (props: CartContextProviderProps) => {
  const { isAuthenticated } = useAuthContext();
  const { data, refetch, loading: isLoading } = useGetCartQuery();

  const [isUpdating, setIsUpdating] = useState("");
  const [isDeleting, setIsDeleting] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState("");
  const [isRemovingCoupon, setIsRemovingCoupon] = useState("");

  const cart = data?.cart as Cart;

  useEffect(() => {
    refetch();
  }, [refetch, isAuthenticated]);

  const contextValues: CartContextType = {
    cart,
    isLoading,
    isUpdating,
    setIsUpdating,
    isDeleting,
    setIsDeleting,
    isApplyingCoupon,
    setIsApplyingCoupon,
    isRemovingCoupon,
    setIsRemovingCoupon,
    refetch,
  };

  // if (isLoading) {
  //   return <AppLoader />;
  // }

  return (
    <CartContext.Provider value={contextValues}>
      {props.children}
    </CartContext.Provider>
  );
};
