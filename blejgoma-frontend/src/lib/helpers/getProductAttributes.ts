import { SimpleProduct } from "../../graphql/generated/generated";

export const getProductAttributes = (product: SimpleProduct) => {
  const width = product?.paWidths?.nodes?.[0]?.name;
  const height = product?.paHeights?.nodes?.[0]?.name;
  const diameter = product?.paDiameters?.nodes?.[0]?.name;
  const weightAndSpeedIndex = product?.productMetas?.lisi;

  if (!width && !height && !diameter && !weightAndSpeedIndex) return undefined;

  return `${width || ""}/${height || ""} R${diameter || ""} ${
    weightAndSpeedIndex || ""
  }`;
};
