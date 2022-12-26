import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar/Navbar";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Bois from "./components/Bois/Bois";
import { selectNavTabs } from "./redux/actions/navSlice";
import Usuarios from "./components/Usuarios/Usuarios";

const dispatch = store.dispatch;
const root = ReactDOM.createRoot(document.getElementById("root"));
let pages = [];

pages.push({
    navigable: true,
    element: <Navbar pages={pages}/>,
    children: [
        {
            navigable: true,
            name: "Dashboard",
            path: "/home",
            element: <Home />,
            icon: "fa-solid fa-house",
        },
        {
            navigable: true,
            name: "Usuários",
            path: "/users",
            element: <Usuarios></Usuarios>,
            icon: "fa-solid fa-user",
        },
        {
            navigable: true,
            name: "Settings",
            path: "/settings",
            element: <h1>Settingsaaaa</h1>,
            icon: "fa-solid fa-cog",
        },
        {
            navigable: true,
            name: "Bois",
            path: "/bois",
            element: <Bois />,
            icon: "fa-solid fa-cow",
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
    </React.StrictMode>
);
