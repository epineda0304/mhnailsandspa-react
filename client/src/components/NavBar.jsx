import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

import logo from "/Logo.svg";

import styles from "../styles/style.module.css";

export default function NavBar() {
  return (
    <>
      <Navbar
        expand={"lg"}
        className={styles.offwhitebg}
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      >
        <Container fluid>
          <NavbarBrand />
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            className="w-75"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title
                id={`offcanvasNavbarLabel-expand-lg`}
                className="mx-auto"
              >
                <img alt="logo" src={logo} width={60} height={60} />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <NavbarLinks />
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

function NavbarBrand() {
  return (
    <Navbar.Brand href="/">
      <img alt="logo" src={logo} width={82} height={82} />
    </Navbar.Brand>
  );
}

function NavbarLinks() {
  return (
    <Nav className="justify-content-end flex-grow-1 pe-3">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/serviceMenu/Pedicure">Services</Nav.Link>
      <Nav.Link href="/location">Location</Nav.Link>
      <Nav.Link href="tel:4078703826">407-870-3826</Nav.Link>
    </Nav>
  );
}
