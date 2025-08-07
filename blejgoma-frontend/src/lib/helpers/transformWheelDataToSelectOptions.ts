import { WheelDataOption } from "../../wheelSizeAPI";

export const transformWheelDataToSelectOptions = (
  data: Array<WheelDataOption>
) => {
  return data.map((obj: any) => ({ value: obj.slug, label: obj.name }));
};
