import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import ColorPicker from "./ColorPicker";
import TextEditor from "./TextEditor";
import Preview from "./Preview";
import ProductSelector from "./ProductSelector";
import "./DesignTool.css";

const DesignTool = () => {
  const [image, setImage] = useState(null);
  const [color, setColor] = useState("#000000");
  const [text, setText] = useState("");
  const [product, setProduct] = useState("");

  return (
    <div className="design-tool">
      <ProductSelector product={product} setProduct={setProduct} />
      <ColorPicker color={color} setColor={setColor} />
      <ImageUploader setImage={setImage} />
      <TextEditor text={text} setText={setText} />
      <Preview image={image} color={color} text={text} product={product} />
    </div>
  );
};

export default DesignTool;