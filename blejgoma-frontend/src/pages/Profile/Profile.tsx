import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Container } from "reactstrap";

import {
  useUpdateAddressMutation,
  useUpdateProfileMutation,
} from "../../graphql/generated/generated";

import { useAddressFormik } from "../../lib/hooks/formik/useAddressFormik";
import { useProfileFormik } from "../../lib/hooks/formik/useProfileFormik";
import { useToast } from "../../lib/hooks/useToast";
import { useAuthContext } from "../../lib/context/AuthContext/AuthContext";

import { Banner } from "../../components/Banner/Banner";
import { CheckoutTabs } from "../../components/checkout/CheckoutTabs";
import { AddressForm } from "../../components/user/ProfileForm/AddressForm";
import { ProfileForm } from "../../components/user/ProfileForm/ProfileForm";

//styles
import "./Profile.scss";

interface Props {}

export const Profile = (props: RouteComponentProps<Props>) => {
  const [activeTab, setActiveTab] = useState(0);

  const authCtx = useAuthContext();
  const [updateProfile] = useUpdateProfileMutation();
  const [updateAdress] = useUpdateAddressMutation();

  const { addToast } = useToast();

  const profileFormik = useProfileFormik({
    onSubmit: async (values) => {
      try {
        await updateProfile({
          variables: {
            id: authCtx.user?.id,
            firstName: values.name,
            lastName: values.surname,
            email: values.email,
            telephone: values.phoneNumber,
          },
        });
        addToast("Të dhënat personale u ndryshuan me sukses!", {
          appearance: "success",
        });
      } catch (e) {
        addToast("Problem gjatë ndryshimit të të dhënave personale!", {
          appearance: "error",
        });
      }
    },
  });
  const addressFormik = useAddressFormik({
    onSubmit: async (values) => {
      try {
        await updateAdress({
          variables: {
            id: authCtx.user?.id,
            billingFirstName: values.billing.firstName,
            billingLastName: values.billing.lastName,
            billingAddress: values.billing.address,
            billingPhone: values.billing.phoneNumber,
            billingCity: values.billing.city.value,
            shippingFirstName: values.shipping.firstName,
            shippingLastName: values.shipping.lastName,
            shippingAddress: values.shipping.address,
            shippingCity: values.shipping.city.value,
          },
        });

        addToast("Adresa u ndryshua me sukses!", {
          appearance: "success",
        });
      } catch (e) {
        addToast("Problem gjatë ndryshimit të adreses!", {
          appearance: "error",
        });
      }
    },
  });

  const tabs = [
    {
      index: 0,
      label: "Profili im",
      component: <ProfileForm formik={profileFormik} />,
    },
    {
      index: 1,
      label: "Adresa",
      component: <AddressForm formik={addressFormik} />,
    },
  ];

  return (
    <div className="Profile">
      <Banner />
      <Container>
        <CheckoutTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabClick={setActiveTab}
        />

        {tabs.find((tab) => tab.index === activeTab)?.component}
      </Container>
    </div>
  );
};
