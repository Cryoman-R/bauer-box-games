import homeIcon from "../images/home-icon.png";

import { connect } from 'react-redux';
import { Outlet, Link } from "react-router-dom";

import React from 'react';

import "./header-component.css";

const Header = (props) => {
    return (
        <div>
            <header className="header-component">
                <Link to="/bauer.box"><img src={homeIcon} alt="Home Icon" /></Link>
                <p style={{float: 'right'}}>{`${props.userDetails.username}`}</p>
            </header>
            <Outlet />
        </div>        
    );
}

const mapStateToProps = (state) => {
    console.log('state', state);

    return {
        userDetails: state.login.userDetails,
    }
}

export default connect(mapStateToProps, null) (Header);
