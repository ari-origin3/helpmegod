import { useFormik, FormikHelpers, FormikValues } from "formik";

import * as Yup from "yup";

export interface LoginFields {
  email: string;
  password: string;
}

interface UseLoginFormOptions {
  initialValues?: LoginFields;
  onSubmit: (
    values: FormikValues,
    formikHelpers: FormikHelpers<LoginFields>
  ) => Promise<any>;
}

export const useLoginFormik = (opts: UseLoginFormOptions) => {
  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email kërkohet!"),
    password: Yup.string().required("Fjalekalimi kërkohet!"),
  });

  return useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: LoginSchema,
    onSubmit: async (values, formikHelpers) => {
      await opts.onSubmit(values, formikHelpers);
    },
  });
};

export type LoginFormik = ReturnType<typeof useLoginFormik>;
