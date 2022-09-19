import React from 'react';
import ReactDOM from 'react-dom';
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App';
import { ProductProvider } from './ProductContext';

ReactDOM.render(
  <React.StrictMode>
    <ProductProvider>
      <App />
    </ProductProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
