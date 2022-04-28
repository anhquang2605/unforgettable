import React from 'react';
import './navbar.css';
const NavBar = (props) => {
    return (
        <div id="nav-bar">
            <div id="company-logo">
                Unforgetable
            </div>
            {props.children}
        </div>
    );
}

export default NavBar;
