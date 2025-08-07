import React, { useContext } from "react";
import { Cart } from "../../../graphql/generated/generated";

export interface CartContextType {
  cart: Cart;
  isLoading: boolean;
  isUpdating: string;
  setIsUpdating: React.Dispatch<React.SetStateAction<string>>;
  isDeleting: string;
  setIsDeleting: React.Dispatch<React.SetStateAction<string>>;
  isRemovingCoupon: string;
  setIsRemovingCoupon: React.Dispatch<React.SetStateAction<string>>;
  isApplyingCoupon: string;
  setIsApplyingCoupon: React.Dispatch<React.SetStateAction<string>>;
  refetch: any;
}

const CartContextValues: CartContextType = {
  cart: {},
  isLoading: false,
  isUpdating: "",
  setIsUpdating: () => {},
  isDeleting: "",
  setIsDeleting: () => {},
  isApplyingCoupon: "",
  setIsApplyingCoupon: () => {},
  isRemovingCoupon: "",
  setIsRemovingCoupon: () => {},
  refetch: () => {},
};
export const CartContext = React.createContext<CartContextType>(
  CartContextValues
);
export const useCartContext = () => useContext(CartContext);
