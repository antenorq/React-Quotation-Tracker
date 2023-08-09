import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";

//CSS
import "./App.css";

//Booststrap 5
import "bootstrap/dist/css/bootstrap.min.css";

//Components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ListCustomer from "./pages/ListCustomer";
import AddCustomer from "./pages/AddCustomer";

//Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

//Context API
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  console.log("app.js user State:", user);

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/list_customer"
          element={user ? <ListCustomer /> : <Login />}
        />
        <Route
          path="/add_customer"
          element={user ? <AddCustomer /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
