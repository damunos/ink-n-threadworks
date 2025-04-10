// src/pages/Design/index.js
import React, { useState } from "react";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import useImage from "../../hooks/useImage"; // Correct import
import "./Design.css";

const Design = ({ selectedProduct }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [productImage] = useImage(
    selectedProduct?.PRODUCT_IMAGE
      ? `http://localhost:5000/images/${selectedProduct.PRODUCT_IMAGE}`
      : null
  );

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  if (!selectedProduct) {
    return <p>Please select a product from the Products page.</p>;
  }

  return (
    <div className="design-page">
      <h1>Design Your {selectedProduct.name}</h1>
      <div className="product-preview">
        <Stage width={500} height={500}>
          <Layer>
            {productImage && (
              <KonvaImage image={productImage} x={0} y={0} width={500} height={500} />
            )}
            {uploadedImage && (
              <KonvaImage
                image={new window.Image().src = uploadedImage}
                x={100}
                y={100}
                draggable
              />
            )}
          </Layer>
        </Stage>
      </div>
      <input type="file" onChange={handleUpload} />
    </div>
  );
};

export default Design;
