import { CartItem } from "../../../graphql/generated/generated";
import { useCartContext } from "../../context/CartContext/CartContext";

export const useCartItems = () => {
  const { cart } = useCartContext();

  return (cart?.contents?.nodes ? cart.contents.nodes : []) as CartItem[]; //prettier-ignore
};
