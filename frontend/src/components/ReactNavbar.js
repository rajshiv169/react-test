import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav } from "react-bootstrap";

class ReactNavbar extends Component {
  render() {
    return (
      <Navbar bg="light" variant="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>Mern Task</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/window2/new">
              <Nav.Link>Solutions</Nav.Link>
            </LinkContainer>
            <LinkContainer to="window3">
              <Nav.Link>Pricing</Nav.Link>
            </LinkContainer>
            <Nav.Link>What we do</Nav.Link>
            <Nav.Link>Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default ReactNavbar;
