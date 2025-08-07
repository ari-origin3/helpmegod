import { SimpleProduct } from "../../graphql/generated/generated";
import { getLoadAndSpeedIndex } from "../helpers/getLoadAndSpeedIndex";
import { getProductAttributes } from "../helpers/getProductAttributes";

export const useProductAttributes = (product: SimpleProduct) => {
  const loadAndSpeedIndex = getLoadAndSpeedIndex(product?.productMetas?.lisi);
  return {
    id: product?.databaseId,
    name: product?.name,
    onSale: product?.onSale,
    price: product?.price,
    regularPrice: product?.regularPrice,
    salePrice: product?.salePrice,
    sku: product?.sku,
    slug: product?.slug,
    stockQuantity: product?.stockQuantity,
    stockStatus: product?.stockStatus,
    ...loadAndSpeedIndex,
    model: product?.productMetas?.model,
    tireSize: getProductAttributes(product),
    euLabel: {
      ...product?.productMetas?.euLabel,
    },
    category: {
      ...product?.productCategories?.nodes?.[0],
    },
    brand: {
      ...product?.productManufacturers?.nodes?.[0],
    },
    diameter: {
      ...product?.paDiameters?.nodes?.[0],
    },
    height: {
      ...product?.paHeights?.nodes?.[0],
    },
    season: {
      ...product?.paSeasons?.nodes?.[0],
    },
    width: {
      ...product?.paWidths?.nodes?.[0],
    },
  };
};
