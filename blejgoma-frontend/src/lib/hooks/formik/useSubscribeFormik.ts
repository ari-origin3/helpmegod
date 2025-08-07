import { useFormik, FormikHelpers, FormikValues } from "formik";

import * as Yup from "yup";

export interface SubscribeField {
  email: string;
}

interface UseSubscribeInputOptions {
  initialValues?: SubscribeField;
  onSubmit: (
    value: FormikValues,
    formikHelpers: FormikHelpers<SubscribeField>
  ) => Promise<any>;
}

export const useSubscribeFormik = (opts: UseSubscribeInputOptions) => {
  const SubscribeSchema = Yup.object().shape({
    email: Yup.string()
      .email("Ju lutem shkruani një email valid!")
      .required("Email kërkohet!"),
  });

  return useFormik({
    initialValues: {
      email: "",
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: SubscribeSchema,
    onSubmit: async (value, formikHelpers) => {
      await opts.onSubmit(value, formikHelpers);
    },
  });
};

export type SubscribeFormik = ReturnType<typeof useSubscribeFormik>;
