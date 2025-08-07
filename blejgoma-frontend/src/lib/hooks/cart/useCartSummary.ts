import { useCartContext } from "../../context/CartContext/CartContext";

export const useCartSummary = () => {
  const { cart } = useCartContext();
  return {
    totalItems: cart?.contents?.itemCount || null,
    shippingPrice: cart?.shippingTotal || "",
    subTotal: cart?.subtotal || "",
    discount: cart?.discountTotal,
    total: cart?.total || "",
  };
};
