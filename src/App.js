import React, { useState } from "react";
import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";
import RoleSelect from "./Pages/Signup/RoleSelect";
import Login from "./Pages/Signup/Login";
import Signup from "./Pages/Signup/Signup";
import Other from "./Pages/Other/Other";
import Plot from "./Pages/Plot/Plot";
import Projects from "./Pages/Plot/Projects";
import ProjectDetail from "./Pages/Plot/ProjectDetail";
import Profile from "./Pages/Profile/Profile";
import Navbar from "./components/LandingPage/Navbar";
import Footer from "./components/LandingPage/Footer";
import "./App.css";
import About from "./Pages/About/About";
import LandingProjects from "./Pages/LandingProjects/LandingProjects";
import Gallery from "./Pages/Gallery/Gallery";
import Contact from "./Pages/Contact/Contact";

const LandingLayout = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

function App() {
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mood, setMood] = useState("staf");

  return (
    <BrowserRouter>
      <div className={`app ${dark ? "dark" : ""} mood-${mood}`}>
        <Routes>
          <Route element={<LandingLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<LandingProjects />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="/role" element={<RoleSelect setMood={setMood} />} />
          <Route path="/login" element={<Login mood={mood} />} />
          <Route path="/signup" element={<Signup mood={mood} />} />
          <Route
            path="/*"
            element={
              <>
                <Topbar
                  dark={dark}
                  setDark={setDark}
                  setMobileOpen={setMobileOpen}
                  mood={mood}
                  setMood={setMood}
                />

                <div className="main">
                  <div
                    className={
                      mobileOpen ? "sidebar-wrap show" : "sidebar-wrap"
                    }
                  >
                    <Sidebar closeMobile={() => setMobileOpen(false)} />
                  </div>

                  <div className="page-wrap">
                    <Routes>
                      <Route path="/user" element={<Other />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/plot" element={<Plot mood={mood} />} />
                      <Route
                        path="/plot/:plotId"
                        element={<Projects mood={mood} />}
                      />
                      <Route
                        path="/plot/:plotId/:projectId"
                        element={<ProjectDetail mood={mood} />}
                      />
                    </Routes>
                  </div>
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
