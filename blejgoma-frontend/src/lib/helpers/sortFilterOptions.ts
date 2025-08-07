import { FilterItem } from "../context/ShopContext/ShopContextProvider";

interface FiltersWithOrdersInterface {
  productManufacturers: FilterWithOrderType;
  paWidths: FilterWithOrderType;
  paHeights: FilterWithOrderType;
  paDiameters: FilterWithOrderType;
  paSeasons: FilterWithOrderType;
  productCategories: FilterWithOrderType;
}

interface FilterWithOrderType {
  key: string;
  order: number;
}

const filtersWithOrder = {
  productManufacturers: { key: "productManufacturers", order: 6 },
  paWidths: { key: "paWidths", order: 2 },
  paHeights: { key: "paHeights", order: 3 },
  paDiameters: { key: "paDiameters", order: 4 },
  paSeasons: { key: "paSeasons", order: 5 },
  productCategories: { key: "productCategories", order: 1 },
};
export const sortFilterOptions = (data: FilterItem[]) => {
  return data.sort((first, second) => {
    const firstItemKey = first.key as keyof FiltersWithOrdersInterface;
    const secondItemKey = second.key as keyof FiltersWithOrdersInterface;
    return filtersWithOrder[firstItemKey]?.order >
      filtersWithOrder[secondItemKey]?.order
      ? 1
      : -1;
  });
};
