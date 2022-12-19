import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './Navbar/Navbar';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
let arr = [];

arr.push({name: 'Home', path: '/home', element: <div>home</div>, icon: "fa-solid fa-house"});
arr.push({name: 'Relatorios', path: '/relatorios', element: <div>about</div>, icon: "fa-solid fa-flag"});
arr.push({name: 'Bois', path: '/bois', element: <div>contact</div>, icon: "fa-solid fa-cow"});

const router = createBrowserRouter(arr);

root.render(
  <React.StrictMode>
    <Navbar content={arr} />
    <RouterProvider router={router} />
  </React.StrictMode>
);