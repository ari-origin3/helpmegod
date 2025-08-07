import React from "react";
import { RouteComponentProps } from "react-router";
import { Container } from "reactstrap";
import { Banner } from "../../components/Banner/Banner";
import { ProfileOrderSingleTable } from "../../components/ProfileOrders/ProfileOrderSingle/ProfileOrderSingleTable";
import { ProfileOrderSingleSummary } from "../../components/ProfileOrders/ProfileOrderSingleSummary/ProfileOrderSingleSummary";
import { LineItem } from "../../graphql/generated/generated";
import {
  OrderDetails,
  useOrderDetails,
} from "../../lib/hooks/checkout/useOrderDetails";
import { useSkeleton } from "../../lib/hooks/useSkeleton";

import "./OrderSingle.scss";

interface Props {
  orderId: string;
}

export const OrderSingle = (props: RouteComponentProps<Props>) => {
  const orderId = props.match.params.orderId;
  const order = useOrderDetails(orderId) as OrderDetails;
  const lineItems = order?.products as LineItem[];
  const loading = order?.loading;
  const shippingPrice = order?.shippingPrice as string;

  const s = useSkeleton(loading, {
    width: "80px",
    style: {
      color: "white",
    },
  });

  return (
    <div className="OrderSingle">
      <Banner />
      <Container>
        <div className="OrderSingle__wrapper">
          <div className="OrderSingle__left">
            <h4 className="OrderSingle__heading">Porosia #{s(order.id)}</h4>
            <div className="OrderSingle__order">
              <ProfileOrderSingleTable
                lineItems={lineItems}
                loading={loading}
                shippingPrice={shippingPrice}
              />
            </div>
          </div>
          <div className="OrderSingle__right">
            <ProfileOrderSingleSummary order={order} />
          </div>
        </div>
      </Container>
    </div>
  );
};
