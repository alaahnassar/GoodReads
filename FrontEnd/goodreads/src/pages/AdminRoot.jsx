import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";
import jwtDecode from "jwt-decode";
const AdminRoot = () => {
  const sessionToken = sessionStorage.getItem("token");
  const decoded = sessionToken ? jwtDecode(sessionToken) : null;
  const adminRole = decoded?.role;

  if (adminRole === "admin") {
    return (
      <>
        <AdminNavbar />
        <div>
          <Outlet />
        </div>
      </>
    );
  }
  return decoded ? <Navigate to="/user/home" /> : <Navigate to="/login" />;
};

export default AdminRoot;
