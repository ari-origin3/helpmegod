import React from "react";
import { Redirect } from "react-router";
import { Container } from "reactstrap";
import { Banner } from "../../components/Banner/Banner";

import { CheckoutWizardForm } from "../../components/checkout/CheckoutWizardForm";
import { useCartContext } from "../../lib/context/CartContext/CartContext";

import "./Checkout.scss";

export const Checkout = () => {
  const cartCtx = useCartContext();

  if (cartCtx?.cart?.isEmpty) {
    return <Redirect to="/cart" />;
  }
  return (
    <div className="Checkout">
      <Banner />
      <Container>
        <CheckoutWizardForm />
      </Container>
    </div>
  );
};
