import React, { useContext } from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { ProductContext } from "./ProductContext";

// component to list only three
function ListThree() {
  let navigate = useNavigate();
  // taking the deleteProduct function from the Product Context
  let { deleteProduct } = useContext(ProductContext);

  // function to delete product 
  function handleDeleteProduct(id) {
    deleteProduct(id);
    navigate("/products");
  }

  function productList(products) {
    // if products is null then stop the process
    if (products === null) return;

    return products.slice(0, 3).map((product, i) => (
      <Card key={i} style={{ width: "18rem" }}>
        <Card.Img variant="top" src={product.imageUrl} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>${product.price}</Card.Text>
          <Link className="btn btn-secondary m-2" to={`/${product.id}`}>
            View
          </Link>
          <Link className="btn btn-primary m-2" to={`/${product.id}/edit`}>
            Edit
          </Link>
          <Button
            variant="danger"
            onClick={handleDeleteProduct.bind(this, product.id)}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    ));
  }

  return (
    <>
      <h1>Products</h1>
      <Stack direction="horizontal" gap={3}>
        <Row id="list-3" className="align-self-center">
          <ProductContext.Consumer>
            {({ products }) => productList(products)}
          </ProductContext.Consumer>
        </Row>
        <Outlet />
      </Stack>
    </>
  );
}

export default ListThree;
