import React from "react";
import cs from "classnames";
import { useSkeleton } from "../../lib/hooks/useSkeleton";

import "./Table.scss";
import { InfoPlaceholder } from "../shared/InfoPlaceholder/InfoPlaceholder";
import { IconDefinition } from "../shared/Icon/Icon.generated";

interface TableColumn {
  key: string;
  header: string;
  width?: number;
}

interface TableRow {
  [key: string]: any;
}

interface Props {
  columns: TableColumn[];
  rows?: TableRow[];
  loading?: boolean;
  emptyPlaceholder?: string;
  emptyPlaceholderIcon?: IconDefinition;
  className?: string;
  divideRow?: boolean;
}
export const Table = (props: Props) => {
  const s = useSkeleton(props.loading);

  if (props.rows?.length === 0 && !props.loading)
    return (
      <div className="Table__empty">
        <InfoPlaceholder
          icon={props.emptyPlaceholderIcon || "blank"}
          text={props.emptyPlaceholder || "Nuk ka te dhena!"}
        />
      </div>
    );

  return (
    <table className={cs("Table", props.className)}>
      <thead>
        <tr>
          {props.columns?.map((col, index) => (
            <th
              key={`Table-${index}-${col.key}`}
              style={{ width: `${col.width}px` }}
            >
              {s(col.header, { width: "100px" })}
            </th>
          ))}
        </tr>
        {props.divideRow && <tr className="Table__divider"></tr>}
      </thead>
      <tbody>
        {props.loading ? (
          <tr className="Table__placeholder">
            <td colSpan={props.columns.length}>
              {s("", {
                height: "117px",
                count: 3,
              })}
            </td>
          </tr>
        ) : (
          props.rows?.map((row: TableRow, index: number) => (
            <>
              <tr key={`Table-row-${index}`}>
                {props.columns.map((rowColumn, idx) => (
                  <td key={`Table-column-${idx}`}>{row[rowColumn["key"]]}</td>
                ))}
              </tr>
              {props.divideRow &&
                props.rows &&
                props.rows.length > index + 1 && (
                  <tr className="Table__divider"></tr>
                )}
            </>
          ))
        )}
      </tbody>
    </table>
  );
};
