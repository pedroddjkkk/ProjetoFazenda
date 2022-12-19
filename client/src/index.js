import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
let arr = [];
arr.push({id: 1, name: 'John'});
arr.push({id: 2, name: 'Doe'});
arr.push({id: 3, name: 'Jane'});
arr.push({id: 4, name: 'Doe'});
arr.push({id: 5, name: 'John'});
arr.push({id: 6, name: 'Doe'});
arr.push({id: 7, name: 'Jane'});
arr.push({id: 8, name: 'Doe'});
arr.push({id: 9, name: 'John'});
arr.push({id: 10, name: 'Doe'});
arr.push({id: 11, name: 'Jane'});
arr.push({id: 12, name: 'Doe'});

root.render(
  <React.StrictMode>
    <App pages={arr}/>
  </React.StrictMode>
);