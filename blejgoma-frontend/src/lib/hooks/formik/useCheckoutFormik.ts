import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";

export interface CheckoutFields {
  email: string;
  createAccount?: boolean;
  password?: string;
  passwordConfirm?: string;
  billing: {
    name: string;
    surname: string;
    address: string;
    city: { label: string; value: string };
    phoneNumber: string;
  };
  billingSameAsShipping: boolean;
  shipping: {
    name: string;
    surname: string;
    address: string;
    city: { label: string; value: string };
    phoneNumber: string;
  };
  paymentMethod: string;
}

interface UseCheckoutFormOptions {
  initialValues: CheckoutFields;
  onSubmit: (
    values: CheckoutFields,
    formikHelpers: FormikHelpers<CheckoutFields>
  ) => Promise<any>;
}

const CheckoutSchema = Yup.object().shape({
  email: Yup.string().required("Email kërkohet!"),
  createAccount: Yup.boolean(),
  // password: Yup.string().when("createAccount", {
  //   is: true,
  //   then: Yup.string().required("Fjalëkalimi kërkohet!"),
  // }),
  // passwordConfirm: Yup.string().when("createAccount", {
  //   is: true,
  //   then: Yup.string().required("Fjalëkalimi kërkohet!"),
  // }),
  billing: Yup.object().shape({
    name: Yup.string().required("Emri kërkohet!"),
    surname: Yup.string().required("Mbiemri kërkohet!"),
    address: Yup.string().required("Adresa kërkohet!"),
    city: Yup.object()
      .shape({
        label: Yup.string().required("Qyteti kërkohet!"),
        value: Yup.string(),
      })
      .required("Qyteti kërkohet!"),
    phoneNumber: Yup.string().required("Numri i telefonit kërkohet!"),
  }),
  billingSameAsShipping: Yup.boolean(),
  shipping: Yup.object().when("billingSameAsShipping", {
    is: false,
    then: Yup.object().shape({
      name: Yup.string().required("Emri kërkohet!"),
      surname: Yup.string().required("Mbiemri kërkohet!"),
      address: Yup.string().required("Adresa kërkohet!"),
      city: Yup.object()
        .shape({
          label: Yup.string().required("Qyteti kërkohet!"),
          value: Yup.string(),
        })
        .required("Qyteti kërkohet!"),
      phoneNumber: Yup.string().required("Numri i telefonit kërkohet!"),
    }),
  }),
  paymentMethod: Yup.string().required("Metoda e pagesës kërkohet!"),
});

export const useCheckoutFormik = (opts: UseCheckoutFormOptions) =>
  useFormik({
    initialValues: { ...opts.initialValues },
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: CheckoutSchema,
    onSubmit: async (values, formikHelpers) => {
      await opts.onSubmit(values, formikHelpers);
    },
  });

export type CheckoutFormik = ReturnType<typeof useCheckoutFormik>;
