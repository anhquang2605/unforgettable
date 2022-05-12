import React from 'react';
import './navbar.css';
import logo from "../../images/logo.svg";

const NavBar = (props) => {
  return (
    <div id="nav-bar">
      <div id="company-logo">
        <img src={logo} alt="" /> Unforgetable
      </div>
      <div className="navigation_part">{props.children}</div>
    </div>
  );
};

export default NavBar;
