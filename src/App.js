import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
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

function App() {
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mood, setMood] = useState("staf");

  return (
    <BrowserRouter>
      <div className={`app ${dark ? "dark" : ""} mood-${mood}`}>
        <Routes>
          {/* 🔐 AUTH ROUTES (NO SIDEBAR, NO TOPBAR) */}
          <Route path="/role" element={<RoleSelect setMood={setMood} />} />
          <Route path="/login" element={<Login mood={mood} />} />
          <Route path="/signup" element={<Signup mood={mood} />} />

          {/* 🏠 DASHBOARD LAYOUT */}
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
                      <Route path="/" element={<Home />} />
                      <Route path="/user" element={<Other />} />
                      <Route path="/plot" element={<Plot />} />
                      <Route path="/plot/:plotId" element={<Projects />} />
                      <Route
                        path="/projects/:projectId"
                        element={<ProjectDetail mood={mood}/>}
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
