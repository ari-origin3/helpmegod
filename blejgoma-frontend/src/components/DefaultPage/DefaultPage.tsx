import React from "react";
import { Container } from "reactstrap";

import { Maybe } from "../../graphql/generated/generated";
import { ImageSlider } from "../ImageSlider/ImageSlider";
import { Banner } from "../Banner/Banner";
import { useSkeleton } from "../../lib/hooks/useSkeleton";

import "./DefaultPage.scss";
interface Props {
  title?: Maybe<string>;
  content?: Maybe<string>;
  excerpt?: string;
  srcSet?: string;
  featuredImage?: string;
  loading?: boolean;
}

export const DefaultPage = (props: Props) => {
  const s = useSkeleton(props.loading);

  return (
    <div className="DefaultPage">
      <Banner />
      <Container>
        <div className="DefaultPage__wrapper">
          {s(<ImageSlider />, { width: "460px", height: "380px" })}

          <div className="DefaultPage__right">
            <h4 className="DefaultPage__heading">
              {s(props.title, {
                width: "100px",
              })}
            </h4>
            <div className="DefaultPage__content">
              {s(
                <div
                  dangerouslySetInnerHTML={{
                    __html: props.content as string,
                  }}
                />,
                { count: 16 }
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
