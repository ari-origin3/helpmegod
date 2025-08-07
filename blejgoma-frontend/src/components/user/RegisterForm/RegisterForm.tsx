import React from "react";
import { useRegisterFormik } from "../../../lib/hooks/formik/useRegisterFormik";

//Components
import { Row, Col, Form } from "reactstrap";
import { Input } from "../../shared/Input/Input";
import Button from "../../shared/Button/Button";
import { Select } from "../../shared/Select/Select";

import {
  useGetCitiesQuery,
  useRegisterUserMutation,
} from "../../../graphql/generated/generated";
import { useErrorHandler } from "../../../lib/hooks/useErrorHandler";
import { ErrorMessage } from "../../shared/ErrorMessage/ErrorMessage";

//Style
import "./RegisterForm.scss";
import {
  useAuthContext,
  UserFr,
} from "../../../lib/context/AuthContext/AuthContext";

export const RegisterForm = () => {
  const [registerMutation] = useRegisterUserMutation();
  const { data, loading, error } = useGetCitiesQuery();
  const errorHandler = useErrorHandler();
  const authCtx = useAuthContext();

  const transformCities = data?.themeOptions?.themeOptions?.cities?.map(
    (item) => {
      return {
        label: item as string,
        value: item?.toLowerCase() as string,
      };
    }
  );

  const formik = useRegisterFormik({
    onSubmit: async (values, formikHelpers) => {
      try {
        const res = await registerMutation({
          variables: {
            name: values.name,
            surname: values.surname,
            email: values.email,
            password: values.password,
            address: values.address,
            city: values.city.value,
            phone: values.phoneNumber,
          },
        });
        const customer = {
          ...res.data?.registerCustomer?.customer,
          ...res.data?.registerCustomer?.viewer,
        } as UserFr;
        customer && authCtx.login(customer);
      } catch (e) {
        errorHandler.handleError(e);
      }
    },
  });

  return (
    <div className="RegisterForm">
      <Form onSubmit={formik.handleSubmit}>
        <ErrorMessage
          errorText={errorHandler.error}
          onClose={errorHandler.reset}
        />
        <div className="w-100">
          <Row>
            <Col xs="12" sm="6">
              <Input
                label="Emri"
                type="text"
                id="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                invalid={!!formik.errors.name && formik.touched.name}
                error={formik.errors.name}
                tabIndex={1}
              />
            </Col>
            <Col xs="12" sm="6">
              <Input
                label="Mbiemri"
                type="text"
                id="surname"
                onChange={formik.handleChange}
                value={formik.values.surname}
                invalid={!!formik.errors.surname && formik.touched.surname}
                error={formik.errors.surname}
                tabIndex={2}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="6">
              <Input
                label="Email"
                type="email"
                id="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                invalid={!!formik.errors.email && formik.touched.email}
                error={formik.errors.email}
                tabIndex={3}
              />
            </Col>
            <Col xs="12" sm="6">
              <Input
                label="Fjalekalimi"
                type="password"
                id="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                invalid={!!formik.errors.password && formik.touched.password}
                error={formik.errors.password}
                tabIndex={4}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="6">
              <Input
                label="Konfirmo fjalekalimin"
                type="password"
                id="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                invalid={
                  !!formik.errors.confirmPassword &&
                  formik.touched.confirmPassword
                }
                error={formik.errors.confirmPassword}
                tabIndex={5}
              />
            </Col>
            <Col xs="12" sm="6">
              <Input
                label="Adresa"
                type="text"
                id="address"
                onChange={formik.handleChange}
                value={formik.values.address}
                invalid={!!formik.errors.address && formik.touched.address}
                error={formik.errors.address}
                tabIndex={6}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="6">
              <Select
                className="RegisterForm__city_select"
                id="city"
                label="Qyteti"
                disabled={loading || !!error}
                options={transformCities}
                onChange={(option) => formik.setFieldValue("city", option)}
                value={formik.values.city}
                error={formik.errors.city?.label || error?.message}
                formikInvalid={!!formik.errors.city && formik.touched.city}
                tabIndex="6"
              />
            </Col>
            <Col xs="12" sm="6">
              <Input
                label="Numri i telefonit"
                type="text"
                id="phoneNumber"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                invalid={
                  !!formik.errors.phoneNumber && formik.touched.phoneNumber
                }
                error={formik.errors.phoneNumber}
                tabIndex={8}
              />
            </Col>
          </Row>

          <Button
            tabIndex={9}
            className="RegisterForm__submit_btn"
            label="Regjistrohu"
            type="submit"
            loading={formik.isSubmitting}
          ></Button>
        </div>
      </Form>
    </div>
  );
};
