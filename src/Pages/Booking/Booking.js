import React, { useEffect, useState } from "react";
import "./Booking.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";
import SearchItems from "../../components/SearchItems/SearchItems";
const ITEMS_PER_PAGE = 12;

const Booking = ({ mood }) => {
  const currentUser = { id: "user1", name: "Agent Smith" }; // Mocked current user
  const navigate = useNavigate();
  const allBookings = [
    {
      id: 1,
      customerId: "user1",
      agentId: "agent1",
      plot: "A-12",
      amount: "₹12,00,000",
      status: "Paid",
    },
    {
      id: 2,
      customerId: "user2",
      agentId: "agent2",
      plot: "B-5",
      amount: "₹8,50,000",
      status: "Pending",
    },
    {
      id: 3,
      customerId: "user3",
      agentId: "agent3",
      plot: "C-8",
      amount: "₹10,00,000",
      status: "Cancelled",
    },
  ];

  // 🔥 Role-Based Filtering
  let visibleBookings = [];

  if (mood === "admin" || mood === "staff") {
    visibleBookings = allBookings;
  } else if (mood === "agent") {
    visibleBookings = allBookings.filter(
      (booking) => booking.agentId === currentUser.id,
    );
  } else if (mood === "user") {
    visibleBookings = allBookings.filter(
      (booking) => booking.customerId === currentUser.id,
    );
  }

  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  console.log(filter, "filter");

  const filteredData =
    filter === "all"
      ? visibleBookings
      : visibleBookings.filter((d) => d.status === filter);

  // reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <div className="table-card ">
      {/* Filters */}
      <div className="table-filters">
        <h2>Bookings</h2>
        <div className="page-tools">
          {["all", "Pending", "Closed", "Completed"].map((f) => (
            <button
              key={f}
              className={filter === f ? "active" : ""}
              onClick={() => setFilter(f)}
            >
              {f.toUpperCase()}
            </button>
          ))}
          <SearchItems />
        </div>
      </div>

      <Breadcrumb />

      <div className="table card">
        {currentData.length === 0 ? (
          <p>No Bookings Found</p>
        ) : (
          <>
            <div className="table-head">
              <span>ID</span>
              <span>Customer</span>
              <span>Plot</span>
              <span>Amount</span>
              <span>Status</span>
            </div>
            {currentData.map((b) => (
              <div
                key={b.id}
                className="table-row"
                onClick={() => navigate(`/user/${b.id}`, { state: b })}
                style={{ cursor: "pointer" }}
              >
                <span>{b.id}</span>
                <span className="title">{b.customerId}</span>
                <span>{b.plot}</span>
                <span>{b.amount}</span>

                {/* <span className={`status ${b.status.toLowerCase()}`}> */}
                {b.status === "Paid" ? (
                  <span className="status active">Paid</span>
                ) : b.status === "Pending" ? (
                  <span className="status pending">Pending</span>
                ) : (
                  <span className="status cancelled">Cancelled</span>
                )}
                {/* </span> */}

                <span className="dots">⋮</span>
              </div>
            ))}
          </>
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Booking;
