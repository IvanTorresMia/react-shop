import React, { useState, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "./ProductContext";

const ProductForm = () => {
  let params = useParams();

  //   storing the product info in this state
  let [product, setProduct] = useState({
    id: params.id,
    name: "",
    description: "",
    used: false,
    price: 0,
    imageUrl: "",
  });

  //   getting functions that we need for this component from the ProductContext
  let { addProduct, getProduct, updateProduct } = useContext(ProductContext);
  let navigate = useNavigate();
  //   abstracting the product state
  let { id, name, description, used, price, imageUrl } = product;

  useEffect(() => {
    //   stopping the process if there no Id in the params
    if (id === undefined) return;
    // function to fetch the product by it's id
    async function fetch() {
      await getProduct(id).then((product) => setProduct(product));
    }

    fetch();
  }, [id]);

  //   function to set the product state on change
  function handleChange(event) {
    // setting the product value and using the name attribute in the inputs to determin which key in the state to update
    setProduct((preValue) => {
      return {
        ...preValue,
        [event.target.name]: event.target.value,
      };
    });
  }

  // created a single function for setting the used key in the product state
  function handleUsedhange(event) {
    event.preventDefault();

    // this is another way to set state.
    // when setting only one state this is the way to go
    setProduct({ ...product, used: event.target.value });
  }

  // depending on weather there is an id in the state or not we will update or add a new product
  function addOrUpdate() {
    if (id === undefined) {
      return addProduct(product);
    } else {
      return updateProduct(product);
    }
  }

  // function to submit the product calling the addOrUpdate function on top
  // then we navigate to that products details
  function handleSubmit(event) {
    event.preventDefault();
    addOrUpdate().then((product) => navigate(`/${product.id}`));
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Is this item used?</Form.Label>
        <Form.Select onChange={handleUsedhange} aria-label="Is this Item Used?">
          <option>Open this select menu</option>
          <option value={true}>yes</option>
          <option value={false}>no</option>
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="text"
          name="price"
          value={price}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="text"
          name="imageUrl"
          value={imageUrl}
          placeholder="type an image URL"
          onChange={handleChange}
        />
      </Form.Group>

      <Button className="mt-4" type="submit">
        Save
      </Button>
    </Form>
  );
};

export default ProductForm;
