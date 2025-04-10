import React from "react";

const ProductSelector = ({ product, setProduct }) => {
  const products = [
    { id: 1, name: "T-Shirt" },
    { id: 2, name: "Hoodie" },
    { id: 3, name: "Mug" },
    // Add more products as needed
  ];

  return (
    <div className="product-selector">
      <h2>Select Product</h2>
      <select value={product} onChange={(e) => setProduct(e.target.value)}>
        <option value="">Select a product</option>
        {products.map((product) => (
          <option key={product.id} value={product.name}>
            {product.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductSelector;