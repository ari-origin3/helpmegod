import cs from "classnames";
import Button from "../../shared/Button/Button";

import "./CartSummary.scss";

export interface SummaryRowType {
  label: string;
  value: React.ReactNode;
  highlight?: boolean;
  big?: boolean;
  hide?: boolean;
}

interface Props {
  data: SummaryRowType[];
  disableButton?: boolean;
  onButtonClick?: () => void;
  buttonLabel?: string;
  buttonType?: "button" | "submit" | "reset" | undefined;
  buttonLoading?: boolean;
}
export const CartSummary = (props: Props) => {
  return (
    <div className="CartSummary">
      <h5 className="CartSummary__title">Llogaria totale</h5>
      <div className="CartSummary__content">
        {props.data?.map((row, index) => (
          <div
            className={cs(
              "CartSummary__row",
              row.big && "CartSummary__row--big",
              row.highlight && "CartSummary__row--highlight",
              row.hide && "CartSummary__row--hide"
            )}
            key={`CartSummary-${index}`}
          >
            <span>{row.label}</span>
            {row.value}
          </div>
        ))}

        {props.buttonLabel && (
          <Button
            onClick={props.onButtonClick}
            // onClick={(e)=>{
            //   console.log("red",e)
            // }}
            disabled={props.disableButton}
            label={props.buttonLabel}
            type={props.buttonType}
            loading={props.buttonLoading}
          />
        )}
      </div>
    </div>
  );
};
