import React, { useEffect, useRef, useState } from "react";
import NiSearch from "../../icons/ni-search";
import NiMoon from "../../icons/ni-moon";
import NiSun from "../../icons/ni-sun";
import NiBell from "../../icons/ni-bell";
import NiTool from "../../icons/ni-tool";
import { useNavigate } from "react-router-dom";
import NotificationModal from "../Modals/NotificationModal";
import SearchModal from "../Modals/SearchModal";
import MainLogo from "../../icons/MainLogo";
function Topbar({ dark, setDark, setMobileOpen, mood, setMood }) {
  const [currentUser, setCurrentUser] = useState({
    id: 473,
    user: "admin",
    name: "Anokhi Homes",
    email: "anokhihomes@company.com",
    avatar: "https://i.pravatar.cc/150?img=2",
    status: "active",
  });
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);

  const profileRef = useRef();
  const notifRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target) &&
        notifRef.current &&
        !notifRef.current.contains(e.target)
      ) {
        setOpenProfile(false);
        setOpenNotif(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="topbar">
      <div className="top-left">
        <button className="mobile-btn" onClick={() => setMobileOpen((v) => !v)}>
          ☰
        </button>
        <span className="logo">
          <MainLogo />
        </span>
      </div>

      <div className="top-right">
        {/* Role Switch (Demo Only) */}
        <select
          className="top-mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="agent">Agent</option>
          <option value="staff">Staff</option>
          <option value="user">User</option>
        </select>

        {/* Notifications */}
        <div
          className="notif"
          ref={notifRef}
          onClick={() => {
            setOpenNotif(!openNotif);
            setOpenProfile(false);
          }}
        >
          <NiBell />
          <span>2</span>
          {openNotif && <NotificationModal />}
        </div>

        {/* Dark Mode */}
        <button className="top-mood" onClick={() => setDark(!dark)}>
          {dark ? <NiSun /> : <NiMoon />}
        </button>

        {/* PROFILE */}
        <div
          className="profile"
          ref={profileRef}
          onClick={() => {
            setOpenProfile(!openProfile);
            setOpenNotif(false);
          }}
        >
          <span>{currentUser?.user?.toUpperCase()}</span>

          <img src={currentUser?.avatar} alt="profile" />

          {openProfile && (
            <div className="profile-modal">
              <div className="pm-header">
                <img src={currentUser?.avatar} />
                <h4>{currentUser?.name}</h4>
                <p>{currentUser?.email}</p>
              </div>

              <div
                className="pm-item"
                onClick={() =>
                  navigate(`/user/${currentUser.id}`, {
                    state: currentUser,
                  })
                }
              >
                My Profile
              </div>

              <div className="pm-item">
                Mode{" "}
                <span onClick={() => setDark(!dark)}>
                  {dark ? <NiSun /> : <NiMoon />}
                </span>
              </div>

              <div className="pm-item">Help</div>

              <button className="pm-logout" onClick={handleLogout}>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
