import React from "react";
import {
  FormFeedback,
  FormGroup,
  InputProps,
  Input as RSInput,
  Label,
} from "reactstrap";
import cs from "classnames";

import "./Input.scss";

interface Props extends InputProps {
  error?: string;
  label?: string;
  tabIndex?: number;
}

export const Input = (props: Props) => {
  return (
    <FormGroup className={cs("Input", props.className)}>
      <Label htmlFor={props.id}>{props.label}</Label>
      <RSInput
        tabIndex={props.tabIndex}
        id={props.id}
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
        invalid={props.invalid}
      />

      <FormFeedback>{props.error}</FormFeedback>
    </FormGroup>
  );
};
