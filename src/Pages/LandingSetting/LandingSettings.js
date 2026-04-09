import React, { useMemo, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./LandingSettings.css";
import Home from "../../components/LandingSetting/Home";
import About from "../../components/LandingSetting/About";
import Gallery from "../../components/LandingSetting/Gallery";
import Documents from "../../components/LandingSetting/Documents";
import Contact from "../../components/LandingSetting/Contact";
import Footer from "../../components/LandingSetting/Footer";
import Meta from "../../components/LandingSetting/Meta";
import PolicyPage from "../../components/LandingSetting/PolicyPage";

const LandingSetting = ({ mood, setAlert }) => {
  //   console.log(setAlert, "setAlert");
  const navigate = useNavigate();

  /* ================= ROLE BASED TABS ================= */

  const TABS = [
    "Home",
    "About",
    "Gallery",
    "Documents",
    "Contact",
    "Footer",
    "Meta",
    "Policies",
  ];

  const [activeTab, setActiveTab] = useState(TABS[0]);

  /* ================= TAB CONTENT ================= */

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <Home setAlert={setAlert} />;

      case "About":
        return <About setAlert={setAlert} />;

      case "Gallery":
        return <Gallery setAlert={setAlert} />;

      case "Documents":
        return <Documents setAlert={setAlert} />;

      case "Contact":
        return <Contact setAlert={setAlert} />;

      case "Footer":
        return <Footer setAlert={setAlert} />;

      case "Meta":
        return <Meta setAlert={setAlert} />;

      case "Policies":
        return <PolicyPage setAlert={setAlert} />;

      default:
        return <Home setAlert={setAlert} />;
    }
  };

  return (
    <div className="plot-container">
      <div className="table-filters">
        <div className="page-head-title">
          <div className="page-tools">
            <ChevronLeft className="back-button" onClick={() => navigate(-1)} />
            <h2>Front Pages Settings</h2>
          </div>
          <Breadcrumb />
        </div>
      </div>

      <div className="profile-grid">
        {/* LEFT SIDEBAR */}
        <div className="profile-sidebar">
          <div className="profile-card card">
            <div className="profile-nav">
              {TABS.map((tab) => (
                <span
                  key={tab}
                  className={activeTab === tab ? "menu active" : "menu"}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="profile-main">{renderContent()}</div>
      </div>
    </div>
  );
};

export default LandingSetting;
