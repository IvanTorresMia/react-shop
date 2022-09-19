import React, { useContext, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { Outlet, Link, useParams } from "react-router-dom";
import { ProductContext } from "./ProductContext";

// componennt to list all products
function Search() {
  let params = useParams();

  // grabbing the filerProducts function from the ProductContext which we built
  let { filterProducts } = useContext(ProductContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // function to fetch and filter the products depending on what is in the params
    async function fetch() {
      await filterProducts(params.filter).then((response) => {
        setProducts(response);
      });
    }

    fetch();
  }, [params]);

  return (
    <>
      <h1>Products</h1>
      <Stack direction="horizontal" gap={3}>
        <Row id="list-3" className="align-self-center">
          {products.map((product, i) => (
            <Card key={i} style={{ width: "18rem" }}>
              <Card.Img variant="top" src={product.imageUrl} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <Link className="btn btn-secondary m-2" to={`/${product.id}`}>
                  View
                </Link>
                <Link className="btn btn-primary" to={`/${product.id}/edit`}>
                  Edit
                </Link>
              </Card.Body>
            </Card>
          ))}
        </Row>
        <Outlet />
      </Stack>
    </>
  );
}

export default Search;
