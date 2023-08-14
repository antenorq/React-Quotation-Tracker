import { useState, useRef, useEffect, useCallback, useContext } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import Layout from "../components/Layout";

//bootstrap
import { Button } from "react-bootstrap";

//css
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { Link } from "react-router-dom";

//Toastify
import { toast } from "react-toastify";

//Context API
import { AuthContext } from "../context/AuthContext";

const ListCustomer = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  const { user } = useContext(AuthContext);

  //Load Customers data from api
  useEffect(() => {
    try {
      fetch(process.env.REACT_APP_API_URL + "/api/customers", {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
        .then((result) => result.json())
        .then((res) => {
          if (res.errors) {
            res.errors.map((error) => toast.error(error));
          } else {
            setRowData(res);
          }
        })
        .catch((err) => {
          toast.error(err);
        });
    } catch (error) {
      console.log(error.message);
    }
  }, [user.token]);

  const onGridReady = useCallback((params) => {
    gridRef.current.api.sizeColumnsToFit();
    //gridRef.current.columnApi.autoSizeColumns();
  }, []);

  // Each Column Definition results in one Column.
  const [columnDefs] = useState([
    { field: "name" },
    { field: "business" },
    { field: "email" },
    { field: "phone" },
    { field: "address" },
    { field: "createdAt", headerName: "Date Created", sort: "desc" },
  ]);

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    alert("clicked on: " + event.value);
  }, []);

  // Example using Grid's API
  // const buttonListener = useCallback((e) => {
  //   gridRef.current.api.deselectAll();
  // }, []);

  const onPageSizeChanged = useCallback(() => {
    var value = document.getElementById("page-size").value;
    gridRef.current.api.paginationSetPageSize(Number(value));
  }, []);

  return (
    <Layout>
      {/* Example using Grid's API */}
      {/* <button onClick={buttonListener}>Push Me</button> */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Link to={"/add_customer"}>
            <Button>Add Customer</Button>
          </Link>
        </div>
        <div>
          Page Size:{" "}
          <select onChange={onPageSizeChanged} id="page-size">
            <option value="15">15</option>
            <option value="50">100</option>
            <option value="100">500</option>
            <option value="500">1000</option>
          </select>
        </div>
      </div>
      <br />
      <div
        className="ag-theme-alpine"
        style={{ width: "100%", height: "100%" }}
      >
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={{ sortable: true, filter: true, resizable: true }} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
          onGridReady={onGridReady}
          suppressMenuHide={true}
          pagination={true}
          paginationPageSize={15}
        />
      </div>
    </Layout>
  );
};

export default ListCustomer;
