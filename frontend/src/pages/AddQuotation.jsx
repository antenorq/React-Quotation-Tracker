import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//components
import Layout from "../components/Layout";

//Toastify
import { toast } from "react-toastify";

//Context API
import { AuthContext } from "../context/AuthContext";

import FirebaseUploadFile from "../funcions/FirebaseUploadFile";

import FormQuotation from "../components/FormQuotation";

const AddQuotation = () => {
  const navigate = useNavigate();
  //userlogged
  const { user } = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [formData, setFormData] = useState({
    customerId: "",
    userId: user._id, //prefill user id logged
    status: "",
    quoteGiven: "",
    date: "",
    followUp: "",
    quoteDetails: "",
    location: user.location, //prefill user location logged
    file: "",
  });

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

  //SUBMIT
  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidated(true);

    const form = event.currentTarget;
    //invalid form
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    try {
      //CREATE QUOTATION
      const response = await fetch(process.env.REACT_APP_API_URL + "/api/quotation/add", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + user.token },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      //created successfully
      if (result._id) {
        toast.success("Quotation ADD Successfully");
      } else {
        if (result.errors) {
          result.errors.map((error) => toast.error(error));
        } else {
          toast.error("Quotation Not Created");
        }
        return;
      }

      const quotation_id = result._id;

      // FIREBASE STORAGE UPLOAD FILE
      if (formData.file !== null) {
        //Function FirebaseUploadFile to get fileUrl
        const fileUrl = await FirebaseUploadFile(formData.file);

        console.log("fileUrl: " + fileUrl);
        //uploaded and get the fileUrl
        if (fileUrl) {
          const associatefile = { quotation_id, fileUrl };

          //API to associate pdf with the quotation
          const response = await fetch(process.env.REACT_APP_API_URL + "/api/quotation/associatefile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(associatefile),
          });

          const result = await response.json();

          if (result.ok) {
            toast.success("FILE LINKED TO QUOTATION Successfully ");
          }
          if (result.errors) {
            result.errors.map((error) => toast.error(error));
          }
        }
      } else {
        toast.error("Quotation File was not found and not Linked");
      }

      navigate("/list_quotation");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Layout>
      <FormQuotation formData={formData} setFormData={setFormData} customerList={customerList} handleSubmit={handleSubmit} validated={validated} />
    </Layout>
  );
};

export default AddQuotation;
