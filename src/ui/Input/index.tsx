import React, { InputHTMLAttributes } from "react";
import "./index.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<Props> = (props) => {
  const { className, children } = props;
  return (
    <input {...props} className={`input ${className}`}>
      {children}
    </input>
  );
};
