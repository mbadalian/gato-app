import React, { useState } from "react";
import { ImageWithSkeleton } from "../ImageWithSkeleton";
import { Button } from "../../ui";
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
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (src: string, index: number) => {
    setSelectedImage(src);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedImage(cats[currentIndex - 1].url);
    }
  };

  const goToNext = () => {
    if (currentIndex < cats.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedImage(cats[currentIndex + 1].url);
    }
  };

  return (
    <div className={`${view}-gallery`}>
      {cats.map((cat, index) => (
        <div className="masonry-gallery-item">
          <ImageWithSkeleton
            key={cat.id}
            src={cat.url}
            alt="Cute cat"
            onClick={() => openLightbox(cat.url, index)}
          />
        </div>
      ))}
      {selectedImage && (
        <div className="lightbox">
          <Button onClick={goToPrevious}>Previous</Button>
          <ImageWithSkeleton
            onClick={closeLightbox}
            src={selectedImage}
            alt="Selected Cat"
            className="lightbox-image"
          />
          <Button onClick={goToNext}>Next</Button>
          <div className="lightbox-counter">
            <Button disabled={true}>
              {currentIndex + 1} / {cats.length}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
