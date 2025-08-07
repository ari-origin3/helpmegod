import React from "react";
import { CheckoutFormik } from "../../lib/hooks/formik/useCheckoutFormik";
import { FormWrapper } from "../FormWrapper/FormWrapper";
import Button from "../shared/Button/Button";
import { CheckBox } from "../shared/CheckBox/CheckBox";
import { Icon } from "../shared/Icon/Icon";

import "./PaymentMethodFields.scss";

interface Props {
  formik: CheckoutFormik;
  onContinueClick: React.Dispatch<React.SetStateAction<number>>;
  disableButton?: boolean;
}
export const PaymentMethodFields = (props: Props) => {
  const { formik } = props;
  return (
    <div className="PaymentMethodFields">
      <FormWrapper title="Mënyra e pagesës" className="w-100">
        <div className="PaymentMethodFields__row PaymentMethodFields__bbottom">
          <div className="PaymentMethodFields__card_icons">
            <Icon icon="mastercard" />
            <Icon icon="maestro" />
            <Icon icon="visa" />
          </div>
          <CheckBox
            className="PaymentMethodFields__checkbox"
            label="Online përmes kartës bankare"
            value={formik.values.paymentMethod === "qpc"}
            onChange={() =>
              formik.setFieldValue("paymentMethod", "qpc", true)
            }
          />
          <p className="PaymentMethodFields__description">
            Ju mund të paguani online me VISA, VISA Electron dhe MasterCard me
            të gjitha kartat e bankave vendore dhe ndërkombëtare.
          </p>
        </div>
        <div className="PaymentMethodFields__row PaymentMethodFields__bbottom">
          <Icon className="PaymentMethodFields__cod" icon="cash" />
          <CheckBox
            className="PaymentMethodFields__checkbox"
            label="Me para në dorë"
            value={formik.values.paymentMethod === "cod"}
            onChange={() => formik.setFieldValue("paymentMethod", "cod")}
          />
          <p className="PaymentMethodFields__description">
            Ju mund të paguani me para në dorë pasi të pranoni produktin tuaj.
          </p>
        </div>

        <div className="PaymentMethodFields__row ">
          <Icon className="PaymentMethodFields__pos" icon="pos-icon" />
          <CheckBox
            className="PaymentMethodFields__checkbox"
            label="POS"
            value={formik.values.paymentMethod === "other_payment"}
            onChange={() =>
              formik.setFieldValue("paymentMethod", "other_payment")
            }
          />
          <p className="PaymentMethodFields__description">
            Ju mund të paguani me Debit/Kredit kartë nga secila bankë përmes
            POS- it, të cilin do t’jua sjell postieri në momentin e pranimit të
            dërgesës nga ana e juaj.
          </p>
        </div>
        <Button
          className="RegisterForm__submit_btn"
          label="VAZHDO"
          type="button"
          onClick={() => props.onContinueClick(3)}
          disabled={props.disableButton}
        />
      </FormWrapper>
    </div>
  );
};
