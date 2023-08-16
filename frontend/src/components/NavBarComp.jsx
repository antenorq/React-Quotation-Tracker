import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

//Context
import { AuthContext } from "../context/AuthContext";

//CSS
import "./NavBarComp.css";

const NavBarComp = ({ open, setOpen }) => {
  const { user, logout } = useContext(AuthContext);

  const toggleopen = () => {
    open === "open" ? setOpen("") : setOpen("open");
  };

  return (
    <Navbar fixed="top" expand="lg" className="navbar-custom">
      <Container fluid>
        <i className="bx bx-menu" id="btn" onClick={toggleopen}></i>
        <Navbar.Brand className="">{user.name}</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        {/* <Navbar.Collapse id="basic-navbar-nav"> */}
        <Nav className="justify-content-end flex-grow-1 pe-5">
          <NavDropdown
            title={user.type === 2 ? "Salesperson" : "Admin"}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Info</NavDropdown.Item>
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
};

export default NavBarComp;
