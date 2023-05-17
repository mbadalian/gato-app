import React, { useState } from "react";
import { Image } from "../Image";
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
        <Image
          key={cat.id}
          src={cat.url}
          alt="Cute cat"
          onClick={() => openLightbox(cat.url)}
        />
      ))}
      {selectedImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={closeLightbox}
        >
          <img
            src={selectedImage}
            alt="Selected Cat"
            style={{ maxWidth: "90%", maxHeight: "90%" }}
          />
        </div>
      )}
    </div>
  );
};
