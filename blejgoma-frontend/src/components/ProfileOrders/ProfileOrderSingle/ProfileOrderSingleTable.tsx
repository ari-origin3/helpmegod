import { LineItem, SimpleProduct } from "../../../graphql/generated/generated";
import { getProductAttributes } from "../../../lib/helpers/getProductAttributes";
import { Quantity } from "../../cart/Quantity/Quantity";
import { Image } from "../../shared/Image/Image";
import { RatingStars } from "../../shared/RatingStars/RatingStars";
import { Table } from "../../Table/Table";

//styles
import "./ProfileOrderSingleTable.scss";

interface Props {
  lineItems: LineItem[];
  loading: boolean;
  shippingPrice: string;
}

export const ProfileOrderSingleTable = (props: Props) => {
  const { lineItems, loading } = props;

  const columns = [
    { key: "product", header: "Produkti" },
    { key: "price", header: "Çmimi për njësi" },
    { key: "quantity", header: "Sasia" },
    { key: "totalPrice", header: "Çmimi total" },
  ];

  const rows = lineItems?.map((item) => {
    const product = item.product as SimpleProduct;
    const quantity = item.quantity as number;
    const productPrice = product?.price ? parseFloat(product.price) : 0;

    const productImageSourceURL = encodeURI(
      `https://management.blejgoma.com/wp-content/uploads/photos/${product?.productMetas?.model}.jpg`
    );
    return {
      product: (
        <div className="ProfileOrderSingle__product">
          <div className="ProfileOrderSingle__image">
            <Image src={productImageSourceURL} alt="Produkt" />
          </div>
          <div className="ProfileOrderSingle__details">
            <div className="ProfileOrderSingle__brand">
              {product?.productManufacturers?.nodes?.[0]?.name}
            </div>
            <RatingStars rate={5} />
            <p className="ProfileOrderSingle__name">{product?.name}</p>
            <p className="ProfileOrderSingle__attributes">
              {getProductAttributes(product)}
            </p>
          </div>
        </div>
      ),
      price: <p className="ProfileOrderSingle__price">{product?.price}</p>,
      quantity: (
        <Quantity quantity={quantity} stock={0} onChange={() => {}} disabled />
      ),

      totalPrice: (
        <p className="ProfileOrderSingle__total">{quantity * productPrice}€</p>
      ),
    };
  });

  return (
    <div className="ProfileOrderSingle">
      <Table columns={columns} rows={rows} loading={loading} divideRow />
    </div>
  );
};
