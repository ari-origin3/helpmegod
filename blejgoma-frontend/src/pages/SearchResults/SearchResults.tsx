import { useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { Container, Spinner } from "reactstrap";

import { ProductItem } from "../../components/products/ProductItem/ProductItem";
import { ApolloErrorGuard } from "../../components/shared/ApolloErrorGuard/ApolloErrorGuard";
import { InfoPlaceholder } from "../../components/shared/InfoPlaceholder/InfoPlaceholder";
import {
  SimpleProduct,
  useGetSearchResulstsQuery,
} from "../../graphql/generated/generated";
import { useRouter } from "../../lib/hooks/useRouter";
import { useSkeleton } from "../../lib/hooks/useSkeleton";
import "./SearchResults.scss";

const PRODUCTS_LIMIT = 8;

export const SearchResults = () => {
  const router = useRouter();
  const searchValue = router.query.value as string;

  const { data, loading, error, fetchMore } = useGetSearchResulstsQuery({
    variables: {
      limit: PRODUCTS_LIMIT,
      term: searchValue,
    },
  });

  const [isloadingMore, setIsLoadingMore] = useState(false);
  const endCursor = data?.products?.pageInfo?.endCursor;
  const hasMore = data?.products?.pageInfo?.hasNextPage;

  const skeleton = useSkeleton(loading, {
    height: "159px",
    width: "100%",
    count: 5,
  });
  const [sentryRef] = useInfiniteScroll({
    loading: isloadingMore,
    hasNextPage: hasMore as boolean,
    onLoadMore: handleLoadMore,
    disabled: !!error,
    rootMargin: "0px 0px 100px 0px",
  });
  function handleLoadMore() {
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
  }

  const products = (data?.products?.nodes ?? []) as SimpleProduct[];
  const noData = !loading && products?.length === 0;

  return (
    <div className="SearchResults">
      <Container>
        <h4 className="SearchResults__heading">
          Rezultatet e kërkimit për: <span>{searchValue}</span>
        </h4>
        <ApolloErrorGuard
          error={error}
          errorComponent={
            <InfoPlaceholder
              icon="logo"
              type="error"
              text="Gabim gjatë marrjes se produkteve nga databaza!"
            />
          }
        >
          <div className="SearchResults__products_list">
            {noData ? (
              <InfoPlaceholder
                icon="blank"
                text="Nuk është gjetur asnjë produkt!"
              />
            ) : (
              skeleton(
                products.map((product, index) => (
                  <ProductItem
                    key={`${product.id}-${index}`}
                    product={product}
                  />
                ))
              )
            )}
            <div className="SearchResults__spinner" ref={sentryRef}>
              {isloadingMore && <Spinner />}
            </div>
          </div>
        </ApolloErrorGuard>
      </Container>
    </div>
  );
};
