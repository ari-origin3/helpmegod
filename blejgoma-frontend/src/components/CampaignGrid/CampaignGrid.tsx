import React from "react";
import { Maybe } from "graphql/jsutils/Maybe";

import { useRouter } from "../../lib/hooks/useRouter";
import { useGetCategoryCampaignGridQuery } from "../../graphql/generated/generated";

import { Image } from "../shared/Image/Image";
import { BulkLoader } from "../shared/BulkLoader/BulkLoader";
import { CampaignGridLoader } from "./CampaignGridLoader";
import { HandleLoadingState } from "../HandleLoadingState/HandleLoadingState";
import Skeleton from "react-loading-skeleton";
import "./CampaignGrid.scss";

export const CamapignGrid = () => {
  const { data, loading } = useGetCategoryCampaignGridQuery();
  const router = useRouter();

  const handleGridItemClick = (slug: Maybe<string> | undefined) => {
    if (!slug) return;
    router.history.push("/shop?productCategories=" + slug);
  };

  const content = data?.productCategories?.nodes;
  return (
    <div className="CampaignGrid container">
      <HandleLoadingState
        loadingPlaceholder={
          <>
            <CampaignGridLoader className="CampaignGrid__loading_placeholders--big" />
            <BulkLoader
              length={4}
              component={Skeleton}
              className="CampaignGrid__loading_placeholders--item"
            />
          </>
        }
        loading={loading}
      >
        {content?.map((category, idx) => (
          <div
            onClick={() => handleGridItemClick(category?.slug)}
            className="CampaignGrid__item"
            key={`${category?.slug} + ${idx}`}
          >
            <div className="CampaignGrid__overlay" />
            <Image
              className="CampaignGrid__image"
              src={category?.image?.mediaItemUrl as string}
              alt=""
            />
            <p className="CampaignGrid__title">{category?.name}</p>
          </div>
        ))}
      </HandleLoadingState>
    </div>
  );
};
