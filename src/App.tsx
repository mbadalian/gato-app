import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import './App.css'

interface Cat {
  id: string;
  url: string;
}

interface Breed {
  id: string;
  name: string;
}

const App: React.FC = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [showGifs, setShowGifs] = useState(false);
  const [galleryMode, setGalleryMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('https://api.thecatapi.com/v1/breeds').then((response) => {
      setBreeds(response.data);
    });
  }, []);

  const renderCats = () => {
    if (galleryMode === 'grid') {
      return (
        <div className="grid-gallery">
          {cats.map((cat) => (
            <img key={cat.id} src={cat.url} alt="Cute cat" />
          ))}
        </div>
      );
    } else {
      return (
        <div className="list-gallery">
          {cats.map((cat) => (
            <div key={cat.id}>
              <img src={cat.url} alt="Cute cat" />
            </div>
          ))}
        </div>
      );
    }
  };

  const fetchCats = (append = false) => {
    setLoading(true);
    axios
      .get('https://api.thecatapi.com/v1/images/search', {
        params: {
          order: 'DESC',
          limit,
          breed_id: selectedBreed?.id,
          page,
          mime_types: showGifs ? 'gif' : 'jpg,png',
        },
      })
      .then((response) => {
        if (append) {
          setCats((prevCats) => [...prevCats, ...response.data]);
        } else {
          setCats(response.data);
        }
      });
    setLoading(false);
  };

  const loadMoreCats = () => {
    setPage((prevPage) => prevPage + 1);
    fetchCats(true);
  };

  return (
    <div className='container'>
      <h1>Gato Gallery</h1>
      <button onClick={() => setGalleryMode('grid')}>Grid Mode</button>
      <button onClick={() => setGalleryMode('list')}>List Mode</button>
      <label>
        <input
          type="checkbox"
          checked={showGifs}
          onChange={(e) => setShowGifs(e.target.checked)}
        />
        Show GIFs
      </label>
      <select
        value={selectedBreed?.id || ''}
        onChange={(e) =>
          setSelectedBreed(breeds.find((breed) => breed.id === e.target.value) || null)
        }
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
      />
      <button onClick={() => fetchCats()}>Load Images</button>

      {loading && (
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      <div className='images-container'>
        { renderCats() }
        <button className='load-more' onClick={loadMoreCats}>Load More</button>
      </div>
    </div>
  );
};

export default App;
