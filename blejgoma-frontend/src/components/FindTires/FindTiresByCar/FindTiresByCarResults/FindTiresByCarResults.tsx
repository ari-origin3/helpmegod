import React, { useCallback, useEffect, useState } from "react";
import { Container } from "reactstrap";
import { getCarModelsByMarketType } from "../../../../lib/helpers/getCarModelsByMarketType";
import { getMarketsFromCarData } from "../../../../lib/helpers/getMarketsFromCarData";
import { useRouter } from "../../../../lib/hooks/useRouter";
import { FindTires } from "../../FindTires";
import wheelAPI from "../../../../wheelSizeAPI";

import "./FindTiresByCarResults.scss";

import { ResultSection } from "./ResultSection";
import { capitalizeFirstLetter } from "../../../../lib/helpers/capitalizeFirstLetter";
import { useUIContext } from "../../../../lib/context/UIContext/UIContext";
import { useSkeleton } from "../../../../lib/hooks/useSkeleton";
export const FindTiresByCarResults = () => {
  const [results, setResults] = useState([]);
  const { loadingCarsData, setLoadingCarsData } = useUIContext();
  const s = useSkeleton(loadingCarsData, { count: 3, height: "100px" });

  const { query } = useRouter<{
    make: string;
    year: string;
    model: string;
  }>();

  const getCarsData = useCallback(async () => {
    try {
      setLoadingCarsData(true);
      const res = await wheelAPI.getCarByModel(
        query.make,
        query.year,
        query.model
      );
      setResults(res);
      setLoadingCarsData(false);
    } catch (e) {
      setLoadingCarsData(false);
    }
  }, [query.make, query.year, query.model, setLoadingCarsData]);

  useEffect(() => {
    getCarsData();
  }, [getCarsData]);

  const markets = getMarketsFromCarData(results);
  const carModel = `${capitalizeFirstLetter(
    query.make
  )} ${capitalizeFirstLetter(query.model)} ${query.year}`;
  return (
    <div className="FindTiresByCarResults">
      <FindTires intialTab={2} />
      <Container>
        <div className="FindTiresByCarResults__content">
          <h4 className="FindTiresByCarResults__heading">
            <span>{carModel} </span>
            Udhëzues për madhësinë e gomave
          </h4>
          <p className="FindTiresByCarResults__sub_heading">
            Zgjidhni përshtatjen e duhur për {carModel}:
          </p>
          {s(
            markets?.map((market, index) => (
              <ResultSection
                market={market}
                data={getCarModelsByMarketType(results, market.slug)}
                key={`ResultSection--${index}`}
              />
            ))
          )}
        </div>
      </Container>
    </div>
  );
};
