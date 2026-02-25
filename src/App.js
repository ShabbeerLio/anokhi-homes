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
import LandingProjectDetail from "./Pages/LandingProjects/LandingProjectDetail";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Booking from "./Pages/Booking/Booking";
import Team from "./Pages/Teams/Team";
import Management from "./Pages/Management/Management";
import SiteVisit from "./Pages/SiteVisit/SiteVisit";
import Payments from "./Pages/Payments/Payments";
import TeamDetail from "./Pages/Teams/TeamDetail";

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
  const [mood, setMood] = useState("staff");

  return (
    <BrowserRouter>
      <div className={`app ${dark ? "dark" : ""} mood-${mood}`}>
        <Routes>
          <Route element={<LandingLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<LandingProjects />} />
            <Route
              path="/projects/:projectId"
              element={<LandingProjectDetail />}
            />
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
                    <Sidebar
                      closeMobile={() => setMobileOpen(false)}
                      mood={mood}
                    />
                  </div>

                  <div className="page-wrap">
                    <Routes>
                      <Route
                        path="/dashboard"
                        element={<Dashboard mood={mood} />}
                      />
                      <Route path="/user" element={<Other mood={mood}/>} />
                      <Route
                        path="/bookings"
                        element={<Booking mood={mood} />}
                      />
                      <Route path="/teams" element={<Team mood={mood} />} />
                      <Route
                        path="/teams/:id"
                        element={
                          <TeamDetail
                            mood="agent"
                            currentUser={{ id: "amit", name: "Amit" }}
                          />
                        }
                      />
                      <Route
                        path="/management"
                        element={<Management mood={mood} />}
                      />
                      <Route
                        path="/site-visits"
                        element={<SiteVisit mood={mood} />}
                      />
                      <Route
                        path="/payments"
                        element={<Payments mood={mood} />}
                      />
                      <Route path="/user/:id" element={<Profile />} />
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
