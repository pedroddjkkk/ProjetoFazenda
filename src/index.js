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

const root = ReactDOM.createRoot(document.getElementById("root"));
let pages = [];

pages.push({
    navigable: true,
    element: <Navbar pages={pages}/>,
    children: [
        {
            navigable: true,
            name: "Usuários",
            path: "/users",
            element: <Usuarios />,
            icon: "fa-solid fa-user",
        },
        {
            navigable: true,
            name: "Bois",
            path: "/bois",
            element: <Bois />,
            icon: "fa-solid fa-cow",
        },
        {
            navigable: true,
            name: "Fazendas",
            path: "/fazendas",
            element: <Fazendas />,
            icon: "fa-solid fa-farm",
        }
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
    </React.StrictMode>
);
