import React, { useMemo, useState, useEffect, useRef } from "react";
import "./Profile.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Permissions from "../../components/Tabs/Permissions";
import Overview from "../../components/Tabs/Overview";
import Report from "../../components/Tabs/Report";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import NiShare from "../../icons/ni-share";
import NiCode from "../../icons/ni-code";
import NiLink from "../../icons/ni-link";

const Profile = ({ mood, currentUser, setAlert }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state;

  /* ================= SAFETY ================= */

  useEffect(() => {
    if (!userData) navigate("/dashboard");
  }, [userData, navigate]);

  //   if (!userData) return null;

  const isOwnProfile = currentUser?.id === userData?.id;

  /* ================= TAB VISIBILITY LOGIC ================= */

  const TABS = useMemo(() => {
    const tabs = [];

    // USER PROFILE
    if (userData.user === "Customer") {
      if (mood === "admin" || mood === "staff" || isOwnProfile) {
        tabs.push("Overview");
      }
    }

    // AGENT PROFILE
    if (userData.user === "associate") {
      if (
        mood === "admin" ||
        mood === "staff" ||
        (mood === "associate" && isOwnProfile)
      ) {
        tabs.push("Overview", "Report");
      }
    }

    // STAFF PROFILE
    if (userData.user === "staff") {
      if (mood === "admin") {
        tabs.push("Overview", "Permissions");
      }
      if (mood === "staff" && isOwnProfile) {
        tabs.push("Overview");
      }
    }

    return tabs.length ? tabs : ["Overview"];
  }, [mood, userData, isOwnProfile]);

  const [activeTab, setActiveTab] = useState("Overview");
  const [showReferralMenu, setShowReferralMenu] = useState(false);
  const referralRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (referralRef.current && !referralRef.current.contains(e.target)) {
        setShowReferralMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= TAB CONTENT ================= */

  const renderContent = () => {
    switch (activeTab) {
      case "Permissions":
        return mood === "admin" ? (
          <>
            <h4>Permissions</h4>
            <Permissions userData={userData} />
          </>
        ) : null;

      case "Report":
        return (
          <>
            <h4>Performance Report</h4>
            <Report userData={userData} />
          </>
        );

      default:
        return (
          <>
            <h4>Overview</h4>
            <Overview userData={userData} mood={mood} setAlert={setAlert}/>
          </>
        );
    }
  };

  const referralCode = `AGENT-${userData?.id || "0001"}`;
  const referralLink = `${window.location.origin}/register?ref=${referralCode}`;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);

    setAlert({
      message: "Copied to clipboard!",
      status: "Success",
    });

    setTimeout(() => setAlert(null), 2000);
  };

  const handleShare = () => {
    const message = `Join using my referral code: ${referralCode}\n${referralLink}`;

    if (navigator.share) {
      navigator.share({
        title: "Join Now",
        text: message,
        url: referralLink,
      });
    } else {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(message)}`,
        "_blank",
      );
    }
  };

  return (
    <div className="plot-container">
      <div className="table-filters">
        <div className="page-head-title">
          <div className="page-tools">
            <ChevronLeft className="back-button" onClick={() => navigate(-1)} />
            <h2>Profile Detail</h2>
          </div>
          <Breadcrumb />
        </div>
      </div>

      <div className="profile-grid">
        {/* LEFT PANEL */}
        <div className="profile-sidebar">
          <div className="profile-card card">
            <div className="profile-top">
              <img
                src={userData.avatar}
                alt={userData.name}
                className="profile-avatar"
              />
              <h3>{userData.name}</h3>
              <p className="role">
                {userData.user}, {userData.status}
              </p>
              {userData.user === "associate" && (
                <div className="referral-box">
                  <div className="referral-header dots">
                    {/* <h4>Referral</h4> */}

                    {/* DOT BUTTON */}
                    <span
                      className="dots"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowReferralMenu((prev) => !prev);
                      }}
                    >
                      <NiShare />
                    </span>

                    {/* ACTION MODAL */}
                    {showReferralMenu && (
                      <div ref={referralRef} className="action-modal">
                        <span
                          onClick={() => {
                            handleCopy(referralCode);
                            setShowReferralMenu(false);
                          }}
                        >
                          <NiCode /> Copy Code
                        </span>

                        {/* <span
                          onClick={() => {
                            handleCopy(referralLink);
                            setShowReferralMenu(false);
                          }}
                        >
                          <NiLink /> Copy Link
                        </span> */}

                        <span
                          onClick={() => {
                            handleShare();
                            setShowReferralMenu(false);
                          }}
                        >
                          <NiShare /> Share
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

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

        {/* RIGHT PANEL */}
        <div className="profile-main">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Profile;
