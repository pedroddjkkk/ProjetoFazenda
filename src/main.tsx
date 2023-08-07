import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar/Navbar";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login/Login";
import Bois from "./components/Bois/Bois";
import Usuarios from "./components/Usuarios/Usuarios";
import Fazendas from "./components/Fazendas/Fazendas";
import Racoes from "./components/Rações/Racoes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/DashBoard";
import "./App.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import Permissoes from "./components/Permissoes";
import Acompanhamento from "./components/Acompanhamento/Acompanhamento";
import Validator from "./services/Validator";
import {
  FaGaugeHigh,
  FaHouseUser,
  FaUtensils,
  FaChartLine,
  FaLock,
} from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";

const root = ReactDOM.createRoot(document.getElementById("root")!);
let pages = [];

pages.push({
  navigable: false,
  element: <Validator />,
  children: [
    {
      navigable: true,
      element: <Navbar pages={pages} />,
      children: [
        {
          navigable: true,
          name: "Dashboard",
          path: "/dashboard",
          element: <Dashboard />,
          icon: <FaGaugeHigh />,
        },
        {
          navigable: true,
          name: "Usuários",
          path: "/users",
          element: <Usuarios />,
          icon: <FaUserAlt />,
        },
        {
          navigable: true,
          name: "Fazendas",
          path: "/fazendas",
          element: <Fazendas />,
          icon: <FaHouseUser />,
        },
        {
          navigable: true,
          name: "Rações",
          path: "/racoes",
          element: <Racoes />,
          icon: <FaUtensils />,
        },
        {
          navigable: true,
          name: "Acompanhar Bovinos",
          path: "/acompanhamento",
          element: <Acompanhamento />,
          icon: <FaChartLine />,
        },
        {
          navigable: true,
          name: "Permissões",
          path: "/permissoes",
          element: <Permissoes />,
          icon: <FaLock />,
        },
      ],
    },
  ],
});
pages.push({
  navigable: false,
  name: "Login",
  path: "/",
  element: <Login />,
});

const router = createBrowserRouter(pages);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    <ToastContainer />
  </React.StrictMode>
);

serviceWorkerRegistration.register();
