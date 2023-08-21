import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

//Bootstrap
import { Card } from "react-bootstrap";

//bootstrap5
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FormControl from "react-bootstrap/FormControl";

//components
import Layout from "../components/Layout";

//Toastify
import { toast } from "react-toastify";

//Context API
import { AuthContext } from "../context/AuthContext";

import { NumericFormat } from "react-number-format";

const AddQuotation = () => {
  const { user } = useContext(AuthContext);

  const [validated, setValidated] = useState(false);

  const [customerId, setCustomerId] = useState("");
  const [userId, setUserId] = useState(user._id);
  const [userName, setUserName] = useState("");
  const [status, setStatus] = useState("");
  const [quoteGiven, setQuoteGiven] = useState("");
  const [date, setDate] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [quoteDetails, setQuoteDetails] = useState("");

  const [customerList, setCustomerList] = useState([]);

  //ID PARAM FROM LIST QUOTATION EDIT BUTTOM
  const { id } = useParams();

  //Load Customers data from api to populate the select input
  useEffect(() => {
    try {
      fetch(process.env.REACT_APP_API_URL + "/api/customers/list", {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
        .then((result) => result.json())
        .then((res) => {
          if (res.errors) {
            res.errors.map((error) => toast.error(error));
          } else {
            setCustomerList(res);
          }
        })
        .catch((err) => {
          toast.error(err);
        });
    } catch (error) {
      toast.error(error);
    }
  }, [user.token]);

  //Load Quotattion from ID PARAM
  useEffect(() => {
    if (id) {
      try {
        fetch(process.env.REACT_APP_API_URL + "/api/quotation/" + id)
          .then((result) => result.json())
          .then((res) => {
            console.log(res);
            if (res.errors) {
              res.errors.map((error) => toast.error(error));
            } else {
              setCustomerId(res.customerId._id);
              setUserId(res.userId._id);
              setUserName(res.userId.name);
              setStatus(res.status);
              setQuoteGiven(res.quoteGiven);
              setDate(moment.utc(res.date).format("YYYY-MM-DD"));
              setFollowUp(moment.utc(res.followUp).format("YYYY-MM-DD"));
              setQuoteDetails(res.quoteDetails);
            }
          })
          .catch((err) => {
            toast.error(err.message);
          });
      } catch (error) {
        toast.error(error.message);
      }
    }
  }, [user.token, id]);

  const navigate = useNavigate();

  //SUBMIT
  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);

    const form = event.currentTarget;
    //invalid
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    try {
      const formData = { customerId, userId, status, quoteGiven, date, followUp, quoteDetails };

      //UPDATE QUOTATION
      if (id) {
        await fetch(process.env.REACT_APP_API_URL + "/api/quotation/update/" + id, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: "Bearer " + user.token },
          body: JSON.stringify(formData),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log("respostaaa: " + res);
            if (res._id) {
              toast.success("Quotation Updated Successfully");
              navigate("/list_quotation");
            }
            if (res.errors) {
              res.errors.map((error) => toast.error(error));
            }
          })
          .catch((err) => {
            toast.error(err.message);
          });
      }

      //CREATE QUOTATION
      else {
        await fetch(process.env.REACT_APP_API_URL + "/api/quotation/add", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: "Bearer " + user.token },
          body: JSON.stringify(formData),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res._id) {
              toast.success("Quotation Add Successfully");
              navigate("/list_quotation");
            }
            if (res.errors) {
              res.errors.map((error) => toast.error(error));
            }
          })
          .catch((err) => {
            toast.error(err);
          });
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Layout>
      <Card className="card-custom-area">
        <Card.Header className="cardHeader-custom" as="h5">
          {id ? "UPDATE QUOTATION" : "ADD QUOTATION"}
        </Card.Header>
        <Card.Body>
          {/* START FORM HERE */}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              {/*CUSTOMER*/}
              <Form.Group as={Col} md="6">
                <Form.Label>Customer / Business</Form.Label>
                <Form.Control as="select" required value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
                  <option value="">Choose...</option>
                  {customerList.map((customer) => (
                    <option key={customer._id} value={customer._id}>
                      {customer.name} / {customer.business}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              {/*QUOTE GIVEN*/}
              <Form.Group as={Col} md="2">
                <Form.Label>Quote Given</Form.Label>
                <NumericFormat
                  customInput={FormControl}
                  required
                  thousandSeparator={false}
                  prefix={""}
                  allowNegative={false}
                  decimalScale={2}
                  placeholder="$0.00"
                  value={quoteGiven}
                  onChange={(e) => setQuoteGiven(e.target.value)}
                />

                <Form.Control.Feedback type="invalid">Quote Given Required</Form.Control.Feedback>
              </Form.Group>

              {/*STATUS*/}
              <Form.Group as={Col} md="2">
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" required value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="">Choose...</option>
                  <option value="Pending">Pending</option>
                  <option value="Finished"> Finished </option>
                  <option value="Canceled">Canceled</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">Status Required</Form.Control.Feedback>
              </Form.Group>

              {/*SALESPERSON*/}
              <Form.Group as={Col} md="2">
                <Form.Label>Salesperson</Form.Label>
                <Form.Control readOnly disabled type="text" value={userName} onChange={(e) => setFollowUp(e.target.value)} />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              {/*QUOTE DETAIL*/}
              <Form.Group as={Col} md="6">
                <Form.Label>Quote Details</Form.Label>
                <Form.Control as="textarea" rows={3} required value={quoteDetails} onChange={(e) => setQuoteDetails(e.target.value)} />
                <Form.Control.Feedback type="invalid">Quote Details Required</Form.Control.Feedback>
              </Form.Group>

              {/*DATE*/}
              <Form.Group as={Col} md="2">
                <Form.Label>Date</Form.Label>
                <Form.Control required type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <Form.Control.Feedback type="invalid">Date Required</Form.Control.Feedback>
              </Form.Group>

              {/*FOLLOW UP*/}
              <Form.Group as={Col} md="2">
                <Form.Label>Follow Up</Form.Label>
                <Form.Control required type="date" value={followUp} onChange={(e) => setFollowUp(e.target.value)} />
                <Form.Control.Feedback type="invalid">Follow Up Required</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button type="submit">{id ? "Update Quotation" : "Submit Quotation"}</Button>
          </Form>
          {/* END FORM HERE */}
        </Card.Body>
      </Card>
    </Layout>
  );
};

export default AddQuotation;
