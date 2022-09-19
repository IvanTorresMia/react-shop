import React, { useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { ProductContext } from "./ProductContext";

// componennt to list all products
function ListOfProducts() {
  let { setOrderOfProducts, deleteProduct } = useContext(ProductContext);
  let navigate = useNavigate();

  // function to delete item by the id
  function handleDeleteProduct(id) {
    deleteProduct(id);
    navigate("/products");
  }
  function productList(products) {
    // if products is null then stop the process
    if (products === null) return;

    return products.map((product, i) => (
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

  const orderItems = (order) => {
    setOrderOfProducts("asc-desc", order);
  };

  const filterItems = (key) => {
    let splitKey = key.split(",");
    let price1 = splitKey[0];
    let price2 = splitKey[1];
    setOrderOfProducts("price", price1, price2);
  };

  return (
    <>
      <h1>Products</h1>
      <Row>
        <Col>
          <Dropdown onSelect={filterItems}>
            <Dropdown.Toggle variant="info" id="dropdown-basic">
              Sort By Price
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="0,200">0-200</Dropdown.Item>
              <Dropdown.Item eventKey="201,500">201-500</Dropdown.Item>
              <Dropdown.Item eventKey="501,10000">501 and up</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <ButtonGroup>
            <Button
              className="m-2"
              variant="secondary"
              onClick={() => orderItems("desc")}
            >
              Price High to Low
            </Button>
            <Button className="m-2" onClick={() => orderItems("asc")}>
              Price Low to High
            </Button>
          </ButtonGroup>
        </Col>
      </Row>

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

export default ListOfProducts;
