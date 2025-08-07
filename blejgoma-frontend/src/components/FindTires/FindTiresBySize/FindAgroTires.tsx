import React from "react";
import { useFindTiresBySize } from "../../../lib/hooks/useFindTiresBySize";
import Button from "../../shared/Button/Button";
import { Select, Option } from "../../shared/Select/Select";

import "./FindAgroTires.scss";

export const FindAgroTires = () => {
  const {
    tireFilters,
    handleChange,
    findCarTires,
    widthOptions,
    heightOptions,
    diameterOptions,
    loading,
    error,
  } = useFindTiresBySize("bujqesore");

  return (
    <div className="FindAgroTires">
      <Select
        disabled={loading}
        value={widthOptions
          .filter((item) => item.value === tireFilters.paWidths)
          .shift()}
        clearable
        error={error?.message}
        onChange={(option: Option | null) => {
          handleChange("measurement", "paWidths", option?.value as string);
        }}
        label="Gjerësia"
        placeholder="*205"
        options={widthOptions}
      />
      <Select
        disabled={loading}
        error={error?.message}
        value={heightOptions
          .filter((item) => item.value === tireFilters.paHeights)
          .shift()}
        clearable
        onChange={(option: Option | null) => {
          handleChange("measurement", "paHeights", option?.value as string);
        }}
        label="Lartësia"
        placeholder="*55"
        options={heightOptions}
      />
      <Select
        clearable
        disabled={loading}
        error={error?.message}
        value={diameterOptions
          .filter((item) => item.value === tireFilters.paDiameters)
          .shift()}
        onChange={(option: Option | null) => {
          handleChange("measurement", "paDiameters", option?.value as string);
        }}
        label="Inch"
        placeholder="*16"
        options={diameterOptions}
      />
      <Button
        disabled={loading}
        className="FindAgroTires__button"
        label="Kërko goma"
        onClick={() => findCarTires()}
      />
    </div>
  );
};
