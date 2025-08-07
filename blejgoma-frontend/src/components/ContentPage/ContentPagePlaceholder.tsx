import React from "react";
import { Container } from "reactstrap";
import { ContentPageLoader } from "./ContentPageLoader";

export const ContentPagePlaceholder = () => {
  return (
    <div className="ContentPagePlaceholder d-flex align-items-center justify-content-center">
      <Container>
        <ContentPageLoader />
      </Container>
    </div>
  );
};
