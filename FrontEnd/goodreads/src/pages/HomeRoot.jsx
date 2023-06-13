import React from "react";
import { Outlet } from "react-router-dom";
import NavbarHome from "../pages/Home/Navbar";
const HomeRoot = () => {
  return (
    <>
      <NavbarHome />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default HomeRoot;
