import { ChartNoAxesGantt, LogIn, X } from "lucide-react";
import "./Navbar.css"
import logo from "../../Assets/Anokhi-Homes-horizontal.png"
import { NavLink } from "react-router-dom";
import { useState } from "react";
const Navbar = () => {
    const [navActive, setNavActive] = useState(false);
    const handleToggleNav = () => {
        setNavActive(true);
        console.log("clicked")
    }
    return (
        <nav className="nav">
            <div className="nav-left">
                {/* <h1>ANOKHI HOMES</h1> */}
                <img className="nav-logo" src={logo} alt="" />
            </div>
            <div className={`nav-center ${navActive ? "active" : ""}`}>
                <NavLink onClick={() => setNavActive(false)} to="/">Home</NavLink>
                <NavLink onClick={() => setNavActive(false)} to="/about">About</NavLink>
                <NavLink onClick={() => setNavActive(false)} to="/projects">Projects</NavLink>
                <NavLink onClick={() => setNavActive(false)} to="/gallery">Gallery</NavLink>
                <NavLink onClick={() => setNavActive(false)} to="/contact">Contact Us</NavLink>
                <X className="nav-togle close-btn" onClick={() => setNavActive(false)} />
            </div>
            <div className="nav-right">
                <button className="btn primary"><LogIn />Sign in</button>
                <ChartNoAxesGantt className="nav-togle" onClick={() => handleToggleNav()} />
            </div>
        </nav>
    )
};

export default Navbar;
