import { useState, useEffect } from "react";
import "./Home.css";

import SideBar from "../components/SideBar";
import NavBarComp from "../components/NavBarComp";
import { Container, Row, Col, Card } from "react-bootstrap";

import clock from "../assets/img/clock-icon.svg";

const Home = () => {
  const [open, setOpen] = useState("open");
  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
      setOpen("");
    } else {
      setIsMobile(false);
      setOpen("open");
    }
  };

  // create an event listener everytime when resize
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
          <Container
            fluid
            className="white-container"
            style={{ borderRadius: "5px" }}
          >
            <Row>
              <Col className="mb-4" sm={12} md={6} lg={3}>
                <Card className="card-custom">
                  <Card.Body>
                    <div className="title-content">Finished</div>
                    <span className="info-content">250</span>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="mb-4 " sm={12} md={6} lg={3}>
                <Card className="card-custom">
                  <Card.Body>
                    <div className="title-content">Pending</div>
                    <span className="info-content">41</span>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="mb-4" sm={12} md={6} lg={3}>
                <Card className="card-custom">
                  <Card.Body>
                    <div className="title-content">Another Status</div>
                    <span className="info-content">02</span>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="mb-4" sm={12} md={6} lg={3}>
                <Card className="card-custom">
                  <Card.Body>
                    <div className="title-content">Canceled</div>
                    <span className="info-content">350</span>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/*// EVENTS//*/}
            <Card className="card-custom-events">
              <Card.Header className="cardHeader-custom-events" as="h5">
                Quotation Tracker
              </Card.Header>
              <Card.Body>
                Table here
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Card.Body>
            </Card>
          </Container>
        </Container>
      </section>
    </>
  );
};

export default Home;
