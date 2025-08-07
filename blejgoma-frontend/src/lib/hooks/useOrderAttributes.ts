import { Maybe, Order, SimpleProduct } from "../../graphql/generated/generated";
import { useProductAttributes } from "./useProductAttributes";

export const useOrderAttributes = (order: Maybe<Order>) => {
  return {
    id: order?.databaseId,
    date: order?.date,
    currency: order?.currency,
    orderNumber: order?.orderNumber,
    status: order?.status,
    shippingTotal: order?.shippingTotal,
    total: order?.total,
    products: { ...order?.lineItems?.nodes },
  };
};
