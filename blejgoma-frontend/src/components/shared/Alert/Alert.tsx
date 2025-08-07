import React from "react";
import { Alert as AlertRS, AlertProps } from "reactstrap";
interface Props extends AlertProps {
  children: React.ReactNode;
}

export const Alert = (props: Props) => {
  const { children, ...originalProps } = props;
  return (
    <AlertRS className="Alert" {...originalProps}>
      {children}
    </AlertRS>
  );
};
