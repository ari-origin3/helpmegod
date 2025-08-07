import React, { useState } from "react";
import cs from "classnames";
import { MarketI } from "../../../../lib/helpers/getMarketsFromCarData";

import "./ResultSection.scss";
import { Col, Row } from "reactstrap";
import { getCarDataBySlug } from "../../../../lib/helpers/getCarDataBySlug";
import { TireTable } from "./TireTable";

interface Props {
  market: MarketI;
  data: Array<any>;
}
export const ResultSection = (props: Props) => {
  const { market, data } = props;
  const [activeTab, setActiveTab] = useState(data[0].slug);

  const selectedModel = getCarDataBySlug(data, activeTab);

  return (
    <div className="ResultSection">
      <div className="ResultSection__header">
        <p className="ResultSection__market">{`${
          market.name
        } (${market.slug.toUpperCase()})`}</p>
        <p className="ResultSection__model">
          {`${data[0].generation?.name} [${data[0].generation?.start_year}.. ${data[0].generation?.end_year}]`}
          :
        </p>
      </div>
      <div className="ResultSection__tabs">
        {data.map((tab, index) => (
          <Tab
            onClick={() => setActiveTab(tab.slug)}
            active={activeTab === tab.slug}
            key={`ResultSectionTab--${index}`}
          >
            <p className="ResultSection__hp">{tab.power.hp}hp</p>
            <p className="ResultSection__engine">{tab.trim}</p>
          </Tab>
        ))}
      </div>
      <div className="ResultSection__content">
        <h4 className="ResultSection__car_model">
          <span>{selectedModel?.trim}</span>
        </h4>
        <div className="ResultSection__info">
          <Row>
            <Col>
              <p className="ResultSection__paragraph">
                <span>- Gjenerata: </span>
                {`${selectedModel?.generation?.name} [${selectedModel?.generation?.start_year}.. ${selectedModel?.generation?.end_year}]`}
              </p>
              <p className="ResultSection__paragraph">
                <span>- Marketi: </span>
                {selectedModel?.market.abbr}
              </p>
              <p className="ResultSection__paragraph">
                <span>- Fuqia: </span>
                {`${selectedModel?.power.hp} hp | ${selectedModel?.power.kW} kW | ${selectedModel?.power.PS} PS`}
              </p>
              <p className="ResultSection__paragraph">
                <span>- Motorri: </span>
                {`${selectedModel?.engine_type || ""}, ${selectedModel?.fuel}`}
              </p>
              <p className="ResultSection__paragraph">
                <span>- Opsionet: </span>
                Design, Sport (STATIC)
              </p>
            </Col>
            <Col>
              <p className="ResultSection__paragraph">
                <span>- Center Bore: </span>
                {selectedModel?.centre_bore} mm
              </p>
              <p className="ResultSection__paragraph">
                <span>- PCD: </span>
                {selectedModel?.bolt_pattern}
              </p>
              <p className="ResultSection__paragraph">
                <span>- Wheel Fasteners: </span>
                {selectedModel?.lock_type}
              </p>
              <p className="ResultSection__paragraph">
                <span>- Thread Size: </span>
                {selectedModel?.lock_text}
              </p>
            </Col>
          </Row>
          <Row>
            <TireTable data={selectedModel?.wheels} />
          </Row>
        </div>
      </div>
    </div>
  );
};

interface TabProps {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function Tab(props: TabProps) {
  return (
    <div
      className={cs(
        "ResultSection__tab",
        props.active && "ResultSection__tab--active"
      )}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}
