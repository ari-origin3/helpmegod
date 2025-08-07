import React from "react";
import ReactSelect, {
  ActionMeta,
  components,
  MenuPlacement,
} from "react-select";
import cs from "classnames";
import { Icon } from "../Icon/Icon";
import { FormikTouched } from "formik";

import "./Select.scss";

export interface Option {
  value: string | number;
  label: string | number;
}

interface Props {
  className?: string;
  placeholder?: string;
  label?: string;
  options?: Option[];
  value?: Option | Option[] | null;
  onChange: (value: any | null, actionMeta?: ActionMeta<Option>) => void;
  error?: string;
  small?: boolean;
  disabled?: boolean;
  clearable?: boolean;
  id?: string;
  formikInvalid?: false | FormikTouched<{ label: string; value: string }>;
  isMulti?: boolean;
  tabIndex?: string | null;
  menuPlacement?: MenuPlacement;
  style?: object;
  isSearchable?: boolean;
}

export const Select = (props: Props) => {
  const DropdownIndicator = (props: any) => (
    <components.DropdownIndicator {...props}>
      <Icon icon="down-arrow" />
    </components.DropdownIndicator>
  );

  const handleChange = (value: any | null, actionMeta: ActionMeta<Option>) => {
    props.onChange(value, actionMeta);
  };

  return (
    <div
      className={cs(
        "Select",
        props.className,
        props.error && "Select--error",
        props.small && "Select--small",
        props.disabled && "Select--disabled"
      )}
    >
      {props.label && <label className="Select__label">{props.label}</label>}
      <ReactSelect
        isSearchable={props.isSearchable}
        tabIndex={props.tabIndex}
        isClearable={props.clearable}
        classNamePrefix="Select"
        components={{ DropdownIndicator }}
        options={props.options}
        placeholder={props.placeholder || "Selekto..."}
        value={props.value}
        onChange={handleChange}
        isDisabled={props.disabled}
        noOptionsMessage={() => "Nuk ka asnjë opsion!"}
        id={props.id}
        isMulti={props.isMulti}
        menuPlacement={props.menuPlacement}
        styles={props.style}
      />
      {props.error && <p className="Select__error_text">{props.error}</p>}
    </div>
  );
};
