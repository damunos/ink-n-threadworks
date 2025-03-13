import React, { useState } from "react";
import { Stage, Layer, Text, Line, Transformer } from "react-konva";
import html2canvas from "html2canvas";
import Button from "./ui/Button";

function Home() {
  const [text, setText] = useState("Your Design Here");
  const [color, setColor] = useState("black");
  const [fontSize, setFontSize] = useState(20);
  const [items, setItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const gridSize = 20;

  return (
    <div className="bg-tan min-h-screen">
      <nav className="bg-gray-700 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">Ink N Threadworks</h1>
      </nav>
      <header className="text-center py-16 bg-white">
        <h2 className="text-4xl font-bold text-black">Create Custom Apparel</h2>
      </header>
    </div>
  );
}

export default Home;
