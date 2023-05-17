import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Gallery } from "./components";
import { Button, Loader } from "./ui";

type Cat = {
  id: string;
  url: string;
};

type Breed = {
  id: string;
  name: string;
};

type Filter = {
  showGifs?: boolean;
  breedId?: string;
  page?: number;
};

const App: React.FC = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string | undefined>();
  const [limit, setLimit] = useState(5);
  const [showGifs, setShowGifs] = useState(false);
  const [galleryMode, setGalleryMode] = useState<"grid" | "masonry">("grid");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);

  const getCats = (filter?: Filter) => {
    return axios.get("https://api.thecatapi.com/v1/images/search", {
      params: {
        order: "DESC",
        limit,
        breed_id: filter?.breedId,
        page: 1,
        mime_types: filter?.showGifs ? "gif" : "jpg,png",
      },
    });
  };

  const handleLoadMoreCats = () => {
    setLoading(true);

    getCats({ showGifs, breedId: selectedBreed, page }).then(({ data }) => {
      setPage((prevState) => ++prevState);
      setCats((prevState) => [...prevState, ...data]);
      setLoading(false);
    });
  };

  const handleSearchCats = (filter?: Filter) => {
    setLoading(true);

    getCats(filter).then(({ data }) => {
      setPage(1);
      setCats(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    axios.get("https://api.thecatapi.com/v1/breeds").then((response) => {
      setBreeds(response.data);
    });
    handleSearchCats();
  }, []);

  return (
    <div className="container">
      <h1>Gato Gallery</h1>
      <Button onClick={() => setGalleryMode("grid")}>Grid</Button>
      <Button onClick={() => setGalleryMode("masonry")}>Masonry</Button>
      <label>
        <input
          type="checkbox"
          checked={showGifs}
          onChange={(e) => {
            setShowGifs(e.target.checked);
            handleSearchCats();
          }}
          disabled={loading}
        />
        Show GIFs
      </label>
      <select
        value={selectedBreed}
        onChange={(e) => {
          const value = e.target.value;

          setSelectedBreed(value);
          handleSearchCats({ breedId: value });
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
      <div className="images-container">
        <Gallery cats={cats} view={galleryMode} />
      </div>
      <div className="loaderWrap">{loading && <Loader />}</div>
      <div className="footer">
        <Button
          className="load-more"
          onClick={handleLoadMoreCats}
          disabled={loading}
        >
          Load More
        </Button>
      </div>
    </div>
  );
};

export default App;
