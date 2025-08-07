import React from "react";
import { Icon } from "../../../shared/Icon/Icon";
import { Table } from "../../../Table/Table";

import "./TireTable.scss";
interface Props {
  data: Array<any>;
}

const columns = [
  {
    key: "winter",
    header: "",
    width: 20,
  },
  {
    key: "tire",
    header: "Goma",
  },
  {
    key: "rim",
    header: "Disku",
  },
  {
    key: "tirePressure",
    header: "Presioni i gomës",
  },
];

export const TireTable = (props: Props) => {
  const rows = props.data?.map((wheel) => ({
    winter: wheel.is_recommended_for_winter && (
      <Icon className="TireTable__snow_icon" icon="snowflake" />
    ),
    tire: (
      <p className={wheel.is_stock && "TireTable__bold"}>
        {wheel.front.tire}
        <span className="TireTable__lisi">{`${
          wheel.front.load_index + wheel.front.speed_index
        }`}</span>
      </p>
    ),
    rim: (
      <p className={wheel.is_stock && "TireTable__bold"}>{wheel.front.rim}</p>
    ),
    tirePressure: (
      <p className={wheel.is_stock && "TireTable__bold"}>
        {wheel.front.tire_pressure?.bar}
      </p>
    ),
  }));

  return (
    <div className="TireTable">
      <Table className="TireTable__table" columns={columns} rows={rows} />
    </div>
  );
};
