import homeIcon from "../images/home-icon.png";

import { Outlet, Link } from "react-router-dom";

import "./header-component.css";

function  Header() {
    return (
        <div>
            <header className="header-component">
                <Link to="/"><img src={homeIcon} alt="Home Icon" /></Link>
            </header>
            <Outlet />
        </div>        
    );
}

export default Header;