import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

//components
import Layout from "../components/Layout";
import FormQuotation from "../components/FormQuotation";
//Toastify
import { toast } from "react-toastify";
//Context API
import { AuthContext } from "../context/AuthContext";
//hooks
import useFirebaseUploadFile from "../hooks/useFirebaseUploadFile";
import useListCustomers from "../hooks/useListCustomers";

const UpdateQuotation = () => {
  //userlogged
  const { user } = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    customerId: "",
    userId: "",
    status: "",
    quoteGiven: "",
    date: "",
    followUp: "",
    quoteDetails: "",
    location: "",
    file: "",
  });

  //HOOKS
  const { UploadFile } = useFirebaseUploadFile();
  const customerList = useListCustomers();

  const navigate = useNavigate();

  //ID PARAM FROM LIST QUOTATION EDIT BUTTOM
  const { id } = useParams();

  //Load Quotattion from ID PARAM
  useEffect(async () => {
    if (id) {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + "/api/quotation/" + id);

        const result = await response.json();

        if (result) {
          toast.success("Quotation Load Successfuly");

          setFormData({ customerId: formData.customerId._id });
          setFormData({ userId: formData.userId._id });
          setFormData({ status: formData.status });
          setFormData({ quoteGiven: formData.quoteGiven });
          setFormData({ date: moment.utc(formData.date).format("YYYY-MM-DD") });
          setFormData({ followUp: moment.utc(formData.followUp).format("YYYY-MM-DD") });
          setFormData({ quoteDetails: formData.quoteDetails });
          setFormData({ location: formData.location });
          setFormData({ file: formData.file });
        } else {
          if (result.errors) {
            result.errors.map((error) => toast.error(error));
          } else {
            toast.error("Quotation Load Something went wrong");
          }
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  }, [formData, user.token, id]);

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
      if (id) {
        const quotation_update = await fetch(process.env.REACT_APP_API_URL + "/api/quotation/update/" + id, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: "Bearer " + user.token },
          body: JSON.stringify(formData),
        });

        const res_quotation_update = await quotation_update.json();

        if (res_quotation_update._id) {
          toast.success("Quotation Updated Successfully");

          const quotation_id = res_quotation_update._id;

          // FIREBASE STORAGE UPLOAD FILE
          if (formData.file !== null) {
            //Hook useFirebaseUploadFile to get fileUrl
            const fileUrl = await UploadFile(formData.file);

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
            } else {
              toast.error("Something went wrong to Upload File");
            }
          } else {
            toast.error("Quotation File was not found and not Linked");
          }
          // END OF FIREBASE UPLOAD
        } // END OF IF QUOTATION RESULT WAS OK

        //   if (res.errors) {
        //     res.errors.map((error) => toast.error(error));
        //   }
        // })
        // .catch((err) => {
        //   toast.error(err.message);
        // });
      }

      //CREATE QUOTATION

      if (id) {
        const quotation_update = await fetch(process.env.REACT_APP_API_URL + "/api/quotation/update/" + id, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: "Bearer " + user.token },
          body: JSON.stringify(formData),
        });

        const res_quotation_update = await quotation_update.json();

        if (res_quotation_update._id) {
          toast.success("Quotation Updated Successfully");

          const quotation_id = res_quotation_update._id;

          // FIREBASE STORAGE UPLOAD FILE
          if (formData.file !== null) {
            //Hook useFirebaseUploadFile to get fileUrl
            const fileUrl = await UploadFile(formData.file);

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
            } else {
              toast.error("Something went wrong to Upload File");
            }
          } else {
            toast.error("Quotation File was not found and not Linked");
          }
          // END OF FIREBASE UPLOAD
        } // END OF IF QUOTATION RESULT WAS OK

        navigate("/list_quotation");
      }
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

export default UpdateQuotation;
