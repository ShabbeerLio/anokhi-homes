import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import NiDashboard from "../../icons/ni-dashboard";
import NiDashboardOutline from "../../icons/ni-dashboard-outline";
import NiTool from "../../icons/ni-tool";
import NiBooking from "../../icons/ni-booking";
import NiTeams from "../../icons/ni-teams";
import NiManagement from "../../icons/ni-management";
import NiUser from "../../icons/ni-user";
import NiSetting from "../../icons/ni-setting";
import NiSitevisit from "../../icons/ni-sitevisit";
import NiPayments from "../../icons/ni-payments";

function Sidebar({ closeMobile, mood }) {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenu, setOpenMenu] = useState("dash"); // only one open at a time

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  const handleClick = () => {
    closeMobile && closeMobile();
  };

  // 🔥 Menu Configuration (Professional Way)
  const menuConfig = {
    user: [
      { path: "/plot", label: "Plots", icon: <NiTool /> },
      { path: "/bookings", label: "Bookings", icon: <NiBooking /> },
      { path: "/site-visits", label: "Follow Up", icon: <NiSitevisit /> },
    ],
    admin: [
      { path: "/management", label: "Lead Mgnt.", icon: <NiManagement /> },
      { path: "/site-visits", label: "Site Visits", icon: <NiSitevisit /> },
      { path: "/plot", label: "Plots", icon: <NiTool /> },
      { path: "/bookings", label: "Bookings", icon: <NiBooking /> },
      { path: "/user", label: "Users", icon: <NiUser /> },
      { path: "/teams", label: "Teams", icon: <NiTeams /> },
      { path: "/payments", label: "Payments", icon: <NiPayments /> },
      { path: "/commission", label: "Commission", icon: <NiPayments /> },
      {
        path: "/offers-discounts",
        label: "Offers & Discounts",
        icon: <NiPayments />,
      },
    ],
    staff: [
      { path: "/management", label: "Lead Mgnt.", icon: <NiManagement /> },
      { path: "/site-visits", label: "Site Visits", icon: <NiSitevisit /> },
      { path: "/plot", label: "Plots", icon: <NiTool /> },
      { path: "/bookings", label: "Bookings", icon: <NiBooking /> },
      { path: "/user", label: "Users", icon: <NiUser /> },
      { path: "/teams", label: "Teams", icon: <NiTeams /> },
      { path: "/payments", label: "Payments", icon: <NiPayments /> },
      { path: "/commission", label: "Commission", icon: <NiPayments /> },
      {
        path: "/offers-discounts",
        label: "Offers & Discounts",
        icon: <NiPayments />,
      },
    ],
    agent: [
      { path: "/management", label: "Lead Mgnt.", icon: <NiManagement /> },
      { path: "/site-visits", label: "Site Visits", icon: <NiSitevisit /> },
      { path: "/plot", label: "Plots", icon: <NiTool /> },
      { path: "/bookings", label: "Bookings", icon: <NiBooking /> },
      { path: "/teams", label: "Teams", icon: <NiTeams /> },
      { path: "/payments", label: "Payments", icon: <NiPayments /> },
      { path: "/commission", label: "Commission", icon: <NiPayments /> },
      {
        path: "/offers-discounts",
        label: "Offers & Discounts",
        icon: <NiPayments />,
      },
    ],
  };

  return (
    <div className={collapsed ? "sidebar collapsed" : "sidebar"}>
      <NavLink to="/dashboard" className="menu" onClick={handleClick}>
        <NiDashboardOutline />
        {!collapsed && "Dashboard"}
      </NavLink>
      {/* Role Based Menus */}
      {menuConfig[mood]?.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className="menu"
          onClick={handleClick}
        >
          {item.icon}
          {!collapsed && item.label}
        </NavLink>
      ))}
      <NavLink to="/settings" className="menu single" onClick={handleClick}>
        <NiSetting />
        {!collapsed && "Settings"}
      </NavLink>
    </div>
  );
}

export default Sidebar;
