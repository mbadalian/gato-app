import React from "react";
import { Button, Switcher } from "../../ui";
import "./index.css";

interface Props {
  galleryMode: string;
  handleModeChange: () => void;
  loading: boolean;
  showGifs: boolean;
  setShowGifs: (checked: boolean) => void;
  selectedBreed?: string;
  setSelectedBreed: (value: string) => void;
  breeds: { id: string; name: string }[];
  handleSearchCats: (options?: { breedId?: string; limit?: number }) => void;
  limit: number;
  setLimit: (value: number) => void;
}

export const Appbar: React.FC<Props> = ({
  galleryMode,
  handleModeChange,
  loading,
  showGifs,
  setShowGifs,
  selectedBreed,
  setSelectedBreed,
  breeds,
  handleSearchCats,
  limit,
  setLimit,
}) => {
  return (
    <div className="appbar">
      <Button onClick={handleModeChange}>
        {galleryMode === "grid" ? "TO MASONRY" : "TO GRID"}
      </Button>
      <Switcher
        disabled={loading}
        label="Show GIFs"
        checked={showGifs}
        onChange={(checked: boolean) => {
          setShowGifs(checked);
          handleSearchCats();
        }}
      />
      <select
        value={selectedBreed}
        onChange={(e) => {
          const breed = e.target.value;
          setSelectedBreed(breed);
          handleSearchCats({ breedId: breed });
        }}
        disabled={loading}
      >
        <option value="">Select a breed</option>
        {breeds.map((breed) => (
          <option key={breed.id} value={breed.id}>
            {breed.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={limit}
        onChange={(e) => setLimit(parseInt(e.target.value))}
        disabled={loading}
      />
    </div>
  );
};
