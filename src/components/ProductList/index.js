// File: src/pages/Products/index.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductSelector from "../../components/ProductSelector/ProductSelector";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data);
        setFiltered(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (category === "") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((p) => p.Category === category));
    }
  }, [category, products]);

  const uniqueCategories = [...new Set(products.map((p) => p.Category).filter(Boolean))];

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Browse Products</h2>
      <ProductSelector categories={uniqueCategories} onCategoryChange={setCategory} />
      {filtered.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <ul>
          {filtered.map((product, i) => (
            <li key={i}>
              <strong>{product.ProductName || product.Name}</strong>
              <div>Category: {product.Category}</div>
              <div>Style: {product.Style}</div>
              {/* Add thumbnail if you wish */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductsPage;
