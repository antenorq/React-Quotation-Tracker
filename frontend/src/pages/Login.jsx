import "./Login.css";
import loginImg from "../assets/img/login-img.png";
import logo from "../assets/img/logo.png";

const Login = () => {
  return (
    <main>
      <section className="form_module">
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6 col-12 login_left_img">
              <img src={loginImg} alt="" />
            </div>
            <div className="col-md-6 col-12 form_fields">
              <div className="form_logo">
                <img src={logo} alt="" />
              </div>
              <div className="form_inner">
                <form>
                  <div className="form-group">
                    <label>Username/Email</label>
                    <input
                      type="text"
                      className="form-control"
                      name=""
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name=""
                      placeholder="Password"
                    />
                    <div className="form_links">
                      <a href="/">Forgot your password?</a>
                    </div>
                  </div>
                  <div className="form_btn">
                    <button className="form-btn">Login</button>
                  </div>
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
