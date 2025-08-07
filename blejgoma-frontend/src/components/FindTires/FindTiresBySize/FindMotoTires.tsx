import React, { useState } from "react";
import { clearEmptyFilterProperties } from "../../../lib/helpers/clearEmptyFilterProperties";
import { useFindTiresBySize } from "../../../lib/hooks/useFindTiresBySize";
import { useQueryParameters } from "../../../lib/hooks/useQueryParameters";
import { useRouter } from "../../../lib/hooks/useRouter";
import Button from "../../shared/Button/Button";
import { CheckBox } from "../../shared/CheckBox/CheckBox";
import { Option, Select } from "../../shared/Select/Select";

import "./FindMotoTires.scss";

export const FindMotoTires = () => {
  const router = useRouter();
  const { getUrlWithQueryParams } = useQueryParameters();

  const {
    widthOptions,
    heightOptions,
    diameterOptions,
    loading,
  } = useFindTiresBySize("motogoma");

  const [activateSelectByWheel, setActivateSelectByWheel] = useState({
    front: false,
    rear: false,
  });

  const [wheelSizes, setWheelSizes] = useState({
    paWidths: [""],
    paHeights: [""],
    paDiameters: [""],
  });

  const handleFindTires = () => {
    const clearedWheelSizes = clearEmptyFilterProperties(wheelSizes);

    const url = getUrlWithQueryParams({
      productCategories: "moto",
      ...clearedWheelSizes,
    });
    router.history.push(`/shop${url}`);
  };

  return (
    <div className="FindMotoTires">
      <CheckBox
        className="FindMotoTires__checkbox FindMotoTires__checkbox--front"
        label="Dimensionet e gomës së përparme"
        value={activateSelectByWheel.front}
        onChange={() =>
          setActivateSelectByWheel({
            ...activateSelectByWheel,
            front: !activateSelectByWheel.front,
          })
        }
      />
      <Select
        clearable
        value={widthOptions.find(
          (item) => item.value === wheelSizes.paWidths[0]
        )}
        disabled={!activateSelectByWheel.front || loading}
        onChange={(option: Option | null) => {
          setWheelSizes((prev) => ({
            ...prev,
            paWidths: [option?.value as string, prev.paWidths[1]],
          }));
        }}
        label="Gjerësia"
        placeholder="*205"
        options={widthOptions}
      />
      <Select
        clearable
        value={widthOptions.find(
          (item) => item.value === wheelSizes.paHeights[0]
        )}
        disabled={!activateSelectByWheel.front || loading}
        onChange={(option: Option | null) => {
          setWheelSizes((prev) => ({
            ...prev,
            paHeights: [option?.value as string, prev.paHeights[1]],
          }));
        }}
        label="Lartësia"
        placeholder="*55"
        options={heightOptions}
        menuPlacement="top"
      />
      <Select
        clearable
        value={diameterOptions.find(
          (item) => item.value === wheelSizes.paDiameters[0]
        )}
        onChange={(option: Option | null) => {
          setWheelSizes((prev) => ({
            ...prev,
            paDiameters: [option?.value as string, prev.paDiameters[1]],
          }));
        }}
        disabled={!activateSelectByWheel.front || loading}
        label="Inch"
        placeholder="*16"
        options={diameterOptions}
      />

      <CheckBox
        className="FindMotoTires__checkbox FindMotoTires__checkbox--rear"
        label="Dimensionet e gomës së pasme"
        value={activateSelectByWheel.rear}
        onChange={() =>
          setActivateSelectByWheel({
            ...activateSelectByWheel,
            rear: !activateSelectByWheel.rear,
          })
        }
      />
      <Select
        clearable
        value={diameterOptions.find(
          (item) => item.value === wheelSizes.paWidths[1]
        )}
        onChange={(option: Option | null) => {
          setWheelSizes((prev) => ({
            ...prev,
            paWidths: [prev.paWidths[0], option?.value as string],
          }));
        }}
        disabled={!activateSelectByWheel.rear || loading}
        label="Gjerësia"
        placeholder="*205"
        options={widthOptions}
      />
      <Select
        clearable
        value={diameterOptions.find(
          (item) => item.value === wheelSizes.paHeights[1]
        )}
        onChange={(option: Option | null) => {
          setWheelSizes((prev) => ({
            ...prev,
            paHeights: [prev.paHeights[0], option?.value as string],
          }));
        }}
        disabled={!activateSelectByWheel.rear || loading}
        label="Lartësia"
        placeholder="*55"
        options={heightOptions}
      />

      <Select
        clearable
        value={diameterOptions.find(
          (item) => item.value === wheelSizes.paDiameters[1]
        )}
        onChange={(option: Option | null) => {
          setWheelSizes((prev) => ({
            ...prev,
            paDiameters: [prev.paDiameters[0], option?.value as string],
          }));
        }}
        disabled={!activateSelectByWheel.rear || loading}
        label="Inch"
        placeholder="*16"
        options={diameterOptions}
      />

      <Button
        className="FindMotoTires__button"
        label="Kërko goma"
        onClick={handleFindTires}
      />
      <div style={{ height: "15px" }}></div>
    </div>
  );
};
