import React, { useContext, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ProductContext } from "./ProductContext";

const Product = () => {
  let params = useParams();

  //   console.log(params.id);

  let navigate = useNavigate();

  let { getProduct, deleteProduct } = useContext(ProductContext);

  let [product, setProduct] = useState();

  let [error, setError] = useState();

  useEffect(() => {
    setError(null);
    async function fetch() {
      await getProduct(params.id)
        .then((product) => setProduct(product))
        .catch((message) => setError(message));
    }
    fetch();
  }, [params.id, getProduct]);

  function loading() {
    return (
      <div className="w-25 text-center">
        <Spinner animation="border" />
      </div>
    );
  }

  function errorMessage() {
    return (
      <Alert variant="danger">
        There was an error attempting to load this contact: {error}
      </Alert>
    );
  }

  function handleDeleteProduct(id) {
    deleteProduct(id);
    navigate("/products")
  }

  function productCard() {
    let { id, name, description, used, price, imageUrl } = product;
    return (
      <Card className="align-self-start w-25">
        <Card.Img
          variant="top"
          src={imageUrl}
        />

        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{price}</Card.Subtitle>
          <Card.Text>
            <strong>description:</strong> <span>{description}</span>
          </Card.Text>
          <Card.Text>
           Condition: {used ? "this is a used item" : "this Item is new"}
          </Card.Text>
          <Link to={`/${id}/edit`} className="btn btn-primary m-2">
            Edit
          </Link>
          <Button variant="danger" onClick={handleDeleteProduct.bind(this, id)}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    );
  }

  if (error) return errorMessage();
  if (product === undefined) return loading();
  return product.id !== parseInt(params.id) ? loading() : productCard();
};

export default Product;
