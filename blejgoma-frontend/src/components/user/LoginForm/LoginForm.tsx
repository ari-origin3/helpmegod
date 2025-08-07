import React from "react";
import { Form } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Input } from "../../shared/Input/Input";
import Button from "../../shared/Button/Button";
import { ErrorMessage } from "../../shared/ErrorMessage/ErrorMessage";

import { useLoginMutation } from "../../../graphql/generated/generated";
import {
  useAuthContext,
  UserFr,
} from "../../../lib/context/AuthContext/AuthContext";
import { useErrorHandler } from "../../../lib/hooks/useErrorHandler";
import { useLoginFormik } from "../../../lib/hooks/formik/useLoginFormik";

import "./LoginForm.scss";

export const LoginForm = () => {
  const authCtx = useAuthContext();
  const [loginMutation] = useLoginMutation();
  const errorHandler = useErrorHandler();

  const formik = useLoginFormik({
    onSubmit: async (values) => {
      try {
        const res = await loginMutation({
          variables: {
            username: values.email,
            password: values.password,
          },
        });
        const customer = res.data?.login?.customer;
        const usr = res.data?.login?.user;
        const user = { ...customer, ...usr } as UserFr;

        res.data?.login !== null
          ? authCtx.login(user)
          : errorHandler.setStringError("Gabim gjate authentikimit!");
      } catch (e) {
        errorHandler.setStringError("Email ose fjalekalimi jane gabim!");
      }
    },
  });
  return (
    <Form className="LoginForm" onSubmit={formik.handleSubmit}>
      <ErrorMessage
        errorText={errorHandler.error}
        onClose={errorHandler.reset}
      />
      <Input
        label="Email"
        id="email"
        type="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        placeholder="Email"
        invalid={!!formik.errors.email && formik.touched.email}
        error={formik.errors.email}
      />
      <Input
        label="Fjalëkalimi"
        id="password"
        name="password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        placeholder="Password"
        invalid={!!formik.errors.password && formik.touched.password}
        error={formik.errors.password}
      />

      <NavLink className="LoginForm__forgot_password" to="/forgot-password">
        Kam harruar fjalëkalimin!
      </NavLink>

      <Button
        className="LoginForm__submit_btn"
        type="submit"
        label="KYÇU"
        loading={formik.isSubmitting}
        disabled={formik.isSubmitting}
      />
    </Form>
  );
};
