import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "./components/ui/Button"; // Ensure Button.js exists inside /components/ui/
import { Stage, Layer, Text, Line, Transformer } from "react-konva";
import html2canvas from "html2canvas";

function Home() {
  const [text, setText] = useState("Your Design Here");
  const [color, setColor] = useState("black");
  const [fontSize, setFontSize] = useState(20);
  const [fontStyle, setFontStyle] = useState("normal");
  const [items, setItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [templates, setTemplates] = useState([]);
  const gridSize = 20;

  // Handle item selection
  const handleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((selectedId) => selectedId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-tan p-6 flex flex-col items-center text-black">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 w-full flex justify-between items-center text-white shadow-lg">
        <h1 className="text-2xl font-bold">Ink N Threadworks</h1>
        <div className="space-x-4">
          <Button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg">Products</Button>
          <Button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg">Design Tool</Button>
          <Button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg">Track Order</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-16 bg-gray-100 w-full rounded-lg shadow-md">
        <h2 className="text-4xl font-bold">Create Custom Apparel with Ease</h2>
        <p className="text-gray-700 mt-2">Upload your design, customize, and place your order in minutes!</p>
        <motion.div whileHover={{ scale: 1.05 }} className="mt-6">
          <Button className="bg-black text-white px-6 py-3 rounded-lg shadow-md">Start Designing</Button>
        </motion.div>
      </header>

      {/* Design Tool */}
      <section className="mt-10 bg-white p-6 shadow-md rounded-lg w-full max-w-4xl">
        <h3 className="text-2xl font-semibold">Design Your Apparel</h3>
        <Stage width={400} height={400} className="border border-gray-500 mt-4">
          <Layer>
            {/* Grid Overlay */}
            {[...Array(20)].map((_, i) => (
              <Line key={`v-${i}`} points={[i * gridSize, 0, i * gridSize, 400]} stroke="#ddd" strokeWidth={0.5} />
            ))}
            {[...Array(20)].map((_, i) => (
              <Line key={`h-${i}`} points={[0, i * gridSize, 400, i * gridSize]} stroke="#ddd" strokeWidth={0.5} />
            ))}

            {items.map((item) =>
              item.type === "text" ? (
                <Text
                  key={item.id}
                  text={item.text}
                  x={item.x}
                  y={item.y}
                  fill={item.color}
                  fontSize={item.fontSize}
                  fontStyle={item.fontStyle}
                  draggable={!item.locked}
                  onClick={() => handleSelection(item.id)}
                />
              ) : null
            )}

            {selectedIds.length > 0 && (
              <Transformer nodes={items.filter((item) => selectedIds.includes(item.id)).map((item) => item.ref).filter(Boolean)} />
            )}
          </Layer>
        </Stage>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4 mt-10 w-full">
        <p>&copy; {new Date().getFullYear()} Ink N Threadworks - All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router basename={process.env.NODE_ENV === "development" ? "/" : "/Ink-N-Threadworks"}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
