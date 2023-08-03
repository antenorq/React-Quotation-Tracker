import { BrowserRouter, Routes, Route } from "react-router-dom";

//CSS
import "./App.css";

//Booststrap 5
import "bootstrap/dist/css/bootstrap.min.css";

//Components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddCustomer from "./pages/AddCustomer";

function App() {
  const user = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/add_customer"
          element={user ? <AddCustomer /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
