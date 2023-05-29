import React, { useState } from "react";
import { Skeleton } from "../../ui";
import "./index.css";

interface Props {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

export const ImageWithSkeleton: React.FC<Props> = ({
  src,
  alt,
  className,
  onClick,
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Skeleton />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)}
        onClick={onClick}
        className={`${loading && "hidden"} ${className}`}
      />
    </>
  );
};
