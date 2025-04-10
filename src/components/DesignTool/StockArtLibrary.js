import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StockArtLibrary.css";

const StockArtLibrary = ({ onSelect }) => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("logo vector");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("https://pixabay.com/api/", {
          params: {
            key: "49497720-ee7d023efe9f40f277905b148  ",
            q: query,
            image_type: "vector",
            per_page: 10,
          },
        });
        setImages(response.data.hits);
      } catch (error) {
        console.error("Error fetching stock images: ", error);
        setError("Failed to load stock images. Please try again later.");
      }
    };

    fetchImages();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.search.value.trim();
    if (searchQuery) {
      setQuery(searchQuery);
    }
  };

  return (
    <div className="stock-art-library">
      <h3>Stock Art Library</h3>
      <form onSubmit={handleSearch}>
        <input type="text" name="search" placeholder="Search for images..." />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="stock-art-grid">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.previewURL}
            alt={image.tags}
            onClick={() => onSelect(image.largeImageURL)}
            className="stock-art-image"
          />
        ))}
      </div>
    </div>
  );
};

export default StockArtLibrary;