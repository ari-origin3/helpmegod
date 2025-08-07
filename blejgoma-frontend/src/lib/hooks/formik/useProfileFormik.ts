import { FormikHelpers, useFormik } from "formik";
import { useAuthContext } from "../../context/AuthContext/AuthContext";

interface ProfileFormFields {
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
}

interface UseProfileFormOptions {
  initialValues?: ProfileFormFields;
  onSubmit: (
    values: ProfileFormFields,
    formikHelpers: FormikHelpers<ProfileFormFields>
  ) => Promise<any>;
}

export const useProfileFormik = (options: UseProfileFormOptions) => {
  const authCtx = useAuthContext();
  return useFormik({
    initialValues: {
      name: authCtx.user?.firstName || "",
      surname: authCtx.user?.lastName || "",
      phoneNumber: authCtx.user?.billing?.phone || "",
      email: authCtx.user?.email || "",
      ...options.initialValues,
    },
    enableReinitialize: true,
    onSubmit: async (values, formikHelpers) => {
      await options.onSubmit(values, formikHelpers);
    },
  });
};

export type ProfileFormik = ReturnType<typeof useProfileFormik>;
