import React from "react";
import { Spinner } from "reactstrap";
import cs from "classnames";

import "./Quantity.scss";
import { Maybe } from "graphql/jsutils/Maybe";

interface Props {
  quantity: number;
  onChange: (quantity: number) => void;
  stock: number;
  loading?: boolean;
  disabled?: boolean;
  category?: Maybe<string>;
}

export const Quantity = (props: Props) => {
  const canBuyOddQuantity =
    props.category === "moto" || props.category === "bateri";

  const evenStock = props.stock % 2 === 0;
  const disableDecrement = canBuyOddQuantity
    ? props.quantity === 1
    : props.quantity === 2;

  const disableIncrement =
    evenStock || canBuyOddQuantity
      ? props.quantity === props.stock
      : props.quantity === props.stock - 1;

  const handleDecrement = () => {
    if (disableDecrement) return;
    canBuyOddQuantity
      ? props.onChange(props.quantity - 1)
      : props.onChange(props.quantity - 2);
  };

  const handleIncrement = () => {
    if (disableIncrement) return;
    canBuyOddQuantity
      ? props.onChange(props.quantity + 1)
      : props.onChange(props.quantity + 2);
  };

  return (
    <div className="Quantity">
      <span
        className={cs(
          "Quantity__button",
          (disableDecrement || props.loading || props.disabled) &&
            "Quantity__button--disabled"
        )}
        onClick={handleDecrement}
      >
        -
      </span>
      <span className="Quantity__value">
        {props.loading ? <Spinner size="sm" /> : props.quantity}
      </span>
      <span
        className={cs(
          "Quantity__button",
          (disableIncrement || props.loading || props.disabled) &&
            "Quantity__button--disabled"
        )}
        onClick={handleIncrement}
      >
        +
      </span>
    </div>
  );
};
