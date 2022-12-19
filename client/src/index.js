import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './Navbar';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
let arr = [];

arr.push({id: 12, name: 'Doe', path: '/about', element: <div>about</div>});
arr.push({id: 13, name: 'Doe', path: '/contact', element: <div>contact</div>});
arr.push({id: 14, name: 'Doe', path: '/home', element: <div>home</div>});

const router = createBrowserRouter(arr);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Navbar content={arr} />
  </React.StrictMode>
);