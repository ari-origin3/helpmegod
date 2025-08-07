import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Container } from "reactstrap";
import { Banner } from "../../components/Banner/Banner";
import { FormWrapper } from "../../components/FormWrapper/FormWrapper";
import Button from "../../components/shared/Button/Button";
import { Input } from "../../components/shared/Input/Input";
import { useForgotPasswordMutation } from "../../graphql/generated/generated";
import { useToast } from "../../lib/hooks/useToast";

//styles
import "./ForgotPassword.scss";

interface Props {}

export const ForgotPassword = (props: RouteComponentProps<Props>) => {
  const { addToast } = useToast();
  const [resetPasswordMutation, { loading }] = useForgotPasswordMutation();

  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (!email) return;

    try {
      await resetPasswordMutation({ variables: { username: email } });
      addToast("Emaili për rivendosjen e fjalëkalimit u dërgua me sukses.", {
        appearance: "success",
      });
    } catch (e) {
      addToast("Gabim gjatë dërgimit të email-it!", { appearance: "error" });
    } finally {
      setEmail("");
    }
  };
  return (
    <div className="ForgotPassword">
      <Banner />
      <Container>
        <FormWrapper
          className="ForgotPassword__wrapper"
          title="Kam harruar fjalëkalimin"
        >
          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="ForgotPassword__info">
            Në emailin që keni dhënë këtu do të pranoni linkun ku duhet t'i
            ndiqni hapat për rivendosje të fjalëkalimit
          </p>
          <Button label="DËRGO" loading={loading} onClick={handleSubmit} />
        </FormWrapper>
      </Container>
    </div>
  );
};
