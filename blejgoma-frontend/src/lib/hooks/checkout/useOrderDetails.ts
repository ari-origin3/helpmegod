import { Maybe } from "graphql/jsutils/Maybe";
import {
  CustomerAddress,
  LineItem,
  OrderStatusEnum,
  Scalars,
  useGetOrderByIdQuery,
} from "../../../graphql/generated/generated";

export interface OrderDetails {
  id: Maybe<number>;
  status: Maybe<OrderStatusEnum>;
  products: Maybe<Array<Maybe<LineItem>>>;
  date: string;
  paymentMethod: {
    label: Maybe<string> | undefined;
    value: Maybe<string> | undefined;
  };
  subTotal: Maybe<string> | undefined;
  total: Maybe<string> | undefined;
  billingInfo: Maybe<CustomerAddress>;
  shippingInfo: Maybe<CustomerAddress>;
  shippingPrice: Maybe<Scalars["String"]>;
  loading: boolean;
  error: Maybe<string> | undefined;
}

export const useOrderDetails = (id: string) => {
  const { data, loading, error } = useGetOrderByIdQuery({
    variables: {
      id,
    },
  });

  const formatedDate = new Date(`${data?.order?.date}`).toLocaleString();

  return {
    id: data?.order?.databaseId,
    status: data?.order?.status,
    products: data?.order?.lineItems?.nodes,
    date: formatedDate,
    paymentMethod: {
      label: data?.order?.paymentMethod,
      value: data?.order?.paymentMethodTitle,
    },
    subTotal: data?.order?.subtotal,
    total: data?.order?.total,
    billingInfo: data?.order?.billing,
    shippingInfo: data?.order?.shipping,
    shippingPrice: data?.order?.shippingTotal,
    loading,
    error,
  };
};
