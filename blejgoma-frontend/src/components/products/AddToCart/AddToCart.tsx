import cs from "classnames";
import { Maybe } from "graphql/jsutils/Maybe";
import { MenuPlacement } from "react-select";
import { SimpleProduct } from "../../../graphql/generated/generated";
import { useAddItemToCart } from "../../../lib/hooks/cart/useAddItemToCart";
import Button from "../../shared/Button/Button";
import { Select } from "../../shared/Select/Select";

import "./AddToCart.scss";
interface Props {
  productId: number;
  productCategory: Maybe<string>;
  stock: SimpleProduct["stockQuantity"];
  small?: boolean;
  disabled?: boolean;
  selectMenuPlacement?: MenuPlacement;
}

export const AddToCart = (props: Props) => {
  const {
    quantity,
    handleQuantityChange,
    handleAddToCartClick,
    loading,
    error,
  } = useAddItemToCart(props.productId, props.productCategory);

  //Generate select options from product stock
  const selectOptions = Array.from({ length: props.stock || 0 }, (_, i) => ({
    value: i + 1,
    label: i + 1,
  }));

  return (
    <div
      className={cs(
        "AddToCart",
        props.small && "AddToCart--small",
        error && "AddToCart--error"
      )}
    >
      <Select
        className="AddToCart__quantity_select"
        value={quantity}
        options={selectOptions}
        onChange={handleQuantityChange}
        disabled={props.disabled || selectOptions.length === 0}
        menuPlacement={props.selectMenuPlacement}
        isSearchable={false}
        style={{
          container: (prev: any) => ({
            ...prev,
            width: `${10 * String(quantity.value).length + 30}px`,
          }),
        }}
      />

      <Button
        className="AddToCart__button"
        label="SHTO"
        icon="cart"
        onClick={handleAddToCartClick}
        size={props.small ? "sm" : undefined}
        loading={loading}
        disabled={props.disabled || selectOptions.length === 0}
      />
    </div>
  );
};
