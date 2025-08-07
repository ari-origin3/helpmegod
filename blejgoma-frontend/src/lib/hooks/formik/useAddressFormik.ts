import { useFormik } from "formik";
import * as Yup from "yup";
import { useGetUserAddressesQuery } from "../../../graphql/generated/generated";
import { useAuthContext } from "../../context/AuthContext/AuthContext";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter";

export interface AddressFormikFields {
  billing: {
    firstName: string;
    lastName: string;
    address: string;
    city: { label: string; value: string };
    phoneNumber: string;
  };
  shipping: {
    firstName: string;
    lastName: string;
    address: string;
    city: { label: string; value: string };
  };
}

interface UseAddressFormikOptions {
  initialValues?: AddressFormikFields;
  onSubmit: (values: AddressFormikFields) => Promise<any>;
}

const AddressSchema = Yup.object().shape({
  billing: Yup.object({
    firstName: Yup.string(),
    lastName: Yup.string(),
    address: Yup.string(),
    city: Yup.object().shape({
      label: Yup.string(),
      value: Yup.string(),
    }),
    phoneNumber: Yup.string(),
  }),
  shipping: Yup.object({
    firstName: Yup.string(),
    lastName: Yup.string(),
    address: Yup.string(),
    city: Yup.object().shape({
      label: Yup.string(),
      value: Yup.string(),
    }),
  }),
});

export const useAddressFormik = (options: UseAddressFormikOptions) => {
  const authCtx = useAuthContext();
  const { data } = useGetUserAddressesQuery({
    variables: { id: authCtx?.user?.id },
  });

  return useFormik({
    initialValues: {
      billing: {
        firstName: data?.customer?.billing?.firstName || "",
        lastName: data?.customer?.billing?.lastName || "",
        address: data?.customer?.billing?.address1 || "",
        city: {
          label: capitalizeFirstLetter(data?.customer?.billing?.city as string),
          value: data?.customer?.billing?.city || "",
        } || { label: "", value: "" },
        phoneNumber: data?.customer?.billing?.phone || "",
      },
      shipping: {
        firstName: data?.customer?.shipping?.firstName || "",
        lastName: data?.customer?.shipping?.lastName || "",
        address: data?.customer?.shipping?.address1 || "",
        city: {
          label: capitalizeFirstLetter(
            data?.customer?.shipping?.city as string
          ),
          value: data?.customer?.shipping?.city || "",
        } || { label: "", value: "" },
      },
      ...options.initialValues,
    },
    enableReinitialize: true,
    validationSchema: AddressSchema,
    validateOnBlur: true,
    onSubmit: async (values) => {
      await options.onSubmit(values);
    },
  });
};
