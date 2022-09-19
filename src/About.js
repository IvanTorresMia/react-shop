import React from "react";
import aboutImg from "./assets/fake-company.png";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormText from "react-bootstrap/FormText";

const About = () => {

  return (
    <Container>
      <Row>
        <Col>
          <Image src={aboutImg} />
        </Col>
        <Col>
          <h2>Welcome to our Company!</h2>
          <FormText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </FormText>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
