import Layout from "../components/Layout";
import { Row, Col, Card } from "react-bootstrap";
import "./Home.css";

const Home = () => {
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
      <Card className="card-custom-area">
        <Card.Header className="cardHeader-custom" as="h5">
          Quotation Tracker
        </Card.Header>
        <Card.Body>Table here</Card.Body>
      </Card>
    </Layout>
  );
};

export default Home;
