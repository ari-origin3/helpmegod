import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";

export interface RegisterFields {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  city: { label: string; value: string };
  phoneNumber: string;
  address: string;
}

interface UseRegisterFormOptions {
  initialValues?: RegisterFields;
  onSubmit: (
    values: RegisterFields,
    formikHelpers: FormikHelpers<RegisterFields>
  ) => Promise<any>;
}

export const useRegisterFormik = (options: UseRegisterFormOptions) => {
  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("Emri kërkohet!"),
    surname: Yup.string().required("Mbiemri kërkohet!"),
    email: Yup.string()
      .email("Ju lutemi shkruani një email valid!")
      .required("Email kërkohet!"),
    password: Yup.string()
      .min(6, "Fjalekalimi duhet të jetë më i gjatë se 6 shkronja!")
      .required("Fjalekalimi kërkohet!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Fjalekalimi nuk perputhet!")
      .required("Konfirmo fjalekalimin!"),
    address: Yup.string().required("Adresa kërkohet!"),
    city: Yup.object()
      .shape({
        label: Yup.string().required("Qyteti kërkohet!"),
        value: Yup.string(),
      })
      .required("Qyteti kërkohet!"),
    phoneNumber: Yup.string().required("Numri i telefonit kërkohet!"),
  });

  return useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
      city: {
        label: "",
        value: "",
      },
      phoneNumber: "",
      address: "",
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: RegisterSchema,
    onSubmit: async (values, formikHelpers) => {
      await options.onSubmit(values, formikHelpers);
    },
  });
};

export type RegisterFormik = ReturnType<typeof useRegisterFormik>;
