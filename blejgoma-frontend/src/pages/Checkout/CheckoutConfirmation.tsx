import React from "react";
import { RouteComponentProps } from "react-router";
import { Container } from "reactstrap";
import { Banner } from "../../components/Banner/Banner";
import {
  CartSummary,
  SummaryRowType,
} from "../../components/cart/CartSummary/CartSummary";
import { CheckoutTable } from "../../components/checkout/CheckoutTable";
import { Icon } from "../../components/shared/Icon/Icon";
import { useOrderDetails } from "../../lib/hooks/checkout/useOrderDetails";
import { useSkeleton } from "../../lib/hooks/useSkeleton";

import "./CheckoutConfirmation.scss";

interface Props {
  orderId: string;
}
export const CheckoutConfirmation = (props: RouteComponentProps<Props>) => {
  const orderId = props.match.params.orderId;

  const order = useOrderDetails(orderId);

  const s = useSkeleton(order.loading, { width: "50px" });

  const tableData: SummaryRowType[] = [
    { label: "Shuma e përfshirë", value: <span>{s(order.subTotal)}</span> },
    {
      label: "Çmimi për transport",
      value: <span>{s(order.shippingPrice)}</span>,
    },
    {
      label: "Koha e dërgesës",
      value: (
        <div className="CheckoutConfirmation--break">48h pas konfirmimit</div>
      ),
    },
    {
      label: "Metoda e pageses",
      value: (
        <div className="CheckoutConfirmation--break">
          {s(order.paymentMethod.value)}
        </div>
      ),
    },
    {
      label: "Adresa e faturimit",
      value: (
        <div className="CheckoutConfirmation--break">
          <p>
            {s(
              `${order?.billingInfo?.firstName} ${order.billingInfo?.lastName}`
            )}
          </p>
          <p>{s(order.billingInfo?.phone)}</p>
          <p>{s(order.billingInfo?.email)}</p>
          <p>
            {s(`${order.billingInfo?.address1}, ${order.billingInfo?.city}`)}
          </p>
        </div>
      ),
    },
    {
      label: "Duke përfshirë zbritjen",
      value: <span>{s(order.total)}</span>,
      highlight: true,
    },
    {
      label: "TOTAL",
      value: <span>{s(order.total)}</span>,
      big: true,
    },
  ];

  return (
    <div className="CheckoutConfirmation">
      <Banner />
      <Container>
        <div className="CheckoutConfirmation__wrapper">
          <div className="CheckoutConfirmation__left">
            <h4 className="CheckoutConfirmation__heading">
              Detajet e porosisë
            </h4>
            <div className="CheckoutConfirmation__order_details">
              <p className="CheckoutConfirmation__detail">
                POROSIA: <span>{s(order.id)}</span>
              </p>
              <p className="CheckoutConfirmation__detail">
                STATUSI: <span>{s(order.status)}</span>
              </p>
              <p className="CheckoutConfirmation__detail">
                DATA E POROSISË: <span>{s(order.date)}</span>
              </p>

              <div className="CheckoutConfirmation__status">

                {/* cana here  */}
                {order.status === "FAILED" ? (
                  <>
                    <Icon icon="x-icon" />
                    <p className="CheckoutConfirmation__detail">
                      Porosia nuk është realizuar me sukses. Ju lutem provoni
                      përsëri!
                    </p>
                  </>
                ) : (
                  <>
                    <Icon icon="checked" />
                    <p className="CheckoutConfirmation__detail">
                      Porosia është realizuar me sukses!
                    </p>
                  </>
                )}
              </div>
            </div>
            <CheckoutTable products={order.products} loading={order.loading} />
          </div>
          <div className="CheckoutConfirmation__right">
            <CartSummary data={tableData} />
          </div>
        </div>
      </Container>
    </div>
  );
};
