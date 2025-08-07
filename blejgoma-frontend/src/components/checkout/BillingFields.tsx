import React from "react";
import { Col, Row } from "reactstrap";
import { useGetCitiesQuery } from "../../graphql/generated/generated";
import { CheckoutFormik } from "../../lib/hooks/formik/useCheckoutFormik";

import { FormWrapper } from "../FormWrapper/FormWrapper";
import Button from "../shared/Button/Button";
import { CheckBox } from "../shared/CheckBox/CheckBox";
import { Input } from "../shared/Input/Input";
import { Select } from "../shared/Select/Select";

import "./BillingFields.scss";

interface Props {
  formik: CheckoutFormik;
  onContinueClick: React.Dispatch<React.SetStateAction<number>>;
  disableButton?: boolean;
}
export const BillingFields = (props: Props) => {
  const { formik } = props;
  const { data, loading, error } = useGetCitiesQuery();

  const transformCities = data?.themeOptions?.themeOptions?.cities?.map(
    (item) => {
      return {
        label: item as string,
        value: item?.toLowerCase() as string,
      };
    }
  );

  return (
    <div className="BillingFields">
      <FormWrapper title="Adresa e faturimit">
        <Row>
          <Col xs="12" sm="6">
            <Input
              tabIndex={1}
              label="Emri"
              type="text"
              id="billing.name"
              value={formik.values.billing.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={
                !!formik.errors.billing?.name && formik.touched.billing?.name
              }
              error={formik.errors.billing?.name}
            />
            <Input
              tabIndex={3}
              label="Email"
              type="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              invalid={!!formik.errors.email && formik.touched.email}
              error={formik.errors.email}
            />
            {formik.values.createAccount && (
              <Input
                tabIndex={5}
                label="Konfirmo fjalekalimin"
                type="password"
                id="passwordConfirm"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirm}
                invalid={
                  !!formik.errors.passwordConfirm &&
                  formik.touched.passwordConfirm
                }
                error={formik.errors.passwordConfirm}
              />
            )}
            <Select
              tabIndex="7"
              className="RegisterForm__city_select"
              id="city"
              label="Qyteti"
              disabled={loading || !!error}
              options={transformCities}
              onChange={(option) =>
                formik.setFieldValue("billing.city", option)
              }
              value={formik.values.billing?.city}
              error={formik.errors.billing?.city?.label || error?.message}
              formikInvalid={
                !!formik.errors.billing?.city && formik.touched.billing?.city
              }
            />
          </Col>
          <Col xs="12" sm="6">
            <Input
              tabIndex={2}
              label="Mbiemri"
              type="text"
              id="billing.surname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.billing.surname}
              invalid={
                !!formik.errors.billing?.surname &&
                formik.touched.billing?.surname
              }
              error={formik.errors.billing?.surname}
            />

            {formik.values.createAccount && (
              <Input
                tabIndex={4}
                label="Fjalekalimi"
                type="password"
                id="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                invalid={!!formik.errors.password && formik.touched.password}
                error={formik.errors.password}
              />
            )}
            <Input
              tabIndex={6}
              label="Adresa"
              type="text"
              id="billing.address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.billing.address}
              invalid={
                !!formik.errors.billing?.address &&
                formik.touched.billing?.address
              }
              error={formik.errors.billing?.address}
            />
            <Input
              tabIndex={8}
              label="Numri i telefonit"
              type="text"
              id="billing.phoneNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.billing.phoneNumber}
              invalid={
                !!formik.errors.billing?.phoneNumber &&
                formik.touched.billing?.phoneNumber
              }
              error={formik.errors.billing?.phoneNumber}
            />
          </Col>
          <div className="BillingFields__shipping_address">
            <p>A është adresa e transportit dhe adresa e faturimit e njëjtë?</p>
            <div className="BillingFields_wrapper">
              <CheckBox
                label="Po"
                value={formik.values.billingSameAsShipping}
                onChange={(e) => {
                  formik.setFieldValue("billingSameAsShipping", true, true);
                }}
              />
              <CheckBox
                label="Jo"
                value={!formik.values.billingSameAsShipping}
                onChange={(e) => {
                  formik.setFieldValue("billingSameAsShipping", false, true);
                }}
              />
            </div>
          </div>

          {formik.values.billingSameAsShipping && (
            <Button
              className="RegisterForm__submit_btn"
              label="Vazhdo"
              type="button"
              onClick={() => props.onContinueClick(2)}
              disabled={props.disableButton}
            />
          )}
        </Row>
      </FormWrapper>

      {!formik.values.billingSameAsShipping && (
        <FormWrapper title="Adresa e transportit" className="w-100">
          <Row>
            <Col xs="12" sm="6">
              <Input
                id="shipping.name"
                label="Emri"
                value={formik.values.shipping.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                invalid={
                  !!formik.errors.shipping?.name &&
                  formik.touched.shipping?.name
                }
                error={formik.errors.shipping?.name}
              />
            </Col>
            <Col xs="12" sm="6">
              <Input
                id="shipping.surname"
                label="Mbiemri"
                value={formik.values.shipping.surname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                invalid={
                  !!formik.errors.shipping?.surname &&
                  formik.touched.shipping?.surname
                }
                error={formik.errors.shipping?.surname}
              />
            </Col>
          </Row>
          <Input
            id="shipping.address"
            label="Adresa"
            value={formik.values.shipping.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            invalid={
              !!formik.errors.shipping?.address &&
              formik.touched.shipping?.address
            }
            error={formik.errors.shipping?.address}
          />
          <Select
            tabIndex="7"
            className="RegisterForm__city_select"
            id="city"
            label="Qyteti"
            disabled={loading || !!error}
            options={transformCities}
            onChange={(option) => formik.setFieldValue("shipping.city", option)}
            value={formik.values.shipping?.city}
            error={formik.errors.shipping?.city?.label || error?.message}
            formikInvalid={
              !!formik.errors.shipping?.city && formik.touched.shipping?.city
            }
          />
          <Input
            id="shipping.phoneNumber"
            label="Numri i telefonit"
            value={formik.values.shipping.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            invalid={
              !!formik.errors.shipping?.phoneNumber &&
              formik.touched.shipping?.phoneNumber
            }
            error={formik.errors.shipping?.phoneNumber}
          />
          <Button
            className="RegisterForm__submit_btn"
            label="VAZHDO"
            type="button"
            onClick={() => props.onContinueClick(2)}
            disabled={props.disableButton}
          />
        </FormWrapper>
      )}
    </div>
  );
};
