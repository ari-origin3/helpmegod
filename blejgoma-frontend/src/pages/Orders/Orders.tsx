import React from "react";
import { Container } from "reactstrap";

import { Banner } from "../../components/Banner/Banner";
import { ProfileOrdersTable } from "../../components/ProfileOrders/ProfileOrdersTable/ProfileOrdersTable";

//style
import "./Orders.scss";

export const Orders = () => {
  return (
    <div className="Orders">
      <Banner />
      <Container>
        <div className="Orders__wrapper">
          <h4 className="Orders__heading">Porositë e mia</h4>
          <ProfileOrdersTable />
        </div>
      </Container>
    </div>
  );
};
