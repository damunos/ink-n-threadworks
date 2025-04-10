import React, { useState } from "react";
import "./TextEditor.css";

const TextEditor = ({ onTextChange, onTextColorChange, onFontChange }) => {
  const [text, setText] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [font, setFont] = useState("Arial");

  const handleTextChange = (e) => {
    setText(e.target.value);
    onTextChange(e.target.value);
  };

  const handleTextColorChange = (e) => {
    setTextColor(e.target.value);
    onTextColorChange(e.target.value);
  };

  const handleFontChange = (e) => {
    setFont(e.target.value);
    onFontChange(e.target.value);
  };

  return (
    <div className="text-editor">
      <textarea
        value={text}
        onChange={handleTextChange}
        style={{ color: textColor, fontFamily: font }}
        placeholder="Enter your text here..."
      />
      <div className="text-editor-controls">
        <label>
          Text Color:
          <input type="color" value={textColor} onChange={handleTextColorChange} />
        </label>
        <label>
          Font:
          <select value={font} onChange={handleFontChange}>
            <option value="Arial">Arial</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Verdana">Verdana</option>
            {/* Add more font options as needed */}
          </select>
        </label>
      </div>
    </div>
  );
};

export default TextEditor;