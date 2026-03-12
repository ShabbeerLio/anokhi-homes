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
import SearchSelect from "../../components/SearchItems/SearchSelect";
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
    customer: "",
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
        customer: "",
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
    const newBooking = {
      ...formData,
      status: mood === "admin" ? "Confirmed" : "Pending",
    };
    console.log("Adding booking:", newBooking);
    setOpen(false);
    setAlert({
      message: `Plot ${newBooking.plot} has been booked successfully!`,
      status: "Success",
    });
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

  const customers = [
    { id: "C001", name: "Rahul Sharma", phone: "9876543210" },
    { id: "C002", name: "Imran Khan", phone: "9123456789" },
    { id: "C003", name: "Arjun Mehta", phone: "9988776655" },
  ];

  const Projects = [
    { id: "PJ101", name: "SunShine Colony", location: "Mumbai" },
    { id: "PJ102", name: "Moon Colony", location: "Delhi" },
  ];
  const plots = [
    {
      id: "P101",
      name: "Plot A-12",
      projectId: "PJ101",
      price: 1200000,
      status: "Vacant",
    },
    {
      id: "P102",
      name: "Plot B-07",
      projectId: "PJ102",
      price: 2300000,
      status: "Hold",
    },
  ];

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProjects, setSelectedProjects] = useState(null);
  const [selectedPlot, setSelectedPlot] = useState(null);
  // console.log(selectedCustomer, "selectedCustomer")
  const totalAmount = Number(selectedPlot?.price || 0);
  const paidAmount = Number(formData.amountPaid || 0);
  const remainingAmount = totalAmount - paidAmount;

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
          <SearchSelect
            label="Customer"
            placeholder="Search name or number"
            options={customers}
            value={selectedCustomer}
            onChange={(selected) => {
              setSelectedCustomer(selected);
              setFormData({ ...formData, customer: selected.name });
            }}
            displayKey="name"
            searchKeys={["name", "phone"]}
            renderOption={(c) => (
              <div>
                <b>{c.name}</b> ({c.phone})
              </div>
            )}
          />
        </div>
        <div className="field">
          <SearchSelect
            label="Project"
            placeholder="Search Project or location"
            options={Projects}
            value={selectedProjects}
            onChange={(selected) => {
              setSelectedProjects(selected);
              setFormData({ ...formData, Project: selected.name });
            }}
            displayKey="name"
            searchKeys={["name", "location"]}
            renderOption={(p) => (
              <div>
                <b>{p.name}</b>
                <small style={{ display: "block", color: "#666" }}>
                  {p.location}
                </small>
              </div>
            )}
          />
        </div>
        <div className="field">
          <SearchSelect
            label="Plots"
            placeholder="Search Plot..."
            options={plots}
            value={selectedPlot}
            onChange={(selected) => {
              setSelectedPlot(selected);

              setFormData({
                ...formData,
                plot: selected.id,
                amount: selected.price,
              });
            }}
            displayKey="name"
            searchKeys={["name", "location"]}
            renderOption={(p) => (
              <div>
                <b>{p.name}</b>
                <small style={{ display: "block", color: "#666" }}>
                  {p.status}
                </small>
              </div>
            )}
          />
        </div>

        <div className="field">
          <label>Amount</label>
          <input
            placeholder="Total Amount"
            value={selectedPlot?.price || ""}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
        </div>

        <div className="field">
          <label>Amount Paid</label>
          <input
            placeholder="Amount Paid"
            value={formData.amountPaid || ""}
            onChange={(e) =>
              setFormData({ ...formData, amountPaid: e.target.value })
            }
          />
        </div>
        <div className="field">
          <label>Amount Remaining</label>
          <input
            placeholder="Amount Remaining"
            value={remainingAmount || 0}
            disabled
          />
        </div>

        {mood === "admin" && (
          <div className="field">
            <label>Status</label>
            <select
              value={formData.status || ""}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="">Select Status</option>
              <option value="Token">Confirmend</option>
              <option value="Full">Rejected</option>
            </select>
          </div>
        )}

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
            {isEditMode ? "Update Booking" : "Book Now"}
          </button>
        </div>
      </AddLocationModal>
    </div>
  );
};

export default Booking;
