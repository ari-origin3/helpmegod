import { ApolloError } from "@apollo/client";
import React, { useContext } from "react";
import { Option } from "../../../components/shared/Select/Select";
import { ProductFilters } from "./ShopContextProvider";

export interface ShopContextType {
  filters?: ProductFilters;
  error?: ApolloError;
  handleCheckboxFilterChange: (
    key: keyof ProductFilters,
    value: string
  ) => void;
  handleSelectFilterChange: (
    key: keyof ProductFilters,
    value: Option[] | null
  ) => void;
}

const ShopContextValues: ShopContextType = {
  filters: undefined,
  error: undefined,
  handleCheckboxFilterChange: () => {},
  handleSelectFilterChange: () => {},
};

export const ShopContext = React.createContext<ShopContextType>(
  ShopContextValues
);

export const useShopContext = () => useContext(ShopContext);
