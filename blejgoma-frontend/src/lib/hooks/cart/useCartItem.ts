import { useCartContext } from "../../context/CartContext/CartContext";

export const useCartItem = (productId: number) => {
  const { cart } = useCartContext();

  return cart?.contents?.nodes?.find(
    (node) => node?.product?.databaseId === productId
  );
};
