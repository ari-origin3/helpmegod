import React, { useState } from "react";
import { Form } from "reactstrap";
import { useContactFormik } from "../../lib/hooks/formik/useContactFormik";
import Button from "../shared/Button/Button";
import { Input } from "../shared/Input/Input";
import { useContactFormMutation } from "../../graphql/generated/generated";

import "./ContactForm.scss";

export const ContactForm = () => {
  const [contactFormMutation] = useContactFormMutation();
  const [submitMessage, setSubmitMessage] = useState("");

  const formik = useContactFormik({
    onSubmit: async (values) => {
      try {
        const res = await contactFormMutation({
          variables: {
            name: values.name,
            email: values.email,
            message: values.message,
          },
        });

        res.data?.contactForm?.message &&
          setSubmitMessage(res.data?.contactForm?.message);

        setTimeout(() => setSubmitMessage(""), 5000);
      } catch (e) {}
    },
  });

  return (
    <Form className="ContactForm" onSubmit={formik.handleSubmit}>
      <Input
        className="ContactForm__input"
        label="Emri"
        id="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        invalid={!!formik.errors.name}
        error={formik.errors.name}
      />

      <Input
        className="ContactForm__input"
        label="Email"
        id="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        invalid={!!formik.errors.email}
        error={formik.errors.email}
      />

      <Input
        className="ContactForm__input"
        label="Subject"
        id="subject"
        value={formik.values.subject}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        invalid={!!formik.errors.subject}
        error={formik.errors.subject}
      />
      <Input
        className="ContactForm__input"
        label="Message"
        id="message"
        type="textarea"
        value={formik.values.message}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        invalid={!!formik.errors.message}
        error={formik.errors.message}
      />
      <Button
        className="ContactForm__button"
        type="submit"
        label="Dërgo"
        loading={formik.isSubmitting}
      />
      <p className="ContactForm__message">{submitMessage}</p>
    </Form>
  );
};
