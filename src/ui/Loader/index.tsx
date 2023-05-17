import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./index.css";

export const Loader: React.FC = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prevValue) => (prevValue + 20) % 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="rotating-progress-bar"
      style={{ width: "70px", height: "70px" }}
    >
      <CircularProgressbar
        value={value}
        strokeWidth={5}
        styles={{
          path: {
            stroke: "black",
            strokeLinecap: "round",
          },
          trail: {
            stroke: "transparent",
          },
        }}
      />
    </div>
  );
};
