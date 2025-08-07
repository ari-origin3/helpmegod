import { ToastProvider } from "react-toast-notifications";

interface Props {
  children: React.ReactNode;
}
export const NotificationContextProvider = (props: Props) => {
  return (
    <ToastProvider autoDismiss autoDismissTimeout={4000}>
      {props.children}
    </ToastProvider>
  );
};
