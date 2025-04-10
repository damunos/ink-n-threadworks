// src/pages/Products/GroupedProductsPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
import { useNavigate } from "react-router-dom";

const THUMBNAIL_PATH = "/images/sanmar/SanMar_Images/SDL/THUMBNAIL_IMAGE/";

const GroupedProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/categories").then((res) => setCategories(res.data || []));
  }, []);

  useEffect(() => {
    const fetchGrouped = async () => {
      try {
        const query = new URLSearchParams({
          mainCategory,
          subCategory,
          page,
          limit: 20,
        });
        const res = await axios.get(`/api/products/grouped?${query.toString()}`);
        setProducts(res.data.data || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching grouped products:", err);
        setProducts([]);
      }
    };
    fetchGrouped();
  }, [mainCategory, subCategory, page]);

  const truncate = (text, length = 30) =>
    text?.length > length ? text.slice(0, length) + "..." : text;

  const handleOpenDetail = (style) => {
    const product = products.find((p) => p.style === style);
    localStorage.setItem("productDetail", JSON.stringify(product));
    navigate(`/product/${style}`);
  };

  const currentSubCategories =
    categories.find((cat) => cat.mainCategory === mainCategory)?.subCategories || [];

  const handleMainCategoryChange = (e) => {
    setMainCategory(e.target.value);
    setSubCategory("");
    setPage(1);
  };

  const handleSubCategoryChange = (e) => {
    setSubCategory(e.target.value);
    setPage(1);
  };

  return (
    <div className="products-page">
      <h2>Select a Product to Customize</h2>

      <div className="category-filters">
        <select value={mainCategory} onChange={handleMainCategoryChange}>
          <option value="">All Categories</option>
          {(categories || []).map((cat) => (
            <option key={cat.mainCategory} value={cat.mainCategory}>
              {cat.mainCategory}
            </option>
          ))}
        </select>

        <select
          value={subCategory}
          onChange={handleSubCategoryChange}
          disabled={!mainCategory || currentSubCategories.length === 0}
        >
          <option value="">All</option>
          {(currentSubCategories || []).map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      </div>

      <ul className="product-list">
        {products.map((product) => {
          const defaultColor = product.colors?.[0];
          if (!defaultColor) return null;

          const msrps = product.colors
            .map((c) => {
              const val = parseFloat(c.msrp);
              return !isNaN(val) && val > 0 ? val : null;
            })
            .filter((v) => v !== null);

          const lowestMsrp = msrps.length > 0 ? Math.min(...msrps) : null;

          return (
            <li
              key={`${product.style}_${defaultColor.thumbnail}`}
              className="product-card"
              onClick={() => handleOpenDetail(product.style)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={`${THUMBNAIL_PATH}${defaultColor.thumbnail}`}
                alt={product.name}
              />
              <p className="style-number">{product.style}</p>
              <p className="product-msrp">
                {lowestMsrp !== null ? (
                  <strong>{`Starts at: $${lowestMsrp.toFixed(2)}`}</strong>
                ) : (
                  <strong>Call for quote</strong>
                )}
              </p>
              <h3>{truncate(product.name)}</h3>
              <p>{truncate(product.description)}</p>
            </li>
          );
        })}
      </ul>

      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GroupedProductsPage;
