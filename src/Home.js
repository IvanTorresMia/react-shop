import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import logo from "./assets/final-logo.jpg";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

import { Link, Outlet, useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();

  // this function uses navigate to update the params
  // the search component then takes the params and filters out the products
  const handleSearchChange = (event) => {
    // if the search bar is empty then stop the process
    if (event.target.value === "") return;
    event.preventDefault();
    navigate(`/${event.target.value}/search`);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Image className="nav-image" src={logo} />
          <Navbar.Text className="me-auto">Doe Products</Navbar.Text>
          <Nav className="justify-content-end">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/about" className="nav-link">
              About Us
            </Link>
            <Link to="/products" className="nav-link">
              View All
            </Link>
            <Link to="/new" className="nav-link">
              Create
            </Link>
          </Nav>
          <Navbar.Text>{/* <LoadingIndicator /> */}</Navbar.Text>
        </Container>
        <Form className="d-flex">
          <FormControl
            onChange={handleSearchChange}
            type="search"
            placeholder="Search"
            className="me-4"
            aria-label="Search"
          />
        </Form>
      </Navbar>
      <Stack gap={3} className="col-md-10 mx-auto mt-3">
        <Outlet />
      </Stack>
      <footer id="footer">
        <p class="text-muted mb-0 py-2">
          © 2019 Bootstrapious All rights reserved.
        </p>
      </footer>
    </>
  );
}

export default Home;
