import { useState, useEffect } from "react";
import "./Layout.css";

import SideBar from "../components/SideBar";
import NavBarComp from "../components/NavBarComp";
import { Container } from "react-bootstrap";

const Layout = ({ children }) => {
  const [open, setOpen] = useState("open");

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setOpen("");
    } else {
      setOpen("open");
    }
  };

  //create an event listener everytime when resize
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    handleResize();
  }, []);

  return (
    <>
      <SideBar open={open} />
      <section className="main-content">
        <NavBarComp open={open} setOpen={setOpen} />
        <Container fluid className="geral-container">
          <Container fluid className="white-container">
            {children}
          </Container>
        </Container>
      </section>
    </>
  );
};

export default Layout;
