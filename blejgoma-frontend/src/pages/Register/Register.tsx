import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Container } from "reactstrap";
import { Banner } from "../../components/Banner/Banner";
import { FormWrapper } from "../../components/FormWrapper/FormWrapper";
import { RegisterForm } from "../../components/user/RegisterForm/RegisterForm";

//styles
import "./Register.scss";

interface Props {}

export const Register = (props: RouteComponentProps<Props>) => {
  return (
    <div className="Register">
      <Banner className="Login__banner" />
      <Container>
        <FormWrapper className="Register__form_wrapper" title="Regjistrohu">
          <RegisterForm />
        </FormWrapper>
      </Container>
    </div>
  );
};
