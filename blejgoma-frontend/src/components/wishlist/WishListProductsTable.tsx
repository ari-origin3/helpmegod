import React from "react";
import { Spinner } from "reactstrap";
import { SimpleProduct } from "../../graphql/generated/generated";
import { getProductAttributes } from "../../lib/helpers/getProductAttributes";
import { useRouter } from "../../lib/hooks/useRouter";
import { useWishlist } from "../../lib/hooks/useWishlist";
import { Icon } from "../shared/Icon/Icon";
import { Image } from "../shared/Image/Image";
import { RatingStars } from "../shared/RatingStars/RatingStars";
import { Table } from "../Table/Table";

import "./WishListProductsTable.scss";

const columns = [
  { key: "product", header: "Produkti" },
  { key: "price", header: "Cmimi për njësi" },
  { key: "action", header: "", width: 52 },
];

export const WishListProductsTable = () => {
  const router = useRouter();

  const {
    products,
    removeFromWishlist,
    loading,
    isRemovingProduct,
  } = useWishlist();

  const rows = products?.map((item) => {
    const product = item as SimpleProduct;
    const productImageURL = encodeURI(
      `https://management.blejgoma.com/wp-content/uploads/photos/${product?.productMetas?.model}.jpg`
    );

    return {
      product: (
        <div
          className="CartProductsTable__product"
          onClick={() => router.history.push(`/product/${product.slug}`)}
        >
          <div className="CartProductsTable__image">
            <Image src={productImageURL} alt="" />
          </div>
          <div className="CartProductsTable__details">
            <div className="CartProductsTable__brand">
              {product?.productManufacturers?.nodes?.[0]?.name}
            </div>
            <RatingStars rate={5} />
            <p className="CartProductsTable__name">{product?.name}</p>
            <p className="CartProductsTable__attributes">
              {getProductAttributes(product)}
            </p>
          </div>
        </div>
      ),
      price: <p className="CartProductsTable__price">{product?.price}</p>,
      action: (
        <div
          className="CartProductsTable__remove"
          onClick={() => removeFromWishlist(product.databaseId)}
        >
          {isRemovingProduct === product.databaseId ? (
            <Spinner size="sm" />
          ) : (
            <Icon className="CartProductsTable__remove_icon" icon="close" />
          )}
        </div>
      ),
    };
  });

  return (
    <div className="CartProductsTable">
      <Table
        columns={columns}
        rows={rows}
        loading={loading}
        emptyPlaceholder="Nuk keni asnjë produkt në listën e dëshirave!"
        divideRow
      />
    </div>
  );
};
