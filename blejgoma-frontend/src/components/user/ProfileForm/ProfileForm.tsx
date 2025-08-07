import React from "react";
import { Col, Form, Row } from "reactstrap";
import { ProfileFormik } from "../../../lib/hooks/formik/useProfileFormik";
import { FormWrapper } from "../../FormWrapper/FormWrapper";
import Button from "../../shared/Button/Button";
import { Input } from "../../shared/Input/Input";

import "./ProfileForm.scss";
interface Props {
  formik: ProfileFormik;
}
export const ProfileForm = (props: Props) => {
  const { formik } = props;
  return (
    <Form className="ProfileForm" onSubmit={formik.handleSubmit}>
      <FormWrapper className="ProfileForm__wrapper" title="Profili im">
        <Row>
          <Col>
            <Input
              id="name"
              label="Emri"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Col>
          <Col>
            <Input
              id="surname"
              label="Mbiemri"
              value={formik.values.surname}
              onChange={formik.handleChange}
            />
          </Col>
        </Row>
        <Input
          id="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <Input
          id="phoneNumber"
          label="Numri i telefonit"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
        />
        <Button
          className="ProfileForm__submit_btn"
          label="Ndrysho"
          loading={formik.isSubmitting}
        />
      </FormWrapper>
    </Form>
  );
};
