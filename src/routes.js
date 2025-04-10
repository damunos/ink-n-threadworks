import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import DesignTool from "./pages/DesignTool";
import TrackOrder from "./pages/TrackOrder";
import NotFound from "./pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/design-tool" element={<DesignTool />} />
      <Route path="/track-order" element={<TrackOrder />} />
      <Route path="*" element={<NotFound />} /> {/* 404 fallback */}
    </Routes>
  );
};

export default AppRoutes;
