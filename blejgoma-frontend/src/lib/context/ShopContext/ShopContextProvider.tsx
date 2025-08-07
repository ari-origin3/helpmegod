import React, { useEffect, useState } from "react";
import { GetAllFiltersQuery } from "../../../graphql/generated/generated";
import { useQueryParameters } from "../../hooks/useQueryParameters";
import { useRouter } from "../../hooks/useRouter";
import { ShopContext, ShopContextType } from "./ShopContext";
import { Option } from "../../../components/shared/Select/Select";

import _ from "lodash";

interface ShopContextProviderProps {
  children: React.ReactNode | null;
}

export interface ProductFilters {
  paDiameters: string[];
  paHeights: string[];
  paWidths: string[];
  paSeasons: string[];
  productManufacturers: string[];
  productCategories: string[];
}

export type FilterItem = {
  key: keyof GetAllFiltersQuery;
  type: "select" | "checkbox";
  nodes: Array<Option>;
};

export type Filters = {
  [key in keyof GetAllFiltersQuery]: FilterItem;
};

export const ShopContextProvider = (props: ShopContextProviderProps) => {
  const [filters, setFilters] = useState<ProductFilters>({
    paDiameters: [],
    paHeights: [],
    paWidths: [],
    paSeasons: [],
    productManufacturers: [],
    productCategories: [],
  });

  const { history, query } = useRouter<{
    categories: string[];
    brands: string[];
    widths: string[];
    seasons: string[];
    heights: string[];
    diameters: string[];
  }>();
  const { getUrlWithQueryParams } = useQueryParameters();

  useEffect(() => {
    if (!Object.values(filters).some((it) => it.length)) {
      setFiltersFromUrl();
      return;
    }
    handleQueryParamsChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleCheckboxFilterChange = (
    key: keyof ProductFilters,
    value: string
  ) => {
    if (!value) {
      return;
    }
    let arrayOfKey = filters[key];

    setFilters({
      ...filters,
      [key]:
        arrayOfKey && arrayOfKey.includes(value)
          ? arrayOfKey.filter((x) => x !== value)
          : [...arrayOfKey, value],
    });
  };

  const handleSelectFilterChange = (
    key: keyof ProductFilters,
    value: Option[] | null
  ) => {
    if (!value || value.length === 0) {
      setFilters({ ...filters, [key]: [] });
      return;
    }
    const valueArr = value.map((item) => item.value) as string[];

    setFilters({ ...filters, [key]: valueArr });
  };

  const handleQueryParamsChange = () => {
    const url = getUrlWithQueryParams({
      ...filters,
    });
    history.push(url);
  };

  const setFiltersFromUrl = () => {
    if (_.isEmpty(query)) {
      return;
    }

    const categories = query?.productCategories?.split(",") || [];
    const manufacturers = query?.productManufacturers?.split(",") || [];
    const widths = query?.paWidths?.split(",") || [];
    const heights = query?.paHeights?.split(",") || [];
    const diameters = query?.paDiameters?.split(",") || [];
    const seasons = [query?.paSeasons];

    setFilters({
      ...filters,
      productCategories: categories,
      productManufacturers: manufacturers,
      paWidths: widths,
      paHeights: heights,
      paSeasons: seasons,
      paDiameters: diameters,
    });
  };

  const context: ShopContextType = {
    filters: filters,
    handleCheckboxFilterChange: handleCheckboxFilterChange,
    handleSelectFilterChange: handleSelectFilterChange,
  };
  return (
    <ShopContext.Provider value={context}>
      {props.children}
    </ShopContext.Provider>
  );
};
