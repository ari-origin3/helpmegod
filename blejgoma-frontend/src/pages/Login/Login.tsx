import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Container } from "reactstrap";

import { Banner } from "../../components/Banner/Banner";
import { FormWrapper } from "../../components/FormWrapper/FormWrapper";
import Button from "../../components/shared/Button/Button";
import { LoginForm } from "../../components/user/LoginForm/LoginForm";
import { useRouter } from "../../lib/hooks/useRouter";
// import { ReactComponent as FacebookIcon } from "../../assets/icons/facebook.svg";
import "./Login.scss";
interface Props {}

export const Login = (props: RouteComponentProps<Props>) => {
  const router = useRouter();

  return (
    <div className="Login">
      <Banner className="Login__banner" />
      <Container className="Login__container">
        <FormWrapper className="Login__form_wrapper" title="Kyçu">
          <LoginForm />
        </FormWrapper>
        <FormWrapper className="Login__register_section">
          <Button
            className="Login__register_btn"
            label="Regjistrohu"
            onClick={() => router.history.push("/register")}
          />
          {/* <p className="Login__socials">ose kyçu përmes rrjeteve sociale</p>
          <div className="Login__fb_icon">
            <FacebookIcon />
          </div> */}
        </FormWrapper>
      </Container>
    </div>
  );
};
