import { Container } from "reactstrap";
import {
  CartSummary,
  SummaryRowType,
} from "../../components/cart/CartSummary/CartSummary";
import { useCartContext } from "../../lib/context/CartContext/CartContext";
import { useCartSummary } from "../../lib/hooks/cart/useCartSummary";
import { useSkeleton } from "../../lib/hooks/useSkeleton";
import { useRouter } from "../../lib/hooks/useRouter";
import { Banner } from "../../components/Banner/Banner";
import { CartProductsTable } from "../../components/cart/CartProductsTable/CartProductsTable";
import { AddCoupon } from "../../components/cart/AddCoupon/AddCoupon";
import { Coupons } from "../../components/cart/Coupons/Coupons";
import { Icon } from "../../components/shared/Icon/Icon";
import { Maybe } from "graphql/jsutils/Maybe";

import "./Cart.scss";

export const Cart = () => {
  const router = useRouter();
  const { shippingPrice, subTotal, discount, total } = useCartSummary();
  const {
    isDeleting,
    isUpdating,
    isLoading,
    isApplyingCoupon,
    isRemovingCoupon,
  } = useCartContext();

  const s = useSkeleton(isLoading, {
    width: "50px",
    style: { color: "white" },
  });

  const data: SummaryRowType[] = [
    { label: "Shuma e përfshirë", value: <span>{s(subTotal)}</span> },
    { label: "Çmimi per transport", value: <span>{s(shippingPrice)}</span> },
    {
      label: "Kodi Promocional",
      value: (
        <div className="w-100 mt-2">
          <AddCoupon />
          <Coupons className="CartSummary__applied_coupons" />
        </div>
      ),
    },
    {
      label: "Metoda e pagesës",
      value: (
        <div className="CartSummary__payment_methods">
          <Icon icon="mastercard" />
          <Icon icon="maestro" />
          <Icon icon="visa" />
          <Icon icon="cash" />
        </div>
      ),
    },
    {
      label: "Duke përfshirë zbritjen",
      value: <span>{s(total)}</span>,
      highlight: true,
      hide: removeCurrencyAndParseInt(discount) === 0,
    },
    { label: "TOTALI", value: <span>{s(total)}</span>, big: true },
  ];

  const disableContinueButton =
    !!isDeleting ||
    !!isUpdating ||
    !!isApplyingCoupon ||
    !!isRemovingCoupon ||
    parseFloat(total) === 0;

  return (
    <div className="Cart">
      <Banner />
      <Container>
        <div className="Cart__wrapper">
          <div className="Cart__left">
            <h4 className="Cart__heading">Shporta e blerjes</h4>
            <div className="Cart__products">
              <CartProductsTable />
            </div>
          </div>
          <div className="Cart__right">
            <CartSummary
              buttonLabel="VAZHDO ME BLERJE"
              data={data}
              disableButton={disableContinueButton}
              onButtonClick={() => router.history.push("/checkout")}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

function removeCurrencyAndParseInt(price: Maybe<string>) {
  if (!price) return;
  return parseInt(price.slice(0, -1));
}
