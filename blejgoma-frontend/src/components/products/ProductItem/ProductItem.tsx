import React from "react";
import { Link } from "react-router-dom";

import { RatingStars } from "../../shared/RatingStars/RatingStars";
import { WishListButton } from "../../shared/WishlistButton/WishlistButton";
import { SimpleProduct } from "../../../graphql/generated/generated";
import { AddToCart } from "../AddToCart/AddToCart";
import { ProductStatus } from "../ProductStatus/ProductStatus";
import { ProductPrice } from "../ProductPrice/ProductPrice";

import "./ProductItem.scss";
import { Image } from "../../shared/Image/Image";
import { getProductAttributes } from "../../../lib/helpers/getProductAttributes";
import { MenuPlacement } from "react-select";
import Vera from "../../../assets/icons/vera.svg";
import Sezonale from "../../../assets/icons/dimervere.svg"
import Dimer from "../../../assets/icons/dimer.svg"

interface Props {
  product: SimpleProduct;
  size?: "sm";
  selectMenuPlacement?: MenuPlacement;
}
export const ProductItem = (props: Props) => {
  const { product } = props;

  const regularPrice = product.regularPrice
    ? parseFloat(product.regularPrice)
    : undefined;

  const salePrice = product.salePrice
    ? parseFloat(product.salePrice)
    : undefined;

  //Self-invoking function to get the discount percentage and check if regularPrice or salePrice doesn't exist to return 0, otherwise we have a logical error.
  const discountedPercentage = (() => {
    if (!regularPrice || !salePrice) return 0;
    return Math.round(((regularPrice - salePrice) / regularPrice) * 100);
  })();

  //TODO:Handle the case to check if the photo exist as .jpg too if it fails with .png.
  const productImageURL = encodeURI(
    `https://management.blejgoma.com/wp-content/uploads/photos/${product?.productMetas?.model}.jpg`
  );

  return (
    <div className="ProductItem">
      <div className="ProductItem__image">
        <Link to={`/product/${product.slug}`}>
          <Image src={productImageURL} alt="" />
          {product?.paSeasons?.nodes?.[0]?.name === "Vere" ? (
            <img className="seasonLogo" src={Vera} alt="" />
          ) : (
            ""
          )}
          {product?.paSeasons?.nodes?.[0]?.name === "Dimer" ? (
            <img className="seasonLogo" src={Dimer} alt="" />
          ) : (
            ""
          )}
          {product?.paSeasons?.nodes?.[0]?.name === "4 Sezonale" ? (
            <img className="seasonLogo" src={Sezonale} alt="" />
          ) : (
            ""
          )}
        </Link>
        <WishListButton
          className="ProductItem__wishlist_button"
          id={product.databaseId}
        />
        {discountedPercentage !== 0 && (
          <span className="ProductItem__sale_label">
            {discountedPercentage !== 0 && `${discountedPercentage}%`}
          </span>
        )}
      </div>
      <div className="ProductItem__details">
        <p className="ProductItem__brand">
          {product?.productManufacturers?.nodes?.[0]?.name}
        </p>
        <div className="ProductItem__info_wrapper">
          <div className="ProductItem__left">
            <RatingStars className="ProductItem__stars" rate={5} />
            <Link
              className="ProductItem__name_link"
              to={`/product/${product.slug}`}
            >
              <p className="ProductItem__name">{product.name}</p>
            </Link>

            <p className="ProductItem__attributes">
              {getProductAttributes(product)}
            </p>
            <ProductStatus stockStatus={product.stockStatus} />
          </div>
          <div className="ProductItem__right">
            <ProductPrice
              onSale={product.onSale}
              salePrice={product.salePrice}
              regularPrice={product.regularPrice}
            />
            <AddToCart
              productId={product!.databaseId}
              productCategory={product.productCategories?.nodes?.[0]?.slug}
              stock={product!.stockQuantity}
              small
              selectMenuPlacement={props.selectMenuPlacement}
            />
            <Link className="ProductItem__link" to={`/product/${product.slug}`}>
              Detajet
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
