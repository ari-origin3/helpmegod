import { GetAllFiltersQuery } from "../../graphql/generated/generated";
import { FilterItem } from "../context/ShopContext/ShopContextProvider";
import { mapArrayToSelectOptions } from "./mapArrayToSelectOptions";
import { Option } from "../../components/shared/Select/Select";
import { sortFilterOptions } from "./sortFilterOptions";

export const selectFilterType: any = {
  productCategories: "select",
  productManufacturers: "select",
};

export const transformArrayToFilterOptions = (
  data: GetAllFiltersQuery | undefined
) => {
  if (!data) {
    return;
  }

  const dataKeys = Object.keys(data);

  const transformedData = dataKeys.map((key) => {
    const filterKey = key as keyof GetAllFiltersQuery;
    const dataByFilterKey = data[filterKey] as any;

    const transformedDataByFilterKey = mapArrayToSelectOptions(
      dataByFilterKey?.nodes
    );

    const type = selectFilterType[filterKey] || "checkbox";
    return {
      key: filterKey,
      type: type,
      nodes: transformedDataByFilterKey as Array<Option>,
    };
  });

  return sortFilterOptions(transformedData) as FilterItem[];
};
