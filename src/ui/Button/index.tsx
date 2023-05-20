import React from "react";

import "./index.css";

type Props = {
  className?: string;
  children?: string;
  disabled?: boolean;
  onClick: () => void;
};

export const Button: React.FC<Props> = ({ className, onClick, children }) => (
  <button className={`button_wrapper ${className}`} onClick={onClick}>
    {children}
  </button>
);
