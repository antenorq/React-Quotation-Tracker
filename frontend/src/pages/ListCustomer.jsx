import { useState, useRef, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import Layout from "../components/Layout";

//bootstrap
import { Button } from "react-bootstrap";

//css
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { Link } from "react-router-dom";

const ListCustomer = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  const { REACT_APP_API_URL } = process.env;

  //Load Customers data from api
  useEffect(() => {
    fetch(REACT_APP_API_URL + "/api/customers")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, [REACT_APP_API_URL]);

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
  ]);

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    alert("clicked on: " + event.value);
  }, []);

  // Example using Grid's API
  // const buttonListener = useCallback((e) => {
  //   gridRef.current.api.deselectAll();
  // }, []);

  return (
    <Layout>
      <div>
        {/* Example using Grid's API */}
        {/* <button onClick={buttonListener}>Push Me</button> */}

        <Link to={"/add_customer"}>
          <Button>Add Customer</Button>
        </Link>
        <br />
        <br />
        <div
          className="ag-theme-alpine"
          style={{ width: "100%", height: "80vh" }}
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
          />
        </div>
      </div>
    </Layout>
  );
};

export default ListCustomer;
