import React, { useState } from "react";
import { ImageWithSkeleton } from "../ImageWithSkeleton";
import "./index.css";

type Cat = {
  id: string;
  url: string;
};

interface Props {
  cats: Cat[];
  view: "grid" | "masonry";
}

export const Gallery: React.FC<Props> = ({ cats, view }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openLightbox = (src: string) => {
    setSelectedImage(src);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className={`${view}-gallery`}>
      {cats.map((cat) => (
        <ImageWithSkeleton
          key={cat.id}
          src={cat.url}
          alt="Cute cat"
          onClick={() => openLightbox(cat.url)}
        />
      ))}
      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <ImageWithSkeleton src={selectedImage} alt="Selected Cat" />
        </div>
      )}
    </div>
  );
};
