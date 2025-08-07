import {
  GetCartDocument,
  useUpdateItemQuantityMutation,
} from "../../../graphql/generated/generated";
import { useCartContext } from "../../context/CartContext/CartContext";
import { useToast } from "../useToast";

export const useUpdateCartItemQuantity = () => {
  const { setIsUpdating, setIsDeleting } = useCartContext();
  const [updateItemQuantity] = useUpdateItemQuantityMutation();
  const { addToast } = useToast();

  const handleQuantityChange = async (quantity: number, productKey: string) => {
    const willDelete = quantity === 0;
    try {
      willDelete ? setIsDeleting(productKey) : setIsUpdating(productKey);

      await updateItemQuantity({
        variables: {
          input: {
            clientMutationId: "cart-quantity-update",
            items: [
              {
                key: productKey,
                quantity: quantity,
              },
            ],
          },
        },
        update(cache, data) {
          cache.writeQuery({
            query: GetCartDocument,
            data: data.data?.updateItemQuantities,
          });
        },
      });

      if (willDelete) {
        setIsDeleting("");
        addToast("Produkti u fshi me sukses!", { appearance: "success" });
        return;
      }
      setIsUpdating("");
    } catch (e) {
      if (willDelete) {
        setIsDeleting("");
        addToast("Error gjatë fshirjes së produktit!", { appearance: "error" });
        return;
      }
      setIsUpdating("");
    }
  };
  return { handleQuantityChange };
};
