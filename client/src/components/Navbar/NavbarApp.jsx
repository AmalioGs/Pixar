import React, { useContext } from "react";
import { Button, Form, Container, Nav, Navbar, Row, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { PixarContext } from "../../context/ContextProvider";

export const NavbarApp = () => {
  const {user, setUser, setToken} = useContext(PixarContext)
  const navigate = useNavigate();
  const logOut = () =>{
    localStorage.removeItem("token")
    setUser();
    setToken();
    navigate("/");
  }

  return (
    <header>
      <Row>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand as={Link} to="/home">
              Pixar
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link as={Link} to="/home">
                  Home
                </Nav.Link>
                <NavDropdown title="Perfil" id="navbarScrollingDropdown">
                  <NavDropdown.Item as={Link} to="/profile">Mi perfil</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/editProfile">
                    Editar perfil
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex me-2">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline">🔎</Button>
              </Form>
                <Button variant="outline-success" onClick={logOut}>
                  Cerrar sesión
                </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
    </header>
  );
};
