import React, { useState } from "react";
import { Container } from "reactstrap";
import { Banner } from "../../components/Banner/Banner";
import FaqItem from "../../components/FaqItem/FaqItem";
import { ImageSlider } from "../../components/ImageSlider/ImageSlider";
import { useGetFaqQuery } from "../../graphql/generated/generated";
import { useSkeleton } from "../../lib/hooks/useSkeleton";

import "./Faq.scss";

export const Faq = () => {
  const { data, loading } = useGetFaqQuery();
  const [activeTab, setActiveTab] = useState("");

  const s = useSkeleton(loading, {
    height: "58px",
    width: "100%",
    count: 5,
  });

  return (
    <div className="Faq">
      <Banner />
      <Container>
        <div className="Faq__content">
          <ImageSlider />
          <div className="Faq__list">
            <h4 className="Faq__heading">Pyetjet më të shpeshta</h4>
            {s(
              data?.generalOptions?.generalOptions?.faq?.list?.map(
                (item, index) => {
                  return (
                    <FaqItem
                      title={item?.title as string}
                      content={item?.description as string}
                      activeTab={activeTab}
                      itemID={`faq_item_${item?.title}`}
                      key={`${item?.title}-faq-listing`}
                      onClick={(id: string) => setActiveTab(id)}
                    />
                  );
                }
              )
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
