import { useContext, useState } from "react";

import "./Login.css";
import loginImg from "../assets/img/login-img.png";
//import logo from "../assets/img/logo.png";
import { useNavigate } from "react-router-dom";

//Context API
import { AuthContext } from "../context/AuthContext";

//Toastify
import { toast } from "react-toastify";

//Google Login
//import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  //Google Login Functions
  const responseMessage = (response) => {
    const userObject = jwtDecode(response.credential);
    console.log(userObject);
    console.log(userObject.email);

    setEmail(userObject.email);

    if (userObject.email_verified && userObject.email) {
      handleSubmit(userObject.email);
    }
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  // const login = useGoogleLogin({
  //   // onSuccess: (codeResponse) => setUser(codeResponse),
  //   onSuccess: (codeResponse) => console.log(codeResponse),
  //   onError: (error) => console.log("Login Failed:", error),
  // });

  // const logOut = () => {
  //   googleLogout();
  //   //setProfile(null);
  //   console.log("AQUIUIU");
  // };

  //SUBMIT
  //const handleSubmit = async (event) => {
  const handleSubmit = async (email) => {
    try {
      //event.preventDefault();
      //const data = { email, password };
      const data = { email: email };
      console.log(data);
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
              <div style={{ textAlign: "-webkit-center" }}>
                <GoogleLogin onSuccess={responseMessage} onError={errorMessage} shape={"pill"} theme="filled_blue" />
                {/* <button onClick={() => login()}>Sign in with Google 🚀 </button>
                <button onClick={logOut}>Log out</button> */}
              </div>
              <br></br>
              <div className="form_inner">
                {/* <form>
                  <div className="form-group">
                    <label>Username/Email</label>
                    <input type="text" className="form-control" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
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
                </form> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
