import { useState } from "react";
import qs from "query-string";

import { FindTiresBySizeInterface } from "../../components/FindTires/FindTiresBySize/FindTiresBySize";
import { useGetTiresByMeasurementsAndSeasonQuery } from "../../graphql/generated/generated";
import { clearEmptyFilterProperties } from "../helpers/clearEmptyFilterProperties";
import { mapArrayToSelectOptions } from "../helpers/mapArrayToSelectOptions";
import { useRouter } from "./useRouter";

export const useFindTiresBySize = (category: string) => {
  const { data, error, loading } = useGetTiresByMeasurementsAndSeasonQuery();
  const widthOptions = mapArrayToSelectOptions(data?.paWidths?.nodes as any[]);
  const heightOptions = mapArrayToSelectOptions(
    data?.paHeights?.nodes as any[]
  );
  const diameterOptions = mapArrayToSelectOptions(
    data?.paDiameters?.nodes as any[]
  );

  const [tireFilters, setTireFilters] = useState<FindTiresBySizeInterface>({
    paDiameters: "",
    paHeights: "",
    paWidths: "",
    paSeasons: "",
  });

  const router = useRouter();

  const handleMeasurementsChange = (
    key: keyof FindTiresBySizeInterface,
    value: string | string[]
  ) => {
    if (!value) {
      clearSelect(key);
    }
    setTireFilters({ ...tireFilters, [key]: value });
  };

  const clearSelect = (key: keyof FindTiresBySizeInterface) => {
    setTireFilters({ ...tireFilters, [key]: "" });
  };

  const findCarTires = () => {
    const clearedFilters = clearEmptyFilterProperties(tireFilters);

    const url = qs.stringify({
      productCategories: category,
      ...clearedFilters,
    });
    router.history.replace(`/shop?${url}`);
  };

  const handleSeasonChange = (
    key: keyof FindTiresBySizeInterface,
    value: string | string[]
  ) => {
    setTireFilters((prevState) => ({
      ...prevState,
      [key]: value === prevState[key] ? "" : value,
    }));
  };

  const handleChange = (
    type: "measurement" | "season",
    key: keyof FindTiresBySizeInterface,
    value: string | string[]
  ) => {
    if (type === "measurement") {
      return handleMeasurementsChange(key, value);
    }

    return handleSeasonChange(key, value);
  };

  return {
    tireFilters,
    handleChange,
    findCarTires,
    widthOptions,
    heightOptions,
    diameterOptions,
    loading,
    error,
  };
};
