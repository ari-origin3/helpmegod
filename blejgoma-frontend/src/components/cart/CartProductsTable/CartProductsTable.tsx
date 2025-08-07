import { Spinner } from "reactstrap";
import cs from "classnames";

import { SimpleProduct } from "../../../graphql/generated/generated";
import { useCartContext } from "../../../lib/context/CartContext/CartContext";
import { getProductAttributes } from "../../../lib/helpers/getProductAttributes";
import { useCartItems } from "../../../lib/hooks/cart/useCartItems";
import { useUpdateCartItemQuantity } from "../../../lib/hooks/cart/useUpdateCartItemQuantity";
import { useRouter } from "../../../lib/hooks/useRouter";
import { Icon } from "../../shared/Icon/Icon";
import { Image } from "../../shared/Image/Image";
import { RatingStars } from "../../shared/RatingStars/RatingStars";
import { Table } from "../../Table/Table";
import { Quantity } from "../Quantity/Quantity";
import Vera from "../../../assets/icons/vera.svg";
import Sezonale from "../../../assets/icons/dimervere.svg";
import Dimer from "../../../assets/icons/dimer.svg";
import "./CartProductsTable.scss";

interface Props {
  disableRowDelete?: boolean;
}

const columns = [
  { key: "product", header: "Produkti" },
  { key: "price", header: "Çmimi për njësi" },
  { key: "quantity", header: "Sasia" },
  { key: "totalPrice", header: "Çmimi total" },
  { key: "action", header: "", width: 52 },
];

export const CartProductsTable = (props: Props) => {
  const cartItems = useCartItems();
  const { isUpdating, isDeleting, isLoading } = useCartContext();
  const { handleQuantityChange } = useUpdateCartItemQuantity();
  const router = useRouter();

  const rows = cartItems.map((item) => {
    const product = item?.product as SimpleProduct;

    const quantity = item.quantity as number;
    const stockQuantity = product.stockQuantity as number;
    const productPrice = product?.price ? parseFloat(product.price) : 0;

    //TODO:Update link when in production
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
            <Image dynamicFit src={productImageURL} alt="" />
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
          </div>
          <div className="CartProductsTable__details">
            <div className="CartProductsTable__brand">
              {product?.productManufacturers?.nodes?.[0]?.name}
            </div>
            <RatingStars rate={5} />
            <p className="CartProductsTable__name">{item?.product?.name}</p>
            <p className="CartProductsTable__attributes">
              {getProductAttributes(product)}
            </p>
          </div>
        </div>
      ),
      price: <p className="CartProductsTable__price">{product?.price}</p>,
      quantity: (
        <Quantity
          quantity={quantity}
          stock={stockQuantity}
          onChange={(quantity) => handleQuantityChange(quantity, item.key)}
          loading={isUpdating === item.key}
          disabled={isDeleting === item.key}
          category={item.product?.productCategories?.nodes?.[0]?.slug}
        />
      ),
      totalPrice: (
        <p className="CartProductsTable__total">{quantity * productPrice}€</p>
      ),
      action: (
        <div
          className={cs(
            "CartProductsTable__remove",
            props.disableRowDelete && "d-none"
          )}
          onClick={() => handleQuantityChange(0, item.key)}
        >
          {isDeleting === item.key ? (
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
        loading={isLoading}
        emptyPlaceholder="Nuk keni asnjë produkt në shportë!"
        divideRow
      />
    </div>
  );
};
