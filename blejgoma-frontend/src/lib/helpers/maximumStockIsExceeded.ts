import { Maybe } from "graphql/jsutils/Maybe";

export const maximumStockIsExceeded = (
  stock: Maybe<number> | undefined,
  quantity: number,
  quantityInCart?: number
) => {
  if (!quantityInCart || !stock) return false;
  if (stock >= quantityInCart + quantity) return false;
  return true;
};
