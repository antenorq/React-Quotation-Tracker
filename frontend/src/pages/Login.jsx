import { useContext, useState } from "react";

import "./Login.css";
import loginImg from "../assets/img/login-img.png";
//import logo from "../assets/img/logo.png";
import { useNavigate } from "react-router-dom";

//Context API
import { AuthContext } from "../context/AuthContext";

//Toastify
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  //SUBMIT
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = { email, password };

      console.log(process.env.REACT_APP_API_URL);

      await fetch(process.env.REACT_APP_API_URL + "/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res._id) {
            toast.success("User Logged Successfuly");
            setEmail("");
            setPassword("");
            setUser(res);
            localStorage.setItem("user", JSON.stringify(res));
            console.log(res);
            navigate("/");
          }
          if (res.errors) {
            res.errors.map((error) => toast.error(error));
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <main>
      <section className="form_module">
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6 col-12 login_left_img">
              <img src={loginImg} alt="" className="img-fluid" />
            </div>
            <div className="col-md-6 col-12 form_fields">
              <div className="form_logo">
                {/* <img src={logo} alt="" />
                <br />
                <br /> */}
                LOGIN
                <br />
                <br />
              </div>
              <div className="form_inner">
                <form>
                  <div className="form-group">
                    <label>Username/Email</label>
                    <input type="text" className="form-control" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className="form_links">
                      <a href="/">Forgot your password?</a>
                    </div>
                  </div>
                  <div className="form_btn">
                    <button className="form-btn" onClick={handleSubmit}>
                      Login
                    </button>
                  </div>
                  <br />
                  {/* <Link to="/register">Don't have an account? Sign Up</Link> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
