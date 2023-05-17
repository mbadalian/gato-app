import React, { useState } from "react";
import { Skeleton } from "../../ui";

interface Props {
  src: string;
  alt: string;
  onClick: () => void;
}

export const Image: React.FC<Props> = ({ src, alt, onClick }) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Skeleton width={200} height={200} />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)}
        onClick={onClick}
        style={{ cursor: "pointer", display: loading ? "none" : "block" }}
      />
    </>
  );
};
