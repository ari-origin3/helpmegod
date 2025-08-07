import React from "react";
import { Input } from "reactstrap";

interface Props {}

export const TextField = (props: Props) => {
  const { ...rest } = props;
  return <Input type="textarea" {...rest} />;
};
