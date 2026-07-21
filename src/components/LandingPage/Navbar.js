import { ChartNoAxesGantt, LogIn, X } from "lucide-react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NiDashboardOutline from "../../icons/ni-dashboard-outline";
import NiAbout from "../../icons/ni-about";
import NiProjects from "../../icons/ni-projects";
import NiGallery from "../../icons/ni-gallery";
import NiContact from "../../icons/ni-contact";
import svgss from "../../Assets/icons/Construction crane-cuate.svg";
import MainLogo from "../../icons/MainLogo";
import AdminLogo from "../../Assets/Logo/logo-anokhi-home-green.png";
import StaffLogo from "../../Assets/Logo/logo-anokhi-home-green.png";
import AgentLogo from "../../Assets/Logo/logo-anokhi-home-blue.png";
import UserLogo from "../../Assets/Logo/logo-anokhi-home-yellow.png";
import NiDocuments from "../../icons/ni-documents";
import Floating from "./Floating";
import { getAccountDetails } from "../../Redux/Slices/AppSlices";
import { useDispatch, useSelector } from "react-redux";

const Navbar = ({ dark, mood, setMood }) => {
  const dispatch = useDispatch();
  const { userDetail } = useSelector((state) => state.app);
  const navigate = useNavigate();
  const [navActive, setNavActive] = useState(false);
  const handleToggleNav = () => {
    setNavActive(true);
    // console.log("clicked");
  };

  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerPoint = window.innerHeight * 0.1; // 10% of screen height

      if (scrollPosition > triggerPoint) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getAccountDetails());
    }
  }, []);
  useEffect(() => {
    if (userDetail) {
      setMood(userDetail?.role);
    }
  }, [userDetail]);

  return (
    <div className="landing-pages" style={{ position: "relative" }}>
      <nav className={`nav ${sticky ? "sticky" : ""}`}>
        <div className="nav-left">
          {/* <h1>ANOKHI HOMES</h1> */}
          {/* <img className="nav-logo" src={AdminLogo} alt="" /> */}
          {dark === true ? (
            <img className="nav-logo" src={StaffLogo} alt="" />
          ) : (
            <img className="nav-logo" src={AdminLogo} alt="" />
          )}
          {/* // ) : mood === "staff" ? (
        //   <img className="nav-logo" src={StaffLogo} alt="" />
        // ) : mood === "agent" ? (
        //   <img className="nav-logo" src={AgentLogo} alt="" />
        // ) : (
        //   <img className="nav-logo" src={UserLogo} alt="" />
        // )} */}
          {/* <MainLogo/> */}
        </div>

        <div className="nav-right">
          <button className="btn primary" onClick={() => navigate("/login")}>
            <LogIn />
            Sign in
          </button>
          <ChartNoAxesGantt
            className="nav-togle"
            onClick={() => handleToggleNav()}
          />
        </div>
        {/* <Floating /> */}
      </nav>
      <div className={`nav-center ${sticky ? "sticky" : ""} ${navActive ? "active" : ""}`}>
        <div className="nav-items">
          <NavLink
            onClick={() => setNavActive(false)}
            className={({ isActive }) => (isActive ? "nav-active" : "")}
            to="/"
          >
            {" "}
            <NiDashboardOutline />
            Home
          </NavLink>
          <NavLink
            onClick={() => setNavActive(false)}
            className={({ isActive }) => (isActive ? "nav-active" : "")}
            to="/about"
          >
            {" "}
            <NiAbout />
            About
          </NavLink>
          <NavLink
            onClick={() => setNavActive(false)}
            className={({ isActive }) => (isActive ? "nav-active" : "")}
            to="/projects"
          >
            {" "}
            <NiProjects /> Projects
          </NavLink>
          <NavLink
            onClick={() => setNavActive(false)}
            className={({ isActive }) => (isActive ? "nav-active" : "")}
            to="/gallery"
          >
            {" "}
            <NiGallery /> Gallery
          </NavLink>
          <NavLink
            onClick={() => setNavActive(false)}
            className={({ isActive }) => (isActive ? "nav-active" : "")}
            to="/documents"
          >
            {" "}
            <NiDocuments /> Documents
          </NavLink>
          <NavLink
            onClick={() => setNavActive(false)}
            className={({ isActive }) => (isActive ? "nav-active" : "")}
            to="/contact"
          >
            {" "}
            <NiContact /> Contact Us
          </NavLink>
        </div>
        {/* <div className="nav-item-middle">
            <img src={svgss} alt="" />
          </div> */}
        <div className="nav-items2 nav-right">
          <button className="btn primary" onClick={() => navigate("/login")}>
            <LogIn />
            Sign in
          </button>
        </div>

        <X
          className="nav-togle close-btn"
          onClick={() => setNavActive(false)}
        />
      </div>
    </div>
  );
};

export default Navbar;
