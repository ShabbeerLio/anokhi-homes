import React, { useEffect, useState } from "react";
import "./Booking.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { LucidePlus } from "lucide-react";
import AddLocationModal from "../../components/Modals/AddLocationModal";
import NiSearch from "../../icons/ni-search";
import BookingCard from "../../components/Cards/BookingCard";
import BookingData from "../../components/Data/BookingData";
import SearchSelect from "../../components/SearchItems/SearchSelect";
import CancellationPolicy from "../../components/Policies/CancellationPolicy";
const ITEMS_PER_PAGE = 12;

const Booking = ({ mood, setAlert }) => {
  const currentUser = { id: "Rahul", name: "Rahul" }; // Mocked current user
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [search, setSearch] = useState();
  const [policyOpen, setPolicyOpen] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    customer: "",
    plot: "",
    amount: "",
    // amountPaid: "",
    status: "",
    amountRequested: "",
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
        // amountPaid: "",
        status: "",
        amountRequested: "",
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
      price: 1200,
      area: "1000",
      status: "Vacant",
    },
    {
      id: "P102",
      name: "Plot B-07",
      projectId: "PJ102",
      price: 1150,
      area: "2000",
      status: "Vacant",
    },
  ];

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProjects, setSelectedProjects] = useState(null);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const totalAmount = Number(selectedPlot?.price || 0);
  const paidAmount = Number(formData.amountPaid || 0);

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

          {["all", "Confirmed", "Pending", "Approval", "Rejected"].map((f) => (
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
            label="Customer Name"
            placeholder="Search name or number"
            options={customers}
            value={selectedCustomer}
            onChange={(selected) => {
              setSelectedCustomer(selected);
              setFormData({
                ...formData,
                customerName: selected.customerName,
              });
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
          <label>Phone</label>
          <input
            value={selectedCustomer?.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="Phone Number"
          />
        </div>
        <div className="field">
          <SearchSelect
            label="Site"
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
                plotId: selected.id,
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
          <label>Associate</label>
          <select
            value={formData.agent}
            onChange={(e) =>
              setFormData({ ...formData, agent: e.target.value })
            }
          >
            <option value="">Select Associate</option>
            <option value="Amit">Amit</option>
            <option value="Sana">Sana</option>
            <option value="Raj">Raj</option>
          </select>
        </div>

        <div className="field">
          <label>Amount ( Area X Rate ) <small style={{ color: "green" }}>{selectedPlot?.price} X {selectedPlot?.area}</small></label>
          <input
            placeholder="Total Amount"
            value={(selectedPlot?.price) * (selectedPlot?.area) || ""}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
        </div>

        {/* <div className="field">
          <label>Amount Paid</label>
          <input
            placeholder="Amount Paid"
            value={formData.amountPaid || ""}
            onChange={(e) =>
              setFormData({ ...formData, amountPaid: e.target.value })
            }
          />
        </div> */}
        <div className="field">
          <label>Amount Requested in sqft</label>
          <input
            placeholder="Amount Requested in SQFT"
            value={formData.amountRequested}
            onChange={(e) =>
              setFormData({ ...formData, amountRequested: e.target.value })
            }
          />
        </div>

        <div className="field">
          <label style={{ justifyContent: "flex-start" }}>Booking Payment <small style={{ fontSize: "12px", color: "gray" }}>Within </small></label>
          <select
            value={formData.paymentPeriod || ""}
            onChange={(e) =>
              setFormData({ ...formData, paymentPeriod: e.target.value })
            }
          >
            <option value="select">Select days</option>
            <option value="10-20 days">07-08 days</option>
            <option value="20-30 days">08-09 days</option>
            <option value="30-40 days">09-10 days</option>
          </select>
        </div>
        <div className="field">
          <label style={{ justifyContent: "flex-start" }}>Agreement Payment <small style={{ fontSize: "12px", color: "gray" }}>Within </small></label>
          <select
            value={formData.paymentPeriod || ""}
            onChange={(e) =>
              setFormData({ ...formData, paymentPeriod: e.target.value })
            }
          >
            <option value="select">Select days</option>
            <option value="10-20 days">20-25 days</option>
            <option value="20-30 days">25-30 days</option>
            <option value="30-40 days">30-40 days</option>
          </select>
        </div>
        <div className="field">
          <label style={{ justifyContent: "flex-start" }}>Full Payment (Registry) <small style={{ fontSize: "12px", color: "gray" }}>Within </small></label>
          <select
            value={formData.paymentPeriod || ""}
            onChange={(e) =>
              setFormData({ ...formData, paymentPeriod: e.target.value })
            }
          >
            <option value="select">Select days</option>
            <option value="10-20 days">20-25 days</option>
            <option value="20-30 days">25-30 days</option>
            <option value="30-40 days">30-40 days</option>
          </select>
        </div>
        <p style={{ color: "#ff6969", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "5px", padding: "0px 0" }}>
          <input style={{ width: "5%" }} type="checkbox" />
          Notes : 35% cancellation charges
          <span style={{ borderBottom: "1px solid #ff6969", cursor: "pointer" }} onClick={() => setPolicyOpen(true)}>
            Read Cancellation Policy
          </span>
        </p>
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
      <AddLocationModal
        open={policyOpen}
        onClose={() => setPolicyOpen(false)}
        title="Cancellation Policy"
      >
        <CancellationPolicy/>
      </AddLocationModal>
    </div>
  );
};

export default Booking;
