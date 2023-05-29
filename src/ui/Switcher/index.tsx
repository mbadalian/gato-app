import React from "react";
import "./index.css";

interface Props {
  label: string;
  disabled: boolean;
  checked: boolean;
  onChange: (value: boolean) => void;
}

export const Switcher: React.FC<Props> = ({
  disabled,
  label,
  checked,
  onChange,
}) => {
  return (
    <label className="switch">
      {label}
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          onChange(e.target.checked);
        }}
        disabled={disabled}
      />
      <span className="slider"></span>
    </label>
  );
};
