// src/pages/Products/ProductDetailPage.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Products.css";

const THUMBNAIL_PATH = "/images/sanmar/SanMar_Images/SDL/THUMBNAIL_IMAGE/";
const FULL_IMAGE_PATH = "/images/sanmar/SanMar_Images/SDL/COLOR_PRODUCT_IMAGE/";

const ProductDetailPage = () => {
  const { style } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    const fetchProductByStyle = async () => {
      try {
        const res = await axios.get(`/api/products/by-style/${style}`);
        setProduct(res.data);
        if (res.data.colors?.length) {
          setSelectedColor(res.data.colors[0]);
        }
      } catch (err) {
        console.error("Failed to load product by style:", err);
      }
    };
    fetchProductByStyle();
  }, [style]);

  const handleSelectColor = (e) => {
    const color = product.colors.find((c) => c.name === e.target.value);
    setSelectedColor(color);
  };

  const handleCustomize = () => {
    if (!product || !selectedColor) return;
    const designProduct = {
      ...product,
      selectedColor,
    };
    localStorage.setItem("designProduct", JSON.stringify(designProduct));
    navigate("/design");
  };

  if (!product || !selectedColor) return <div>Loading...</div>;

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <p className="style-number">Style #: {product.style}</p>
      <img
        src={`${FULL_IMAGE_PATH}${selectedColor.fullImage || selectedColor.thumbnail}`}
        alt={selectedColor.name}
        style={{ maxWidth: "50%", height: "auto" }}
      />
      <p>{product.description}</p>

      <label htmlFor="color-select"><strong>Choose a color:</strong></label>
      <select
        id="color-select"
        value={selectedColor.name}
        onChange={handleSelectColor}
      >
        {product.colors.map((c) => (
          <option key={c.name} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      <div className="actions">
        <button onClick={handleCustomize}>Customize This Product</button>
        <button onClick={() => navigate("/products")}>Back to Products</button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
