import React, { useState } from "react";
import { Form } from "reactstrap";
import { writeStorage } from "@rehooks/local-storage";

import { BillingFields } from "./BillingFields";
import {
  useCheckoutFormik,
  CheckoutFields,
} from "../../lib/hooks/formik/useCheckoutFormik";
import { PaymentMethodFields } from "./PaymentMethodFields";
import {
  GetCartDocument,
  useCheckoutMutation,
  useGetUserAddressesQuery,
} from "../../graphql/generated/generated";

import {
  useAuthContext,
  UserFr,
} from "../../lib/context/AuthContext/AuthContext";
import { OrderSummary } from "./OrderSummary";
import { useCartContext } from "../../lib/context/CartContext/CartContext";
import { CheckoutTabs, CheckoutStepType } from "./CheckoutTabs";

import "./CheckoutWizardForm.scss";
import { LOCAL_STORAGE_KEY } from "../../lib/context/AuthContext/AuthContextProvider";
import { useRouter } from "../../lib/hooks/useRouter";
import { useToast } from "../../lib/hooks/useToast";
import { removeFieldFromStorage } from "../../lib/helpers/removeFieldFromStorage";
import { capitalizeFirstLetter } from "../../lib/helpers/capitalizeFirstLetter";
import { useApolloClient } from "@apollo/client";

export const CheckoutWizardForm = () => {
  const authCtx = useAuthContext();
  const cartCtx = useCartContext();
  const router = useRouter();
  const apolloClient = useApolloClient();
  const { addToast } = useToast();

  const [checkoutMutation] = useCheckoutMutation();
  const { data } = useGetUserAddressesQuery({
    variables: { id: authCtx?.user?.id },
  });

  const [activeStep, setActiveStep] = useState(1);

  const addresses = data?.customer;

  const formik = useCheckoutFormik({
    initialValues: {
      email: authCtx.user?.email || "",
      createAccount: !authCtx.user,
      password: "",
      passwordConfirm: "",
      billing: {
        name: authCtx.user?.firstName || "",
        surname: authCtx.user?.lastName || "",
        address: addresses?.billing?.address1 as string,
        city: {
          value: addresses?.billing?.city || "",
          label: addresses?.billing?.city || "",
        },
        phoneNumber: (authCtx.user?.billing?.phone as string) || "",
      },
      billingSameAsShipping: true,
      shipping: {
        name: addresses?.shipping?.firstName as string,
        surname: addresses?.shipping?.lastName as string,
        address: addresses?.shipping?.address1 as string,
        city: {
          value: addresses?.shipping?.city || "",
          label: capitalizeFirstLetter(addresses?.shipping?.city || ""),
        },
        phoneNumber: (addresses?.shipping?.phone as string) || "",
      },
      paymentMethod: "",
    },
    onSubmit: async (values, formikHelpers) => {
      const inputData = prepareCheckoutInputData(values);
      try {
        const res = await checkoutMutation({
          variables: {
            inputData,
          },
        });
        removeFieldFromStorage("wooSession");

        const data = res?.data?.checkout;
        const isNewUser = formik.values.createAccount;

        if (data?.customer && isNewUser) {
          writeStorage(LOCAL_STORAGE_KEY, {
            jwtAuthToken: data.customer?.jwtAuthToken,
            jwtRefreshToken: data.customer.jwtRefreshToken,
          });
          authCtx.updateUser({
            userId: data.customer.id,
            email: data.customer.email,
            firstName: data.customer.firstName,
            lastName: data.customer.lastName,
            billing: {
              phone: data.customer.billing?.phone,
            },
            jwtAuthToken: data.customer?.jwtAuthToken,
            jwtRefreshToken: data.customer.jwtRefreshToken,
          } as UserFr);
        }

        if (
          values.paymentMethod === "cod" ||
          values.paymentMethod === "other_payment"
        ) {
          //Update cart cache manually
          apolloClient.writeQuery({
            query: GetCartDocument,
            data: {
              cart: {
                appliedCoupons: {
                  nodes: Array(0),
                  __typename: "CartToCouponConnection",
                },
                chosenShippingMethod: "free_shipping:4",
                contents: {
                  itemCount: 0,
                  nodes: Array(0),
                  __typename: "CartToCartItemConnection",
                },
                discountTotal: "0.00€",
                isEmpty: false,
                shippingTotal: "0.00€",
                subtotal: "0.00€",
                total: "0.00€",
              },
            },
          });

          // console.log(data);
          // return false;

          router.history.push(
            `/checkout/${res.data?.checkout?.order?.databaseId}`
          );
          return;
        }
        console.log("URL:", res.data?.checkout?.redirect);
        window.location.href = res.data?.checkout?.redirect as string;
      } catch (e) {
        addToast("Problem gjatë blerjes, ju lutem provoni përsëri!", {
          appearance: "error",
        });
      }
    },
  });

  function prepareCheckoutInputData(data: CheckoutFields) {
    let inputData: any = {
      clientMutationId: "checkout-react-app",
      billing: {
        firstName: data.billing.name,
        lastName: data.billing.surname,
        phone: data.billing.phoneNumber,
        address1: data.billing.address,
        city: data.billing.city.label,
        email: data.email,
        country: "XK",
      },
      shipToDifferentAddress: !data.billingSameAsShipping,
      shippingMethod: cartCtx.cart.chosenShippingMethod,
      paymentMethod: data.paymentMethod,
    };

    if (data.createAccount && data.password) {
      inputData["account"] = {
        username: data.email,
        password: data.password,
      };
    }

    if (!data.billingSameAsShipping) {
      inputData["shipping"] = {
        country: "XK",
        firstName: data.shipping.name,
        lastName: data.shipping.surname,
        phone: data.shipping.phoneNumber,
        city: data.shipping.city,
        address1: data.shipping.address,
      };
    }
    return inputData;
  }

  const secondStepDisabled =
    !formik.values.email ||
    !formik.values.billing.name ||
    !formik.values.billing.surname ||
    !formik.values.billing.city ||
    !formik.values.billing.address ||
    !formik.values.billing.phoneNumber;

  const thirdStepDisabled = !formik.values.paymentMethod;

  const steps: CheckoutStepType[] = [
    {
      index: 1,
      label: "Adresa e faturimit",
      component: (
        <BillingFields
          formik={formik}
          onContinueClick={setActiveStep}
          disableButton={secondStepDisabled}
        />
      ),
    },
    {
      index: 2,
      label: "Mënyra e pagesës",
      component: (
        <PaymentMethodFields
          formik={formik}
          onContinueClick={setActiveStep}
          disableButton={thirdStepDisabled}
        />
      ),
      disabled: secondStepDisabled,
    },
    {
      index: 3,
      label: "Përmbledhje",
      component: <OrderSummary formik={formik} />,
      disabled: thirdStepDisabled,
    },
  ];

  return (
    <>
      <CheckoutTabs
        tabs={steps}
        activeTab={activeStep}
        onTabClick={setActiveStep}
      />
      <Form className="CheckoutWizardForm" onSubmit={formik.handleSubmit}>
        {steps.find((step) => activeStep === step.index)?.component}
      </Form>
    </>
  );
};
