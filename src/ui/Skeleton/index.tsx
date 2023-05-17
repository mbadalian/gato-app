import React from "react";
import "./index.css";

interface Props {
  width: number;
  height: number;
}

export const Skeleton: React.FC<Props> = ({ width, height }) => (
  <div className="Skeleton" style={{ width: width, height: height }}></div>
);
