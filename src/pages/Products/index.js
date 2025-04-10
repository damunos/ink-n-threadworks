// src/pages/Products/index.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductSelector from "../../components/ProductSelector/ProductSelector";
import "./Products.css";

const ProductsPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedMain, setSelectedMain] = useState("");
  const [selectedSub, setSelectedSub] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const THUMBNAIL_BASE_PATH = "/images/sanmar/SanMar_Images/SDL/THUMBNAIL_IMAGE/";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedMain) return;


      try {
        const res = await axios.get("/api/products", {
          params: {
            mainCategory: selectedMain,
            subCategory: selectedSub,
            page,
            limit: 20,
          },
        });

        setProducts(res.data.data);
        setFiltered(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setProducts([]);
        setFiltered([]);
      }
    };

    fetchProducts();
  }, [selectedMain, selectedSub, page]);

  return (
    <div className="products-page">
      <h2>Browse Products</h2>
      <ProductSelector
        categories={categories}
        selectedMain={selectedMain}
        setSelectedMain={setSelectedMain}
        selectedSub={selectedSub}
        setSelectedSub={setSelectedSub}
      />

{!selectedMain ? (
  <p>Select a main category to view products.</p>

      ) : filtered.length === 0 ? (
        <p>No products found for this category.</p>
      ) : (
        <>
          <ul className="product-list">
            {filtered.map((product, i) => (
              <li key={i} className="product-card">
                {product.Thumbnail && (
                  <img
                    src={`${THUMBNAIL_BASE_PATH}${product.Thumbnail}`}
                    alt={product.ProductName}
                  />
                )}
                <h3>{product.ProductName}</h3>
                <p>{product.Description}</p>
                {product.MSRP && (
                  <p>
                    <strong>Starting at:</strong> ${product.MSRP.toFixed(2)}
                  </p>
                )}
              </li>
            ))}
          </ul>

          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page <= 1}>
              Previous
            </button>
            <span style={{ margin: "0 1rem" }}>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsPage;
