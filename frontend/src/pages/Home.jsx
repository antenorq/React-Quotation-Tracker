import { useEffect, useState, useContext } from "react";
import Layout from "../components/Layout";
import { Row, Col, Card } from "react-bootstrap";
import "./Home.css";
import ListQuotation from "./ListQuotation";

//Toastify
import { toast } from "react-toastify";

//Context API
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  //Load ALL Quotation data from api
  useEffect(() => {
    try {
      fetch(process.env.REACT_APP_API_URL + "/api/quotation/list", {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
        .then((result) => result.json())
        .then((res) => {
          //console.log(res);
          if (res.errors) {
            res.errors.map((error) => toast.error(error));
          } else {
            //setRowData(res);
          }
        })
        .catch((err) => {
          toast.error(err);
        });
    } catch (error) {
      toast.error(error.message);
    }
  }, [user.token]);

  return (
    <Layout>
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
              <div className="title-content">Canceled</div>
              <span className="info-content">350</span>
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
      </Row>

      {/*// EVENTS//*/}
      <Card className="card-custom-area">
        <Card.Header className="cardHeader-custom" as="h5">
          Quotation Tracker
        </Card.Header>
        <Card.Body>
          <ListQuotation activeLayout={false} />
        </Card.Body>
      </Card>
    </Layout>
  );
};

export default Home;
