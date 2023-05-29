import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Appbar, Gallery, DarkModeToggle } from "./components";
import { Button, Loader, Switcher } from "./ui";
import { ThemeProvider } from "./ThemeContext";

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

  const handleModeChange = () => {
    setGalleryMode(galleryMode === "grid" ? "masonry" : "grid");
  };

  useEffect(() => {
    axios.get("https://api.thecatapi.com/v1/breeds").then((response) => {
      setBreeds(response.data);
    });
    handleSearchCats();
  }, []);

  return (
    <ThemeProvider>
      <div className="container">
        <DarkModeToggle />
        <h1>Gato Gallery</h1>
        <Appbar
          galleryMode={galleryMode}
          handleModeChange={handleModeChange}
          loading={loading}
          showGifs={showGifs}
          setShowGifs={setShowGifs}
          selectedBreed={selectedBreed}
          setSelectedBreed={setSelectedBreed}
          breeds={breeds}
          handleSearchCats={handleSearchCats}
          limit={limit}
          setLimit={setLimit}
        />
        <Gallery cats={cats} view={galleryMode} />
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
    </ThemeProvider>
  );
};

export default App;
