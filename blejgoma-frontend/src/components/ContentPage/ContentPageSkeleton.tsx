import React from "react";
import Skeleton from "react-loading-skeleton";
import { Container } from "reactstrap";
export const ContentPageSkeleton = () => {
  return (
    <div>
      <div className="DefaultPage__banner">
        <Skeleton />
      </div>
      <Container>
        <div className="AboutUs__wrapper">
          <div>
            <Skeleton />
          </div>

          <div>
            <div className="DefaultPage__heading">
              <h4>
                <Skeleton />
              </h4>
            </div>

            <div className="DefaultPage__content">
              <p>
                <Skeleton width="100%" />
              </p>
              <p>
                <Skeleton width="100%" />
              </p>
              <p>
                <Skeleton width="100%" />
              </p>
              <p>
                <Skeleton width="100%" />
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
