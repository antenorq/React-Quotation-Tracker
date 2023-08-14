import fulllogo from "../assets/img/logowhite.png";
import halflogo from "../assets/img/logo-small-white.png";

import { useContext } from "react";
import { Link } from "react-router-dom";

//Context
import { AuthContext } from "../context/AuthContext";

//CSS
import "./SideBar.css";

const SideBar = ({ open }) => {
  const { setUser } = useContext(AuthContext);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div className={"sidebar " + open}>
      {/*<!-- LOGO -->*/}
      <div className="site_logo">
        <img className="full-logo" src={fulllogo} alt="Igloo logo" />
        <img className="half-logo" src={halflogo} alt="Igloo" />
      </div>
      {/*<!--NAV LIST-->*/}
      <ul className="nav-list">
        <li>
          <Link to={"/"} className="active">
            <i className="bx bxs-dashboard"></i>
            <span className="link_name">Overview</span>
          </Link>
          <span className="tooltip">Overview</span>
        </li>
        <li>
          <a href="/">
            <i className="bx bxs-search-alt-2"></i>
            <span className="link_name">Quotation Tracker</span>
          </a>
          <span className="tooltip">Quotation Tracker</span>
        </li>
        <li>
          <Link to={"/list_customer"}>
            <i className="bx bxs-user"></i>
            <span className="link_name">Customer</span>
          </Link>
          <span className="tooltip">Customer</span>
        </li>

        <li>
          <a href="/">
            <i className="bx bxs-message-square-add"></i>
            <span className="link_name">Quotation</span>
          </a>
          <span className="tooltip">Quotation</span>
        </li>

        <li>
          <Link to={"/login"}>
            <i className="bx bxs-user-detail"></i>
            <span className="link_name">Admin Users</span>
          </Link>
          <span className="tooltip">Admin Users</span>
        </li>
        <li>
          <Link to={"/register"}>
            <i className="bx bxs-help-circle"></i>
            <span className="link_name">Register</span>
          </Link>
          <span className="tooltip">Register</span>
        </li>

        <li className="logout" onClick={logout}>
          <div className="profile_details">
            <div className="profile_content">
              <div className="link_name">Logout</div>
            </div>
          </div>
          <i className="bx bx-log-out" id="log_out"></i>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
