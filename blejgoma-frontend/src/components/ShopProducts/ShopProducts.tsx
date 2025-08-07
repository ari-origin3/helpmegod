import React, { useEffect, useState } from "react";
import queryString from "query-string";
import useInfiniteScroll from "react-infinite-scroll-hook";

import {
  SimpleProduct,
  useGetShopProductsQuery,
} from "../../graphql/generated/generated";
import { useRouter } from "../../lib/hooks/useRouter";
import { useSkeleton } from "../../lib/hooks/useSkeleton";
import { useToast } from "../../lib/hooks/useToast";

import { ProductItem } from "../products/ProductItem/ProductItem";
import { ApolloErrorGuard } from "../shared/ApolloErrorGuard/ApolloErrorGuard";
import { InfoPlaceholder } from "../shared/InfoPlaceholder/InfoPlaceholder";

//styles
import "./ShopProducts.scss";
import { Spinner } from "reactstrap";
import { useScrollToTop } from "../../lib/hooks/useScrollToTop";
import { ScrollToTopWrapper } from "../shared/ScrollToTopWrapper/ScrollToTopWrapper";

const taxonomyFilters = {
  paDiameters: "PADIAMETER",
  paHeights: "PAHEIGHT",
  paWidths: "PAWIDTH",
  paSeasons: "PASEASON",
  productManufacturers: "PRODUCTMANUFACTURER",
  productCategories: "PRODUCTCATEGORY",
};

const PRODUCTS_LIMIT = 8;

export const ShopProducts = () => {
  const router = useRouter();
  const { addToast } = useToast();
  useScrollToTop();

  const queryParams = queryString.parse(router.location.search);
  const taxonomyDataFromUrl = Object.keys(queryParams).map((key) => ({
    key,
    value: queryParams[key],
  }));
  const taxonomyFilters = prepareTaxonomyFiltersData(taxonomyDataFromUrl);

  const { data, loading, error, fetchMore } = useGetShopProductsQuery({
    variables: {
      limit: PRODUCTS_LIMIT,
      taxonomyFilterInput: taxonomyFilters,
    },
  });

  const [isloadingMore, setIsLoadingMore] = useState(false);
  const endCursor = data?.products?.pageInfo?.endCursor;
  const hasMore = data?.products?.pageInfo?.hasNextPage;

  useEffect(() => {
    if (error) {
      addToast("Problem gjatë marrjes së produkteve!", { appearance: "error" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    fetchMore({
      variables: {
        limit: PRODUCTS_LIMIT,
        after: endCursor,
      },
      updateQuery: (previousData: any, { fetchMoreResult }: any) => {
        if (!fetchMoreResult?.products?.nodes?.length) return previousData;
        setIsLoadingMore(false);
        return {
          products: {
            __typename: previousData?.products?.__typename,
            nodes: [
              ...previousData?.products?.nodes,
              ...fetchMoreResult.products.nodes,
            ],
            pageInfo: {
              ...previousData?.products?.pageInfo,
              endCursor: fetchMoreResult.products?.pageInfo?.endCursor,
              hasNextPage: fetchMoreResult.products?.pageInfo?.hasNextPage,
            },
          },
        };
      },
    });
  };

  const [sentryRef] = useInfiniteScroll({
    loading: isloadingMore,
    hasNextPage: hasMore as boolean,
    onLoadMore: handleLoadMore,
    disabled: !!error,
    rootMargin: "0px 0px 400px 0px",
  });

  const skeleton = useSkeleton(loading, { height: "159px", count: 5 });
  const products = data?.products?.nodes as SimpleProduct[];
  const noData = !loading && products?.length === 0;
  return (
    <ScrollToTopWrapper>
      <div className="ShopProducts">
        <h5 className="ShopProducts__heading">TË GJITHA PRODUKTET</h5>
        <div className="ShopProducts__products">
          <ApolloErrorGuard
            error={error}
            errorComponent={
              <InfoPlaceholder
                icon="logo"
                type="error"
                text="Error gjate marrjes se produkteve!"
              />
            }
          >
            {noData ? (
              <InfoPlaceholder
                icon="blank"
                text="Nuk është gjetur asnjë produkt!"
              />
            ) : (
              skeleton(
                products?.map((product, index) => (
                  <ProductItem
                    key={`${product.id}-${index}`}
                    product={product}
                  />
                ))
              )
            )}

            <div className="ShopProducts__spinner" ref={sentryRef}>
              {isloadingMore && <Spinner />}
            </div>
          </ApolloErrorGuard>
        </div>
      </div>
    </ScrollToTopWrapper>
  );
};

function prepareTaxonomyFiltersData(data: any) {
  return data.map((obj: any) => {
    const key = obj.key as keyof typeof taxonomyFilters;
    const value = obj.value as string;
    return {
      taxonomy: taxonomyFilters[key],
      operator: "IN",
      terms: value.split(","),
    };
  });
}
