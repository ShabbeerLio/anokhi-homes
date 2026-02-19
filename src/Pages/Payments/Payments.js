import React from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import AdminPayments from "../../components/Payments/AdminPayments";
import AgentPayments from "../../components/Payments/AgentPayments";
import StaffPayments from "../../components/Payments/StaffPayments";
import "./Payments.css";


const Payments = ({ mood, staffType }) => {
  const renderPage = () => {
    switch (mood) {
      case "admin":
        return <AdminPayments mood={mood} />;
      case "agent":
        return <AgentPayments />;
      case "staff":
        return <StaffPayments staffType={"accounts"} />;
      default:
        return <div>Access Denied</div>;
    }
  };

  return (
    <div className="plot-container">
      <div className="table-filters">
        <h2>Payments Management</h2>
      </div>
      <Breadcrumb />
      <div className="dashboard-container">{renderPage()}</div>
    </div>
  );
};

export default Payments;