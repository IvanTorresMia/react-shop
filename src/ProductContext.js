import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// creating context
export const ProductContext = createContext();

export const ProductProvider = (props) => {
  // storing the url in a variable to not type it all the time
  const url = "http://localhost:3001/products";

  // state to store the contacts
  const [products, setProducts] = useState([]);
  // state to store the in what order to filter the products
  // the type will store the type of filter
  // the args will store the range
  const [order, setOrder] = useState({
    type: "",
    arg1: 0,
    arg2: 0,
  });

  useEffect(() => {
    // Conditionally executing which a function depending on the type of filter
    async function getProducts() {
      if (order.type === "asc-desc") {
        await orderAscDesc();
      } else if (order.type === "price") {
        await filterByPrice();
      } else {
        await refreshProducts();
      }
    }

    getProducts();
    // the useEffect is listening to whenever the order state is updated.
    // if it is updated then the useEffect will execute
  }, [order]);

  // function to get all the products
  const refreshProducts = () => {
    return axios.get(url).then((response) => {
      setProducts(response.data);
    });
  };

  // function to get all products in either ascending or descending order
  // We are using the arg1 from the order state to determin the order
  const orderAscDesc = () => {
    return axios
      .get(`${url}?_sort=price&_order=${order.arg1}`)
      .then((response) => {
        setProducts(response.data);
      });
  };

  // this is the function that we use in our components to pass in the type and args
  // we then set the state of the order and the useEffect on top get's executed
  const setOrderOfProducts = (type, arg1, arg2) => {
    setOrder({ ...order, type: type, arg1: arg1, arg2: arg2 });
  };

  // this function filters the products by price
  // we use the args in the order state to determin the range
  function filterByPrice() {
    return axios
      .get(`${url}?price_gte=${order.arg1}&price_lte=${order.arg2}`)
      .then((response) => {
        setProducts(response.data);
      });
  }

  // function to get one product by it's id
  function getProduct(id) {
    return axios
      .get(`${url}/${id}`)
      .then((response) => new Promise((resolve) => resolve(response.data)))
      .catch(
        (error) => new Promise((_, reject) => reject(error.response.statusText))
      );
  }

  // function to delete product by it's id
  function deleteProduct(id) {
    axios.delete(`${url}/${id}`).then(refreshProducts);
  }

  // function to add product to the json server
  function addProduct(product) {
    // did this in order to parse int the product price
    product.price = parseInt(product.price);
    return axios.post(url, product).then((response) => {
      refreshProducts();
      return new Promise((resolve) => resolve(response.data));
    });
  }

  // function to update the product using both the id and the new product info
  function updateProduct(product) {
    product.price = parseInt(product.price);
    return axios.put(`${url}/${product.id}`, product).then((response) => {
      refreshProducts();
      return new Promise((resolve) => resolve(response.data));
    });
  }

  // function to filter the product on Change depending on what you type on the search bar
  function filterProducts(param) {
    return axios.get(`${url}/?q=${param}`).then((response) => {
      return new Promise((resolve) => resolve(response.data));
    });
  }

  // returning all the functions in this context to make them available when importing the context
  return (
    <ProductContext.Provider
      value={{
        products,
        getProduct,
        deleteProduct,
        addProduct,
        updateProduct,
        filterProducts,
        setOrderOfProducts,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
