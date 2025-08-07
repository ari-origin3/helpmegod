import React from "react";
import { getProductAttributes } from "../../lib/helpers/getProductAttributes";
import { useRouter } from "../../lib/hooks/useRouter";
import { Quantity } from "../cart/Quantity/Quantity";
import { Image } from "../shared/Image/Image";
import { RatingStars } from "../shared/RatingStars/RatingStars";
import { Table } from "../Table/Table";

import "./CheckoutTable.scss";

const columns = [
  { key: "product", header: "Produkti" },
  { key: "price", header: "Çmimi për njësi" },
  { key: "quantity", header: "Sasia" },
  { key: "totalPrice", header: "Çmimi total" },
];

interface Props {
  products?: Array<any> | null;
  loading?: boolean;
}
export const CheckoutTable = (props: Props) => {
  const router = useRouter();

  const rows = props.products?.map((item) => {
    const quantity = item.quantity as number;
    const productPrice = item.product?.price
      ? parseFloat(item.product.price)
      : 0;

    const productImageSourceURL = encodeURI(
      `https://management.blejgoma.com/wp-content/uploads/photos/${item?.product?.productMetas?.model}.jpg`
    );
    return {
      product: (
        <div
          className="CheckoutTable__product"
          onClick={() => router.history.push(`/product/${item.product.slug}`)}
        >
          <div className="CheckoutTable__image">
            <Image src={productImageSourceURL} alt="Order product" />
          </div>
          <div className="CheckoutTable__details">
            <div className="CheckoutTable__brand">
              {item?.product.productManufacturers?.nodes?.[0]?.name}
            </div>
            <RatingStars rate={5} />
            <p className="CheckoutTable__name">{item?.product?.name}</p>
            <p className="CheckoutTable__attributes">
              {getProductAttributes(item.product)}
            </p>
          </div>
        </div>
      ),
      price: <p className="CheckoutTable__price">{item.product?.price}</p>,
      quantity: (
        <Quantity quantity={quantity} stock={0} onChange={() => {}} disabled />
      ),
      totalPrice: (
        <p className="CheckoutTable__total">{quantity * productPrice}€</p>
      ),
    };
  });
  return (
    <div className="CheckoutTable">
      <Table columns={columns} rows={rows || []} />
    </div>
  );
};
