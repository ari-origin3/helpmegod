import { useFormik, FormikHelpers, FormikValues } from "formik";

import * as Yup from "yup";

export interface ContactFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface UseContactFormOptions {
  initialValues?: ContactFields;
  onSubmit: (
    values: FormikValues,
    formikHelpers: FormikHelpers<ContactFields>
  ) => Promise<any>;
}

export const useContactFormik = (opts: UseContactFormOptions) => {
  const ContactSchema = Yup.object().shape({
    name: Yup.string().required("Emri kërkohet"),
    email: Yup.string().required("Email kërkohet!"),
    subject: Yup.string(),
    message: Yup.string().required("Mesazhi kërkohet!"),
  });

  return useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: ContactSchema,
    onSubmit: async (values, formikHelpers) => {
      await opts.onSubmit(values, formikHelpers);
    },
  });
};

export type ContactFormik = ReturnType<typeof useContactFormik>;
