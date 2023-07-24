import { useState } from "react";
import fulllogo from "../assets/img/logowhite.png";
import halflogo from "../assets/img/logo-small-white.png";

import { Link } from "react-router-dom";

//CSS
import "./SideBar.css";

const SideBar = ({ open }) => {
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
          <a href="#" className="active">
            <i className="bx bxs-dashboard"></i>
            <span className="link_name">Overview</span>
          </a>
          <span className="tooltip">Overview</span>
        </li>
        <li>
          <a href="#">
            <i class="bx bxs-search-alt-2"></i>
            <span className="link_name">Quotation Tracker</span>
          </a>
          <span className="tooltip">Quotation Tracker</span>
        </li>
        <li>
          <a href="#">
            <i className="bx bxs-user"></i>
            <span className="link_name">Add Customer</span>
          </a>
          <span className="tooltip">Add Customer</span>
        </li>

        <li>
          <a href="#">
            <i class="bx bxs-message-square-add"></i>
            <span className="link_name">Add Quotation</span>
          </a>
          <span className="tooltip">Add Quotation</span>
        </li>

        <li>
          <Link to={"/login"}>
            <i class="bx bxs-user-detail"></i>
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

        <li className="logout">
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
