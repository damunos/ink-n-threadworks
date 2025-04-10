import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductDetailPage from "./pages/Products/ProductDetailPage";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import GroupedProductsPage from "./pages/Products/GroupedProductsPage";
import Design from "./pages/Design";
import Admin from "./pages/Admin";
import About from "./pages/About";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<GroupedProductsPage />} />
        <Route path="design" element={<Design />} />
        <Route path="admin" element={<Admin />} />
        <Route path="about" element={<About />} />
        <Route path="product/:style" element={<ProductDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
