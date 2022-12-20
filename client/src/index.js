import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar/Navbar";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
let pages = [];

pages.push({
  name: "Home",
  path: "/home",
  element: <div className="main">home</div>,
  icon: "fa-solid fa-house",
});
pages.push({
  name: "Relatorios",
  path: "/relatorios",
  element: <div className="main">about</div>,
  icon: "fa-solid fa-flag",
});
pages.push({
  name: "Bois",
  path: "/bois",
  element: <div className="main">contact</div>,
  icon: "fa-solid fa-cow",
});
pages.push({
  name: "Cavalos",
  path: "/cavalos",
  element: <div className="main">contact</div>,
  icon: "fa-solid fa-horse",
});

const router = createBrowserRouter(pages);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Navbar content={pages} />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
