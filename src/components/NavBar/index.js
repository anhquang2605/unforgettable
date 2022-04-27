import React from 'react';
import './navbar.css';
const NavBar = (props) => {
    return (
        <div id="nav-bar">
            {props.children}
        </div>
    );
}

export default NavBar;
