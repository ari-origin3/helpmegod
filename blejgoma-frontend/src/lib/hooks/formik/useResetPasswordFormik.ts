import { useFormik, FormikHelpers, FormikValues } from "formik";

import * as Yup from "yup";

export interface ResetPasswordFields {
  password: string;
  confirmPassword: string;
}

interface UseLoginFormOptions {
  initialValues?: ResetPasswordFields;
  onSubmit: (
    values: FormikValues,
    formikHelpers: FormikHelpers<ResetPasswordFields>
  ) => Promise<any>;
}

export const useResetPasswordFormik = (opts: UseLoginFormOptions) => {
  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string().required("Fjalekalimi kërkohet!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Fjalekalimi nuk perputhet!")
      .required("Konfirmo fjalekalimin!"),
  });

  return useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, formikHelpers) => {
      await opts.onSubmit(values, formikHelpers);
    },
  });
};

export type ResetPasswordFormik = ReturnType<typeof useResetPasswordFormik>;
