import { Option } from "../../components/shared/Select/Select";

// mapArrayToSelectOptions
export const mapArrayToSelectOptions = (
  items: Array<{ name?: string; slug?: string; [key: string]: any }>
): Option[] => {
  if (!items) {
    return [] as Option[];
  }
  const options = items
    .map((item) => ({
      label: item?.name || "",
      value: item?.slug || "",
    }))
    .filter((x) => x.value);

  return [...options];
};
