import React from "react";
import { Col, Form, Row } from "reactstrap";
import { useGetCitiesQuery } from "../../../graphql/generated/generated";
import { FormWrapper } from "../../FormWrapper/FormWrapper";
import Button from "../../shared/Button/Button";
import { Input } from "../../shared/Input/Input";
import { Select } from "../../shared/Select/Select";

import "./AddressForm.scss";
interface Props {
  formik: any;
}
export const AddressForm = (props: Props) => {
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
    <Form className="AddressForm" onSubmit={formik.handleSubmit}>
      <FormWrapper className="AddressForm__wrapper" title="Adresa e faturimit">
        <Row>
          <Col>
            <Input
              id="billing.firstName"
              label="Emri"
              value={formik.values.billing.firstName}
              onChange={formik.handleChange}
            />
          </Col>
          <Col>
            <Input
              id="billing.lastName"
              label="Mbiemri"
              value={formik.values.billing.lastName}
              onChange={formik.handleChange}
            />
          </Col>
        </Row>
        <Input
          id="billing.address"
          label="Adresa"
          value={formik.values.billing.address}
          onChange={formik.handleChange}
        />
        <Select
          className="AddressForm__city_select"
          id="billing.city"
          label="Qyteti"
          disabled={loading || !!error}
          options={transformCities}
          onChange={(option) =>
            formik.setFieldValue("billing.city", option, true)
          }
          value={formik.values.billing.city}
          error={formik.errors?.billing?.city?.label || error?.message}
          formikInvalid={
            !!formik.errors?.billing?.city && formik.touched.billing?.city
          }
        />
        <Input
          id="billing.phoneNumber"
          label="Numri i telefonit"
          value={formik.values.billing.phoneNumber}
          onChange={formik.handleChange}
        />
      </FormWrapper>
      <FormWrapper className="AddressForm__wrapper" title="Adresa e dërgesës">
        <Row>
          <Col>
            <Input
              id="shipping.firstName"
              label="Emri"
              value={formik.values.shipping.firstName}
              onChange={formik.handleChange}
            />
          </Col>
          <Col>
            <Input
              id="shipping.lastName"
              label="Mbiemri"
              value={formik.values.shipping.lastName}
              onChange={formik.handleChange}
            />
          </Col>
        </Row>
        <Input
          id="shipping.address"
          label="Adresa"
          value={formik.values.shipping.address}
          onChange={formik.handleChange}
        />
        <Select
          className="AddressForm__city_select"
          id="shipping.city"
          label="Qyteti"
          disabled={loading || !!error}
          options={transformCities}
          onChange={(option) =>
            formik.setFieldValue("shipping.city", option, true)
          }
          value={formik.values.shipping.city}
          error={formik.errors?.shipping?.city?.label || error?.message}
          formikInvalid={
            !!formik.errors?.shipping?.city && formik.touched.shipping?.city
          }
        />
        <Button
          className="ProfileForm__submit_btn"
          disabled={!formik.dirty}
          label="Ndrysho"
          loading={formik.isSubmitting}
        />
      </FormWrapper>
    </Form>
  );
};
