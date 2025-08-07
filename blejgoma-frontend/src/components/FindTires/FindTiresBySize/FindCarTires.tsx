import Button from "../../shared/Button/Button";
import { CheckBox } from "../../shared/CheckBox/CheckBox";
import { Option, Select } from "../../shared/Select/Select";

import "./FindCarTires.scss";
import { useFindTiresBySize } from "../../../lib/hooks/useFindTiresBySize";

const defaultSeasons: Option[] = [
  { label: "4 Sezonale", value: "all-season" },
  { label: "Verore", value: "vere" },
  { label: "Dimërore", value: "dimer" },
];
export const FindCarTires = () => {
  const {
    tireFilters,
    findCarTires,
    handleChange,
    widthOptions,
    heightOptions,
    diameterOptions,
    loading,
    error,
  } = useFindTiresBySize("autogoma");

  return (
    <div className="FindCarTires">
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
        clearable
        disabled={loading}
        error={error?.message}
        value={heightOptions
          .filter((item) => item.value === tireFilters.paHeights)
          .shift()}
        onChange={(option: Option | null) => {
          handleChange("measurement", "paHeights", option?.value as string);
        }}
        label="Lartësia"
        placeholder="*55"
        options={heightOptions}
      />
      <Select
        disabled={loading}
        clearable
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
        className="FindCarTires__button"
        label="Kërko goma"
        onClick={() => findCarTires()}
      />
      <div className="FindCarTires__season_select">
        {defaultSeasons.map((item) => {
          return (
            <CheckBox
              key={`SeasonCheckbox--${item.value}`}
              value={tireFilters.paSeasons?.includes(item.value as string)}
              label={item.label as string}
              onChange={(e) => {
                handleChange("season", "paSeasons", item?.value as string);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
