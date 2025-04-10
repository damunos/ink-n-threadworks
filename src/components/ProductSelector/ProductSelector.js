// src/components/ProductSelector/ProductSelector.js
import React from "react";
import "./ProductSelector.css";

function ProductSelector({
  categories = [],
  selectedMain,
  setSelectedMain,
  selectedSub,
  setSelectedSub,
}) {
  const handleMainChange = (e) => {
    setSelectedMain(e.target.value);
    setSelectedSub(""); // Reset subcategory when main changes
  };

  const subCategories =
    categories.find((cat) => cat.mainCategory === selectedMain)
      ?.subCategories || [];

  const showSubDropdown = selectedMain && (subCategories.length > 0);

  return (
    <div className="product-selector">
      <label>Main Category:</label>
      <select value={selectedMain} onChange={handleMainChange}>
        <option value="">Select Main Category</option>
        {categories.map((cat) => (
          <option key={cat.mainCategory} value={cat.mainCategory}>
            {cat.mainCategory}
          </option>
        ))}
      </select>

      {selectedMain && (
        <>
          <label>Sub Category:</label>
          <select
            value={selectedSub}
            onChange={(e) => setSelectedSub(e.target.value)}
          >
            {showSubDropdown ? (
              <>
                <option value="">-- All --</option>
                {subCategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </>
            ) : (
              <option value="">-- All --</option>
            )}
          </select>
        </>
      )}
    </div>
  );
}

export default ProductSelector;
