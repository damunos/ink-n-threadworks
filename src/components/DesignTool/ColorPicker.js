import React from "react";
import { SketchPicker } from "react-color";

const ColorPicker = ({ color, setColor }) => {
  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };

  return (
    <div className="color-picker">
      <h2>Choose Colors</h2>
      <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
    </div>
  );
};

export default ColorPicker;