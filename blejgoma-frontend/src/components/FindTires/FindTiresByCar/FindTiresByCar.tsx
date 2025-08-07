import React, { useCallback, useEffect, useState } from "react";

import { useQueryParameters } from "../../../lib/hooks/useQueryParameters";

import Button from "../../shared/Button/Button";
import { Select, Option as SelectOption } from "../../shared/Select/Select";
import wheelAPI, { WheelDataOption } from "../../../wheelSizeAPI";
import { transformWheelDataToSelectOptions } from "../../../lib/helpers/transformWheelDataToSelectOptions";

import "./FindTiresByCar.scss";
import { useRouter } from "../../../lib/hooks/useRouter";
import { capitalizeFirstLetter } from "../../../lib/helpers/capitalizeFirstLetter";
import { useUIContext } from "../../../lib/context/UIContext/UIContext";
import { useToast } from "../../../lib/hooks/useToast";
interface ParamsI {
  make?: SelectOption | null;
  year?: SelectOption | null;
  model?: SelectOption | null;
}

type ParamsType = "make" | "year" | "model";

export const FindTiresByCar = () => {
  const [manufacters, setManufacters] = useState<Array<WheelDataOption>>([]);
  const [years, setYears] = useState<Array<WheelDataOption>>([]);
  const [models, setModels] = useState<Array<WheelDataOption>>([]);
  const { addToast } = useToast();
  const router = useRouter();
  const { loadingCarsData } = useUIContext();

  const paramsFromUrl = {
    make: router.query.make
      ? {
          value: router.query.make,
          label: capitalizeFirstLetter(router.query.make),
        }
      : null,
    year: router.query.year
      ? {
          value: router.query.year,
          label: capitalizeFirstLetter(router.query.year),
        }
      : null,
    model: router.query.model
      ? {
          value: router.query.model,
          label: capitalizeFirstLetter(router.query.model),
        }
      : null,
  };

  const [params, setParams] = useState<ParamsI>(paramsFromUrl);

  const { getUrlWithQueryParams } = useQueryParameters();

  //Function and useEffect for manufacters request
  const getManufacters = useCallback(async () => {
    try {
      const res = await wheelAPI.getManufacters();
      setManufacters(res);
    } catch (e) {}
  }, []);

  useEffect(() => {
    getManufacters();
  }, [getManufacters]);

  //Function and useEffect for years request
  const getYears = useCallback(async () => {
    if (!params?.make) return;

    try {
      const res = await wheelAPI.getYears(params?.make.value as string);
      setYears(res);
    } catch (e) {}
  }, [params?.make]);

  useEffect(() => {
    getYears();
  }, [getYears]);

  //Function and useEffect for models request

  const getModels = useCallback(async () => {
    if (!params?.year) return;

    try {
      const res = await wheelAPI.getModels(
        params.make?.value as string,
        params.year?.value as string
      );
      setModels(res);
    } catch (e) {}
  }, [params?.year, params?.make]);

  useEffect(() => {
    getModels();
  }, [getModels]);

  const handleSelectChange = (option: SelectOption | null, key: ParamsType) => {
    if (key === "make") setParams({ make: option, year: null, model: null });
    setParams((prev) => {
      if (!prev) return { [key]: option };
      return { ...prev, [key]: option };
    });
  };

  const handleSearchClick = async () => {
    if (!params.make || !params.model) {
      addToast(
        "Specifikoni markën, vitin dhe modelin e veturës tuaj para se të klikoni butonin kërko!",
        { appearance: "error" }
      );
      return;
    }

    const url = getUrlWithQueryParams({
      make: params?.make?.value,
      year: params?.year?.value,
      model: params?.model?.value,
    });
    router.history.push(`/carSearch${url}`);
  };

  return (
    <div className="FindTiresByCar">
      <Select
        value={params?.make}
        onChange={(option) => handleSelectChange(option, "make")}
        label="Marka"
        placeholder="*Audi"
        options={transformWheelDataToSelectOptions(manufacters)}
        disabled={manufacters.length === 0}
      />
      <Select
        value={params?.year}
        onChange={(option) => handleSelectChange(option, "year")}
        label="Viti"
        placeholder="*2019"
        options={transformWheelDataToSelectOptions(years)}
        disabled={!params?.make || years.length === 0}
      />
      <Select
        value={params?.model}
        onChange={(option) => handleSelectChange(option, "model")}
        label="Modeli"
        placeholder="*A4"
        options={transformWheelDataToSelectOptions(models)}
        disabled={!params?.year || models.length === 0}
      />
      <Button
        className="FindTiresByCar__button"
        label="KËRKO"
        onClick={handleSearchClick}
        loading={loadingCarsData}
      />
      <p className="FindTiresByCar__description">
        Specifikoni markën, vitin dhe modelin e veturës tuaj para për të gjetur
        gomat që ju përputhen
      </p>
    </div>
  );
};
