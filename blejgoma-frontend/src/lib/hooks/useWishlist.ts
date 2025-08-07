import { useEffect, useState, useCallback } from "react";
import { useApolloClient } from "@apollo/client";

import {
  useAddItemToWishlistMutation,
  useRemoveItemFromWishlistMutation,
  GetUserWishlistDocument,
  SimpleProduct,
} from "../../graphql/generated/generated";
import { useAuthContext } from "../context/AuthContext/AuthContext";
import { useToast } from "./useToast";

export const useWishlist = () => {
  const {
    isAuthenticated,
    wishlist: wishlistProductIds,
    setWishlist,
    user,
  } = useAuthContext();
  const { addToast } = useToast();
  const wishlist = wishlistProductIds || [];
  const client = useApolloClient();

  const [wishlistProducts, setWishlistProducts] = useState<SimpleProduct[]>();
  const [loading, setLoading] = useState(false);
  const [isRemovingProduct, setIsRemovingProduct] = useState<number>();

  const getWishlistProducts = useCallback(async () => {
    setLoading(true);
    try {
      setLoading(true);
      const res = await client.query({
        query: GetUserWishlistDocument,
        variables: {
          products: [...wishlist, 0],
        },
      });
      setWishlistProducts(res.data?.products?.nodes);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      addToast("Problem gjatë marrjes së produktëve nga lista e dëshirave!", {
        appearance: "error",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getWishlistProducts();
  }, [getWishlistProducts, isAuthenticated]);

  const [addItemToWishlist] = useAddItemToWishlistMutation();
  const [removeItemFromWishlist] = useRemoveItemFromWishlistMutation();

  const addToWishlist = async (id: number) => {
    if (wishlist?.includes(id))
      return addToast("Produkti ekziston në listën e dëshirave !", {
        appearance: "error",
      });

    if (!isAuthenticated) {
      setWishlist([...wishlist, id]);
      addToast("Produkti u shtua me sukses në listën e dëshirave!", {
        appearance: "success",
      });
      return;
    }

    try {
      await addItemToWishlist({
        variables: {
          ids: [...wishlist, id],
          userId: user?.databaseId,
        },
      });
      setWishlist([...wishlist, id]);
      addToast("Produkti u shtua me sukses në listën e dëshirave!", {
        appearance: "success",
      });
    } catch (e) {
      addToast("Problem gjatë shtimit të produktit në listën e dëshirave!", {
        appearance: "error",
      });
    }
  };

  const removeFromWishlist = async (id: number) => {
    setIsRemovingProduct(id);
    setWishlist(wishlist.filter((itemId) => itemId !== id));

    if (isAuthenticated) {
      try {
        await removeItemFromWishlist({
          variables: {
            productId: id,
            userId: user?.databaseId,
          },
        });
        setIsRemovingProduct(undefined);
        setWishlistProducts((prevState) =>
          prevState?.filter((item) => item.databaseId !== id)
        );
      } catch (e) {
        addToast("Problem gjatë fshirjes së produktit nga lista e dëshirave", {
          appearance: "error",
        });
        setWishlist(wishlist);
        setWishlistProducts(wishlistProducts);
        setIsRemovingProduct(undefined);
        return;
      }
    }
    setWishlistProducts((prevState) =>
      prevState?.filter((item) => item.databaseId !== id)
    );

    addToast("Produkti u fshi me sukses nga lista e deshirave!", {
      appearance: "success",
    });
    setIsRemovingProduct(undefined);
  };

  return {
    products: wishlistProducts || [],
    loading,
    addToWishlist,
    removeFromWishlist,
    isRemovingProduct,
  };
};
