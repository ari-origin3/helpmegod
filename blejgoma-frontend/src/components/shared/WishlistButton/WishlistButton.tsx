import React from "react";
import cs from "classnames";
import { Icon } from "../Icon/Icon";
import { useWishlist } from "../../../lib/hooks/useWishlist";

import "./WishlistButton.scss";
import { useAuthContext } from "../../../lib/context/AuthContext/AuthContext";

interface Props {
  id: number;
  className?: string;
  square?: boolean;
}

export const WishListButton = (props: Props) => {
  const { wishlist } = useAuthContext();
  const { addToWishlist } = useWishlist();
  const isOnWishlist = wishlist?.includes(props.id);

  const handleClick = () => {
    addToWishlist(props.id);
  };

  return (
    <button
      className={cs(
        "WishListButton",
        props.className,
        props.square && "WishListButton--square"
      )}
      onClick={handleClick}
    >
      <Icon
        className={cs(
          "WishListButton__icon",
          isOnWishlist && "WishListButton__icon--filled",
          props.square && "WishListButton__icon--square"
        )}
        icon="heart-outline"
      />
    </button>
  );
};
