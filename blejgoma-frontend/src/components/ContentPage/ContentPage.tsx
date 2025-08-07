import React from "react";

import { DefaultPage } from "../DefaultPage/DefaultPage";
import { useGetPageByIdQuery } from "../../graphql/generated/generated";

interface Props {
  id: number;
}

export const ContentPage = (props: Props) => {
  const { data, loading } = useGetPageByIdQuery({
    variables: {
      id: props.id,
    },
  });
  const content = data?.pages?.nodes?.[0];

  return (
    <DefaultPage
      title={content?.title}
      content={content?.pageFields?.albanianContent}
      loading={loading}
    />
  );
};
