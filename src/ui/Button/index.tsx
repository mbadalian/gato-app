import React, { ButtonHTMLAttributes } from "react";
import "./index.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<Props> = (props) => {
  const { className, children } = props;
  return (
    <button {...props} className={`button ${className}`}>
      {children}
    </button>
  );
};
