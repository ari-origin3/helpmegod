import React from "react";
import { Container } from "reactstrap";
import { Banner } from "../../components/Banner/Banner";
import { WishListProductsTable } from "../../components/wishlist/WishListProductsTable";

//styles
import "./Wishlist.scss";

export const Wishlist = () => {
  return (
    <div className="Wishlist">
      <Banner />
      <Container>
        <div className="Wishlist__items_wrapper">
          <h4 className="Wishlist__heading">Lista e deshirave</h4>
          <div className="Wishlist__items">
            <WishListProductsTable />
          </div>
        </div>
      </Container>
    </div>
  );
};
