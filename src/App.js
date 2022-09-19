import React from 'react';
import Home from './Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListThree from './ListThree';
import About from './About';
import ListOfProducts from './ListOfProducts';
import Product from './Product';
import ProductForm from './ProductForm';
import Search from './Search';



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<ListThree />}/>
        <Route path="about" element={<About />} />
        <Route path="products" element={<ListOfProducts />} />
        <Route path=":filter/search" element={<Search />} />
        <Route path="new" element={<ProductForm />} />
        <Route path=":id" element={<Product />} />
        <Route path=":id/edit" element={<ProductForm />} />
      </Route>
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
