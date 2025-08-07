import React from "react";
import { Container } from "reactstrap";
import { Banner } from "../../components/Banner/Banner";
import { ContactForm } from "../../components/ContactForm/ContactForm";
import { ImageSlider } from "../../components/ImageSlider/ImageSlider";

import { useGetContactInfoQuery } from "../../graphql/generated/generated";
import { useSkeleton } from "../../lib/hooks/useSkeleton";

import "./Contact.scss";

export const Contact = () => {
  const { data, loading } = useGetContactInfoQuery();
  const s = useSkeleton(loading, {
    height: "14px",
    width: "200px",
  });

  const emails = data?.generalOptions?.generalOptions?.contact?.emails ?? "";

  const workingHours =
    data?.generalOptions?.generalOptions?.contact?.workingHours ?? "";

  const phoneInformation =
    data?.generalOptions?.generalOptions?.contact?.phoneInformation ?? "";

  return (
    <div className="Contact">
      <Banner />
      <Container>
        <div className="Contact__wrapper">
          <ImageSlider />

          <div className="Contact__info">
            <h4>Na kontaktoni:</h4>
            <div className="Contact__container">
              <div className="Contact__content">
                <div className="Contact__left">
                  {s(<div dangerouslySetInnerHTML={{ __html: emails }} />, {
                    count: 3,
                  })}

                  {s(
                    <div dangerouslySetInnerHTML={{ __html: workingHours }} />
                  )}
                </div>
                <div className="Contact__right">
                  {s(
                    <div
                      dangerouslySetInnerHTML={{ __html: phoneInformation }}
                    />,
                    { count: 4, width: "100%" }
                  )}
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
