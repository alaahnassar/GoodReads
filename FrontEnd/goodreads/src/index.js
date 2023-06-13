import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import Root from "./pages/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./pages/User/Home";
import { Provider } from "react-redux";
import store from "./state/index";
import AdminRoot from "./pages/AdminRoot";
import Author from "./pages/Admin/Author";
import AuthorUser from "./pages/User/AuthorUser";
import AuthorsData from "./pages/User/AuthorsData";
import Register from "./pages/Home/Register";
import Login from "./pages/Home/Login";
import LandingPage from "./pages/Home/Home";
import Categories from "./pages/User/Categories";
import Book from "./pages/Admin/Book";
import BookDetails from "./pages/User/BookDetails";
import HomeRoot from "./pages/HomeRoot";
import "./globalBg.css";
import Category from "./pages/Admin/Category";

const router = createBrowserRouter([
  {
    path: "",
    element: <HomeRoot />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
    ],
  },
  {
    path: "/user",
    element: <Root />,
    children: [
      { path: "home", element: <Home /> },
      { path: "categories", element: <Categories /> },
      { path: "books/:id", element: <BookDetails /> },
      { path: "author/:id", element: <AuthorUser /> },
      { path: "authors", element: <AuthorsData /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminRoot />,
    children: [
      { path: "author", element: <Author /> },
      { path: "books", element: <Book /> },
      { path: "category", element: <Category /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
