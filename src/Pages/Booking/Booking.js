import React, { useEffect, useState } from "react";
import "./Booking.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { LucidePlus } from "lucide-react";
import AddLocationModal from "../../components/Modals/AddLocationModal";
import NiSearch from "../../icons/ni-search";
import BookingCard from "../../components/Cards/BookingCard";
import BookingData from "../../components/Data/BookingData";
import Alert from "../../components/Alert/Alert";
const ITEMS_PER_PAGE = 12;

const Booking = ({ mood, setAlert }) => {
  const currentUser = { id: "user1", name: "Agent Smith" }; // Mocked current user
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [search, setSearch] = useState();

  const [formData, setFormData] = useState({
    id: "",
    customerId: "",
    plot: "",
    amount: "",
    amountPaid: "",
    status: "",
  });

  useEffect(() => {
    if (selectedBooking) {
      setFormData(selectedBooking);
    } else {
      setFormData({
        id: "",
        customerId: "",
        plot: "",
        amount: "",
        amountPaid: "",
        status: "",
      });
    }
  }, [selectedBooking]);

  // 🔥 Role-Based Filtering
  let visibleBookings = [];

  if (mood === "admin" || mood === "staff") {
    visibleBookings = BookingData;
  } else if (mood === "agent") {
    visibleBookings = BookingData.filter(
      (booking) => booking.agentId === currentUser.id,
    );
  } else if (mood === "user") {
    visibleBookings = BookingData.filter(
      (booking) => booking.customerId === currentUser.id,
    );
  }

  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  // console.log(filter, "filter");

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

  const handleAddBooking = () => {
    console.log("Adding booking:", formData);
    setOpen(false);
    setAlert({ message: "Booking added successfully!", status: "Success" });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };
  const handleEditBooking = () => {
    console.log("Editing booking:", formData);
    setOpen(false);
    setAlert({ message: "Booking updated successfully!", status: "Success" });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  return (
    <div className="plot-container">
      {/* Filters */}
      <div className="table-filters">
        <div className="page-head-title">
          <h2>Bookings</h2>
          <Breadcrumb />
        </div>
        <div className="page-tools">
          {(mood === "admin" || mood === "staff") && (
            <button
              className="add-button"
              onClick={() => {
                setSelectedBooking(null);
                setIsEditMode(false);
                setOpen(true);
              }}
            >
              <LucidePlus /> Add
            </button>
          )}
          <div className="searchItem">
            <NiSearch />
            <input
              placeholder="Search Name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>

          {["all", "Confirmed", "Pending", "Rejected"].map((f) => (
            <button
              key={f}
              className={filter === f ? "active" : ""}
              onClick={() => setFilter(f)}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      
      <div className="user-card-box">
        {currentData.length === 0 ? (
          <p>No Bookings Found</p>
        ) : (
          currentData.map((item) => (
            <BookingCard
              item={item}
              setSelectedBooking={setSelectedBooking}
              setIsEditMode={setIsEditMode}
              setOpen={setOpen}
              mood={mood}
              setAlert={setAlert}
            />
          ))
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
      <AddLocationModal
        open={open}
        onClose={() => setOpen(false)}
        title={isEditMode ? "Edit Booking" : "Add Booking"}
      >
        <div className="field">
          <label>Customer ID</label>
          <input
            value={formData.customerId}
            onChange={(e) =>
              setFormData({ ...formData, customerId: e.target.value })
            }
            placeholder="Customer ID"
          />
        </div>

        <div className="field">
          <label>Plot</label>
          <input
            value={formData.plot}
            onChange={(e) => setFormData({ ...formData, plot: e.target.value })}
            placeholder="Plot Number"
          />
        </div>

        <div className="field">
          <label>Amount</label>
          <input
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            placeholder="Amount"
          />
        </div>
        <div className="field">
          <label>Amount Paid</label>
          <input
            type="number"
            value={formData.amountPaid}
            onChange={(e) =>
              setFormData({ ...formData, amountPaid: e.target.value })
            }
            placeholder="Amount Paid"
          />
        </div>
        {formData.amount && formData.amountPaid && (
          <div className="field">
            <label>Remaining Amount</label>
            <input
              value={
                Number(formData.amount.replace(/[₹,]/g, "")) -
                Number(formData.amountPaid)
              }
              disabled
            />
          </div>
        )}

        <div className="field">
          <label>Status</label>
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          >
            <option value="">Select Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div className="modal-actions">
          <button
            onClick={() => {
              if (isEditMode) {
                handleEditBooking();
              } else {
                handleAddBooking();
              }
              setOpen(false);
            }}
          >
            {isEditMode ? "Update Booking" : "Add Booking"}
          </button>
        </div>
      </AddLocationModal>
    </div>
  );
};

export default Booking;
