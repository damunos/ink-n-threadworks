import React from "react";
import Header from "./Header"; // Make sure Header exists
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import ThemeToggle from "./ThemeToggle"; // adjust path as needed

const Layout = () => {
  return (
    <>
      <Header />
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
