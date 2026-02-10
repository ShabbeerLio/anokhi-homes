import { ChartNoAxesGantt, LogIn, X } from "lucide-react";
import "./Navbar.css"
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import NiDashboardOutline from "../../icons/ni-dashboard-outline";
import NiAbout from "../../icons/ni-about";
import NiProjects from "../../icons/ni-projects";
import NiGallery from "../../icons/ni-gallery";
import NiContact from "../../icons/ni-contact";
import svgss from "../../Assets/icons/Construction crane-cuate.svg"
import MainLogo from "../../icons/MainLogo";

const Navbar = () => {
    const navigate = useNavigate();
    const [navActive, setNavActive] = useState(false);
    const handleToggleNav = () => {
        setNavActive(true);
        console.log("clicked")
    }
    return (
        <nav className="nav">
            <div className="nav-left">
                {/* <h1>ANOKHI HOMES</h1> */}
                {/* <img className="nav-logo" src={logo} alt="" /> */}
                <MainLogo/>
            </div>
            <div className={`nav-center ${navActive ? "active" : ""}`}>
                <div className="nav-items">
                    <NavLink onClick={() => setNavActive(false)} className={({ isActive }) => (isActive ? "nav-active" : "")} to="/"> <NiDashboardOutline />Home</NavLink>
                    <NavLink onClick={() => setNavActive(false)} className={({ isActive }) => (isActive ? "nav-active" : "")} to="/about"> <NiAbout />About</NavLink>
                    <NavLink onClick={() => setNavActive(false)} className={({ isActive }) => (isActive ? "nav-active" : "")} to="/projects"> <NiProjects /> Projects</NavLink>
                    <NavLink onClick={() => setNavActive(false)} className={({ isActive }) => (isActive ? "nav-active" : "")} to="/gallery"> <NiGallery /> Gallery</NavLink>
                    <NavLink onClick={() => setNavActive(false)} className={({ isActive }) => (isActive ? "nav-active" : "")} to="/contact"> <NiContact /> Contact Us</NavLink>
                </div>
                <div className="nav-item-middle">
                    <img src={svgss} alt="" />
                </div>
                <div className="nav-items2 nav-right">
                    <button className="btn primary" onClick={() => navigate("/role")}><LogIn />Sign in</button>
                </div>

                <X className="nav-togle close-btn" onClick={() => setNavActive(false)} />
            </div>
            <div className="nav-right">
                <button className="btn primary" onClick={() => navigate("/role")}><LogIn />Sign in</button>
                <ChartNoAxesGantt className="nav-togle" onClick={() => handleToggleNav()} />
            </div>
        </nav>
    )
};

export default Navbar;
