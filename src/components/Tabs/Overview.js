import React, { useState } from "react";
import "./Tabs.css";
import NiCross from "../../icons/ni-cross";
import NiTick from "../../icons/ni-tick";
import DeleteModal from "../Modals/DeleteModal";

const Overview = ({ userData, mood, setAlert }) => {
  const [disapproveOpen, setDisapproveOpen] = useState(false);
  const [formData, setFormData] = useState({});
  if (!userData) return null;

  const AGENTS = [
    {
      id: 1001,
      user: "Associate",
      name: "Rahul Sharma",
      email: "rahul@company.com",
      phone: "9876543210",
      avatar: "https://i.pravatar.cc/150?img=11",

      status: "pending",
      joined: "2026-04-04",

      personal: {
        address: "Delhi",
        panNumber: "ABCDE1234F",
        panPhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8UAnlghZyb1Rd0kUlB8MLo0pfQWDP7loMEg&s",
        aadharNumber: "123456789012",
        aadharPhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8UAnlghZyb1Rd0kUlB8MLo0pfQWDP7loMEg&s",
      },

      bank: {
        bankName: "HDFC Bank",
        accountNumber: "1234567890",
        ifsc: "HDFC0001234",
      },

      nominee: {
        name: "Priya Sharma",
        relation: "wife",
        aadharNumber: "987654321012",
        aadharPhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8UAnlghZyb1Rd0kUlB8MLo0pfQWDP7loMEg&s",
      },

      referral: {
        code: "REF123",
        name: "Senior Agent Amit",
      },

      performance: {
        totalSales: 0,
        totalBookings: 0,
        propertiesSold: 0,
        commissionEarned: 0,
        conversionRate: 0,
        monthlySales: [],
      },

      permissions: [],
    },
  ];

  const STAFF = [
    {
      id: 2001,
      user: "staff",
      name: "Anjali Verma",
      email: "anjali@company.com",
      phone: "9123456780",
      avatar: "https://i.pravatar.cc/150?img=5",

      status: "pending",
      joined: "2026-04-04",

      role: "Sales Manager",

      permissions: ["Manage Leads", "Manage Bookings", "Access Reports"],

      personal: {
        address: "Mumbai",
      },
    },
  ];

  const USERS = [
    {
      id: 3001,
      user: "Customer",
      name: "Amit Kumar",
      email: "amit@gmail.com",
      phone: "9988776655",
      avatar: "https://i.pravatar.cc/150?img=3",

      status: "pending",
      joined: "2026-04-04",

      connected: {
        name: "Rahul (Associate)",
        number: "9876543210",
      },

      activity: {
        inquiries: [5],
        visits: [3],
        bookings: [1],
      },
    },
  ];

  console.log(mood);
  return (
    <div className="card overview-card">
      <div className="overview-grid">
        <div>
          <label>Full Name</label>
          <p>{userData.name}</p>
        </div>

        <div>
          <label>Email</label>
          <p>{userData.email || "Not Provided"}</p>
        </div>

        <div>
          <label>Phone</label>
          <p>{userData.phone || "Not Provided"}</p>
        </div>

        <div>
          <label>Role</label>
          <p>{STAFF[0].role}</p>
        </div>

        <div>
          <label>Status</label>
          <p className={`status ${userData.status}`}>
            {userData.status === "active"
              ? "Active"
              : userData.status === "pending"
                ? "Pending"
                : "Inactive"}
          </p>
        </div>

        <div>
          <label>Joined On</label>
          <p>{userData.joined || "—"}</p>
        </div>
      </div>
      {mood === "admin" && userData.status === "pending" && (
        <div className="modal-actions">
          <button
            className="site-visit-approval status active"
            onClick={() => {
              setAlert({
                message: "Associate approved successfully",
                status: "Success",
              });

              setTimeout(() => setAlert(null), 3000);
            }}
          >
            <NiTick /> Approve
          </button>

          <button
            className="site-visit-approval status failed"
            onClick={() => setDisapproveOpen(true)}
          >
            <NiCross /> Disapprove
          </button>
        </div>
      )}
      {/* Show small stats if Agent */}
      {userData.user === "associate" && (
        <div className="agent-mini-stats">
          <h4>Personal Details</h4>
          <div className="overview-grid">
            {AGENTS[0].personal &&
              Object.entries(AGENTS[0].personal).map(([key, value]) => (
                <div key={key}>
                  <label>
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </label>

                  {/* ✅ Show image if photo */}
                  {key.toLowerCase().includes("photo") ? (
                    <p>
                      <img
                        src={value}
                        alt={key}
                        className="doc-thumbnail"
                        onClick={() => window.open(value, "_blank")}
                      />
                    </p>
                  ) : (
                    <p>{value}</p>
                  )}
                </div>
              ))}
          </div>
          <h4>Bank Details</h4>
          <div className="overview-grid">
            {AGENTS[0].bank &&
              Object.entries(AGENTS[0].bank).map(([key, value]) => (
                <div>
                  <label>
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  <p>{value}</p>
                </div>
              ))}
          </div>
          <h4>Nominee Details</h4>
          <div className="overview-grid">
            {AGENTS[0].nominee &&
              Object.entries(AGENTS[0].nominee).map(([key, value]) => (
                <div key={key}>
                  <label>
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </label>

                  {key.toLowerCase().includes("photo") ? (
                    <p>
                      <img
                        src={value}
                        alt={key}
                        className="doc-thumbnail"
                        onClick={() => window.open(value, "_blank")}
                      />
                    </p>
                  ) : (
                    <p>{value}</p>
                  )}
                </div>
              ))}
          </div>
          <h4>Referral Details</h4>
          <div className="overview-grid">
            {AGENTS[0].referral &&
              Object.entries(AGENTS[0].referral).map(([key, value]) => (
                <div>
                  <label>
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  <p>{value}</p>
                </div>
              ))}
          </div>
        </div>
      )}
      {userData.user === "staff" && (
        <div className="agent-mini-stats">
          <h4>Personal Details</h4>
          <div className="overview-grid">
            {STAFF[0].personal &&
              Object.entries(STAFF[0].personal).map(([key, value]) => (
                <div>
                  <label>
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  <p>{value}</p>
                </div>
              ))}
          </div>
          {/* <h4>Bank Details</h4>
          <div className="overview-grid">
            {STAFF[0].bank &&
              Object.entries(STAFF[0].bank).map(([key, value]) => (
                <div>
                  <label>
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  <p>{value}</p>
                </div>
              ))}
          </div>
          <h4>nominee Details</h4>
          <div className="overview-grid">
            {STAFF[0].nominee &&
              Object.entries(STAFF[0].nominee).map(([key, value]) => (
                <div>
                  <label>
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  <p>{value}</p>
                </div>
              ))}
          </div>
          <h4>Referral Details</h4>
          <div className="overview-grid">
            {STAFF[0].referral &&
              Object.entries(STAFF[0].referral).map(([key, value]) => (
                <div>
                  <label>
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  <p>{value}</p>
                </div>
              ))}
          </div> */}
        </div>
      )}
      {userData.user === "Customer" && (
        <div className="agent-mini-stats">
          <h4>Connection Details</h4>
          <div className="overview-grid">
            {USERS[0].connected &&
              Object.entries(USERS[0].connected).map(([key, value]) => (
                <div>
                  <label>
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  <p>{value}</p>
                </div>
              ))}
          </div>
          <h4>activity Details</h4>
          <div className="overview-grid">
            {USERS[0].activity &&
              Object.entries(USERS[0].activity).map(([key, value]) => (
                <div>
                  <label>
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  <p>{value}</p>
                </div>
              ))}
          </div>
        </div>
      )}
      <DeleteModal
        open={disapproveOpen}
        onClose={() => setDisapproveOpen(false)}
      >
        <h4>Disapprove Associate</h4>
        <div className="field">
          <label>Notes</label>
          <textarea
            placeholder="Add Notes..."
            value={formData.notes || ""}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
          />
        </div>

        <div className="modal-actions">
          <button
            onClick={() => {
              setAlert({
                message: "Associate disapproved successfully",
                status: "Success",
              });

              setDisapproveOpen(false);

              setTimeout(() => setAlert(null), 3000);
            }}
          >
            Disapprove
          </button>
        </div>
      </DeleteModal>
    </div>
  );
};

export default Overview;
