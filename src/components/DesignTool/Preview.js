import React from "react";
import "./Preview.css";

const Preview = ({ selectedColor, uploadedImages, selectedStockArt, text, textColor, font, imageSize }) => {
  return (
    <div className="preview" style={{ backgroundColor: selectedColor }}>
      {uploadedImages.map((image, index) => (
        <img key={index} src={image} alt="Uploaded" style={{ width: imageSize, height: imageSize }} />
      ))}
      {selectedStockArt && <img src={selectedStockArt} alt="Stock Art" style={{ width: imageSize, height: imageSize }} />}
      {text && (
        <div className="preview-text" style={{ color: textColor, fontFamily: font }}>
          {text}
        </div>
      )}
    </div>
  );
};

export default Preview;