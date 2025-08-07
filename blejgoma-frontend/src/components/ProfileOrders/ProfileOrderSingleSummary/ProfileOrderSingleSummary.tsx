import React from "react";
import { OrderDetails } from "../../../lib/hooks/checkout/useOrderDetails";
import { useSkeleton } from "../../../lib/hooks/useSkeleton";
import {
  CartSummary,
  SummaryRowType,
} from "../../cart/CartSummary/CartSummary";

interface Props {
  order: OrderDetails;
}

export const ProfileOrderSingleSummary = (props: Props) => {
  const { order } = props;
  const loading = order.loading;
  const s = useSkeleton(loading, {
    width: "80px",
    style: {
      color: "white",
    },
  });

  const summaryItems: SummaryRowType[] = [
    {
      label: "Shuma e përfshirë",
      value: <span>{s(order.subTotal)}</span>,
    },
    {
      label: "Çmimi per transport",
      value: <span>{s(order.shippingPrice)}</span>,
    },
    {
      label: "Data",
      value: <span>{s(order.date, { width: "150px" })}</span>,
    },
    {
      label: "Statusi",
      value: <span>{s(order.status)}</span>,
    },
    {
      label: "Metoda e pagesës",

      value: (
        <div className="OrderSummary--break">
          {s(order.paymentMethod.value)}
        </div>
      ),
    },
    {
      label: "Adresa e faturimit",
      value: (
        <div className="OrderSummary--break">
          {s(
            <p>{`${order.shippingInfo?.firstName} ${order.shippingInfo?.lastName}`}</p>,
            { width: "150px" }
          )}

          <p>{s(order.billingInfo?.phone)}</p>
          <p>{s(order.billingInfo?.email)}</p>
          {s(
            <p>{`${order.shippingInfo?.address1}, ${order.shippingInfo?.city}`}</p>,
            { width: "150px" }
          )}
        </div>
      ),
    },
    {
      label: "TOTALI",
      value: <span>{s(order.total)}</span>,
      big: true,
    },
  ];

  return (
    <div className="ProfileOrderSingleSummary">
      <CartSummary data={summaryItems} />
    </div>
  );
};
