import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

//CSS
import "./NavBarComp.css";

const NavBarComp = ({ open, setOpen }) => {
  const toggleopen = () => {
    open === "open" ? setOpen("") : setOpen("open");
  };

  return (
    <Navbar fixed="top" expand="lg" className="navbar-custom">
      <Container fluid>
        <i className="bx bx-menu" id="btn" onClick={toggleopen}></i>
        <Navbar.Brand className="">Antenor Queiroz</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        {/* <Navbar.Collapse id="basic-navbar-nav"> */}
        <Nav className="justify-content-end flex-grow-1 pe-5">
          <NavDropdown title="Manager" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Info</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
};

export default NavBarComp;
