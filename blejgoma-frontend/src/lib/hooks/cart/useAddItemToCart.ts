import { useState } from "react";
import { Option } from "../../../components/shared/Select/Select";
import {
  GetCartDocument,
  SimpleProduct,
  useAddProductMutation,
  useGetPopUpContentQuery,
} from "../../../graphql/generated/generated";
import { useCartItem } from "./useCartItem";
import { useToast } from "../useToast";
import { maximumStockIsExceeded } from "../../helpers/maximumStockIsExceeded";
import { useConfirmation } from "../../context/ConfirmationContext/ConfirmationContext";
import { Maybe } from "graphql/jsutils/Maybe";
import { ToastContent } from "../../../components/shared/ToastContent/ToastContent";

export const useAddItemToCart = (
  productId: number,
  productCateogry: Maybe<string>
) => {
  const { addToast } = useToast();
  const cartItem = useCartItem(productId);
  const confirmCtx = useConfirmation();
  const { data } = useGetPopUpContentQuery();
  const popUpContent =
    data?.generalOptions?.generalOptions?.ads?.popupText ?? "";

  const [quantity, setQuantity] = useState<Option>({ label: 2, value: 2 });
  const [error, setError] = useState<string>();

  const [addProductMutation, { loading }] = useAddProductMutation();

  const cartProduct = cartItem?.product as SimpleProduct;

  const canAddOddQuantity =
    productCateogry === "moto" || productCateogry === "bateri";

  const handleAddToCartClick = async () => {
    if (quantity === undefined) {
      setError("Nuk ka sasi të zgjedhur për këtë produkt!");
      return;
    }

    if (!canAddOddQuantity && Number(quantity.value) % 2 !== 0) {
      await confirmCtx.confirm(popUpContent, "vemendje-icon", "Vëmendje");
      setError(``);
      return;
    }

    // prettier-ignore
    if (maximumStockIsExceeded(cartProduct?.stockQuantity , quantity.value as number, cartItem?.quantity as number )) {  
      addToast(`Nuk mund të shtoni këtë sasi në shporte. Ne kemi ${cartProduct?.stockQuantity} në stok dhe ju veç se keni ${cartItem?.quantity} në shportë!`, {
        appearance: "error",
      });
      setError(
        `Nuk mund të shtoni këte sasi në shportë. Ne kemi ${cartProduct?.stockQuantity} në stok dhe ju veç se keni ${cartItem?.quantity} në shportë!`
      );
      return;
    }

    try {
      await addProductMutation({
        variables: {
          clientMutationId: "add-product-to-cart",
          productId,
          quantity: Number(quantity.value),
        },
        update: (cache, { data: { addToCart } }: any) => {
          cache.writeQuery({
            query: GetCartDocument,
            data: addToCart,
          });
        },
      });
      addToast(
        ToastContent({
          description: " Produkti u shtua në shportë",
          linkPath: "/cart",
          linkDescription: "Shiko shportën",
        }),
        {
          appearance: "success",
        }
      );
    } catch (e) {
      addToast("Gabim gjatë shtimit në shportë, Ju lutemi provoni përsëri!", {
        appearance: "error",
      });
    }
  };

  const handleQuantityChange = (value: Option | null) => {
    setError(undefined);
    value && setQuantity(value);
  };

  return {
    quantity,
    handleQuantityChange,
    handleAddToCartClick,
    loading,
    error,
  };
};
