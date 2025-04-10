import React, { useState } from "react";

const ImageUploader = ({ onImageUpload, onImageResize }) => {
  const [image, setImage] = useState(null);
  const [size, setSize] = useState(100);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        onImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSizeChange = (e) => {
    const newSize = e.target.value;
    setSize(newSize);
    onImageResize(newSize);
  };

  return (
    <div className="image-uploader">
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && (
        <div>
          <label>
            Resize Image:
            <input
              type="range"
              min="10"
              max="200"
              value={size}
              onChange={handleSizeChange}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;