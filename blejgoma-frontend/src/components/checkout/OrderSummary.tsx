import { useCartContext } from "../../lib/context/CartContext/CartContext";
import { useCartSummary } from "../../lib/hooks/cart/useCartSummary";
import { CheckoutFormik } from "../../lib/hooks/formik/useCheckoutFormik";
import { useSkeleton } from "../../lib/hooks/useSkeleton";
import { CartProductsTable } from "../cart/CartProductsTable/CartProductsTable";
import { CartSummary, SummaryRowType } from "../cart/CartSummary/CartSummary";
import { Icon } from "../shared/Icon/Icon";

import "./OrderSummary.scss";

interface Props {
  formik: CheckoutFormik;
}

export const OrderSummary = (props: Props) => {
  const { formik } = props;
  const { isLoading } = useCartContext();

  const s = useSkeleton(isLoading, {
    width: "50px",
    style: { color: "white" },
  });
  const { shippingPrice, subTotal, total } = useCartSummary();

  const data: SummaryRowType[] = [
    { label: "Shuma e përfshirë", value: <span>{s(subTotal)}</span> },
    { label: "Çmimi per transport", value: <span>{s(shippingPrice)}</span> },
    {
      label: "Koha e dërgesës",
      value: <div className="OrderSummary--break">48h pas konfirmimit</div>,
    },
    {
      label: "Metoda e pagesës",
      value: (
        <div className="OrderSummary--break">
          <div className="OrderSummary__bank_icons ">
            {formik.values.paymentMethod === "cod" ? (
              <>
                <p className="OrderSummary__payment_method">Me para në dorë</p>
                <Icon icon="cash" />
              </>
            ) : formik.values.paymentMethod === "qpc" ? (
              <>
                <p className="OrderSummary__payment_method">Me kartë bankare</p>
                <Icon icon="maestro" />
                <Icon icon="mastercard" />
                <Icon icon="visa" />
              </>
            ) : (
              <>
                <p className="OrderSummary__payment_method">Me POS</p>
                <Icon icon="pos-icon" />
              </>
            )}
          </div>
        </div>
      ),
    },
    {
      label: "Adresa e faturimit",
      value: (
        <div className="OrderSummary--break lh-sm">
          <p>{`${formik.values.billing.name} ${formik.values.billing.surname}`}</p>
          <p>{formik.values.billing.phoneNumber}</p>
          <p>{formik.values.email}</p>
          <p>{`${formik.values.billing.address}, ${formik.values.billing.city.label}`}</p>
        </div>
      ),
    },
    {
      label: "Duke përfshirë zbritjen",
      value: <span>{s(total)}</span>,
      highlight: true,
    },
    {
      label: "TOTALI",
      value: <span>{s(total)}</span>,
      big: true,
    },
  ];

  return (
    <div className="OrderSummary">
      <div className="OrderSummary__right">
        <h4 className="OrderSummary__heading">Përmbledhje</h4>
        <CartProductsTable disableRowDelete />
      </div>
      <div>
        <CartSummary
          data={data}
          // buttonLabel="VAZHDO ytewyr"
          buttonLabel="VAZHDO"
          buttonType="submit"
          buttonLoading={formik.isSubmitting}
        />
      </div>
    </div>
  );
};
