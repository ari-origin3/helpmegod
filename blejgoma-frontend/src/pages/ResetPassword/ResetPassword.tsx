import React from "react";
import qs from "query-string";
import { RouteComponentProps } from "react-router-dom";

import { useResetPasswordFormik } from "../../lib/hooks/formik/useResetPasswordFormik";
import { useResetPasswordMutation } from "../../graphql/generated/generated";
import { useToast } from "../../lib/hooks/useToast";

import { FormWrapper } from "../../components/FormWrapper/FormWrapper";
import { Input } from "../../components/shared/Input/Input";
import Button from "../../components/shared/Button/Button";

//styles
import "./ResetPassword.scss";
import { ToastContent } from "../../components/shared/ToastContent/ToastContent";

interface Props {}

export const ResetPassword = (props: RouteComponentProps<Props>) => {
  const [resetPassword] = useResetPasswordMutation();
  const { addToast } = useToast();

  const params = qs.parse(props.location.search) as {
    key: string;
    login: string;
  };

  const formik = useResetPasswordFormik({
    onSubmit: async (values) => {
      console.log(values.password);
      if (!params.key || !params.login) {
        return addToast("Mungojnë parametrat!", { appearance: "error" });
      }

      try {
        await resetPassword({
          variables: {
            key: params.key,
            email: params.login,
            password: values.password,
          },
        });

        addToast(
          <ToastContent
            description="Fjalëkalimi u ndërrua me sukses."
            linkDescription="Kyçuni"
            linkPath="/login"
          />,
          { appearance: "success" }
        );
      } catch (e) {
        addToast("Problem gjatë rivendosjes së fjalëkalimit!", {
          appearance: "error",
        });
      }
    },
  });

  return (
    <div className="ResetPassword">
      <FormWrapper
        className="ResetPassword__wrapper"
        title="Rivendos fjalëkalimin"
      >
        <form onSubmit={formik.handleSubmit}>
          <Input
            name="password"
            label="Fjalëkalimi i ri"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            invalid={!!formik.errors.password && formik.touched.password}
            error={formik.errors.password}
          />
          <Input
            name="confirmPassword"
            type="password"
            label="Konfirmo fjalëkalimin e ri"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            invalid={
              !!formik.errors.confirmPassword && formik.touched.confirmPassword
            }
            error={formik.errors.confirmPassword}
          />
          <Button label="Ndrysho" type="submit" loading={formik.isSubmitting} />
        </form>
      </FormWrapper>
    </div>
  );
};
