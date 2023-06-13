import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserNavbar from "../components/user/UserNavbar";
import jwtDecode from "jwt-decode";

const Root = () => {
  const sessionToken = sessionStorage.getItem("token");
  const decoded = sessionToken ? jwtDecode(sessionToken) : null;
  const userRole = decoded?.role;

  if (userRole == "user") {
    return (
      <>
        <UserNavbar />
        <div>
          <Outlet />
        </div>
      </>
    );
  }
  return decoded ? <Navigate to="/admin/author" /> : <Navigate to="/login" />;
};

export default Root;
