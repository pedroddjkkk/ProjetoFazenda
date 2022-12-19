import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './Navbar';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
let arr = [];

arr.push({name: 'Relatorios', path: '/about', element: <div>about</div>, icon: ""});
arr.push({name: 'Bois', path: '/contact', element: <div>contact</div>, icon: ""});
arr.push({name: 'Home', path: '/home', element: <div>home</div>, icon: ""});

const router = createBrowserRouter(arr);

root.render(
  <React.StrictMode>
    <Navbar content={arr} />
    <RouterProvider router={router} />
  </React.StrictMode>
);