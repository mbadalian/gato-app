import React from "react";
import { Button, Switcher, Input, Select } from "../../ui";
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
      <Select
        value={selectedBreed}
        onChange={(breed) => {
          setSelectedBreed(breed);
          handleSearchCats({ breedId: breed });
        }}
        items={breeds}
        disabled={loading}
      />
      <Input
        type="number"
        value={limit}
        onChange={(e) => setLimit(parseInt(e.target.value))}
        disabled={loading}
      />
    </div>
  );
};
