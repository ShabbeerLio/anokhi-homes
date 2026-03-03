import React, { useState, useMemo, useEffect } from "react";
import NiSearch from "../../icons/ni-search";
import { LucidePlus } from "lucide-react";
import AddLocationModal from "../Modals/AddLocationModal";
import NiOpenEye from "../../icons/ni-openEye";
import NiDots from "../../icons/ni-dots";
import ActionModal from "../Modals/ActionModal";
import SiteVisitCard from "../Cards/SiteVisitCard";
// import "./SiteVisit.css";

const ITEMS_PER_PAGE = 6;

const VisitTable = ({ data, actions = [], mood, setAlert }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [activeRow, setActiveRow] = useState(null);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    date: "",
    customer: "",
    phone: "",
    agent: "",
    site: "",
    status: "",
    interest: "",
  });

  useEffect(() => {
    if (selectedVisit) {
      setFormData(selectedVisit);
    } else {
      setFormData({
        date: "",
        customer: "",
        phone: "",
        agent: "",
        site: "",
        status: "",
        interest: "",
      });
    }
  }, [selectedVisit]);
  const filtered = useMemo(() => {
    return data.filter((visit) => {
      const matchSearch =
        visit.customer.toLowerCase().includes(search.toLowerCase()) ||
        visit.phone.includes(search);

      const matchStatus = statusFilter === "" || visit.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [search, statusFilter, data]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

   const handleAddVisit = () => {
    console.log("Adding visit:", formData);
    setOpen(false);
    setAlert({ message: "Visit added successfully!", status: "Success" });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };
  const handleEditVisit = () => {
    console.log("Editing visit:", formData);
    setOpen(false);
    setAlert({ message: "Visit updated successfully!", status: "Success" });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  return (
    <div>
      <div className="filter-grid page-tools table-filters">
        {mood === "admin" && (
          <button
            className="add-button"
            onClick={() => {
              setSelectedVisit(null);
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
            placeholder="Search customer / phone"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="searchItem">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Postponed">Postponed</option>
          </select>
        </div>
        <div className="searchItem">
          <input
            type="date"
            // value={dateFilter}
            // onChange={(e) => {
            //     setDateFilter(e.target.value);
            //     setPage(1);
            // }}
          />
        </div>
        
      </div>
      {/* <div className=" card">
        <div className="sitevisit-table table-head">
          <span>Date</span>
          <span>Customer</span>
          <span>Phone</span>
          <span>Agent</span>
          <span>Site</span>
          <span>Status</span>
          <span>Interest</span>
          <span>Actions</span>
        </div>

        {paginated.length > 0 ? (
          paginated.map((item) => (
            <div
              key={item.id}
              className="sitevisit-table table-row"
              style={{ cursor: "pointer" }}
            >

              <span className="title">{item.date}</span>
              <span className="title">{item.customer}</span>
              <span>{item.phone}</span>
              <span>{item.agent}</span>
              <span>{item.site}</span>

              <span
                className={`status ${item.status === "New" ? "active" : item.status === "Converted" ? "pending" : "failed"}`}
              >
                {item.status}
              </span>
              <span>{item.interest || "-"}</span>

              <div className="dots">
                <span>
                  <NiOpenEye />
                </span>

                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveRow(activeRow === item.id ? null : item.id);
                  }}
                >
                  <NiDots />
                </span>

                {activeRow === item.id && (
                  <ActionModal
                    item={item}
                    onClose={() => setActiveRow(null)}
                    onEdit={(visit) => {
                      setSelectedVisit(visit);
                      setIsEditMode(true);
                      setOpen(true);
                    }}
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No Visits found</p>
        )}
      </div> */}
      <div className="user-card-box">
        {paginated.length === 0 ? (
          <p>No Bookings Found</p>
        ) : (
          paginated.map((item) => (
            <SiteVisitCard
              item={item}
              setSelectedVisit={setSelectedVisit}
              setIsEditMode={setIsEditMode}
              setOpen={setOpen}
              mood={mood}
              setAlert={setAlert}
            />
          ))
        )}
      </div>
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={page === i + 1 ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
      <AddLocationModal
        open={open}
        onClose={() => setOpen(false)}
        title={isEditMode ? "Edit Visit" : "Add Visit"}
      >
        <div className="field">
          <label>Date of Visit</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <div className="field">
          <label>Customer Name</label>
          <input
            value={formData.customer}
            onChange={(e) =>
              setFormData({ ...formData, customer: e.target.value })
            }
            placeholder="Customer Name"
          />
        </div>

        <div className="field">
          <label>Phone</label>
          <input
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="Phone Number"
          />
        </div>

        <div className="field">
          <label>Site</label>
          <input
            value={formData.site}
            onChange={(e) => setFormData({ ...formData, site: e.target.value })}
            placeholder="Site Name"
          />
        </div>

        <div className="field">
          <label>Interest</label>
          <input
            value={formData.interest}
            onChange={(e) =>
              setFormData({ ...formData, interest: e.target.value })
            }
            placeholder="Interest"
          />
        </div>

        <div className="field">
          <label>Status</label>
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          >
            <option value="">Select Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Postponed">Postponed</option>
          </select>
        </div>

        <div className="field">
          <label>Agent</label>
          <select
            value={formData.agent}
            onChange={(e) =>
              setFormData({ ...formData, agent: e.target.value })
            }
          >
            <option value="">Select Agent</option>
            <option value="Amit">Amit</option>
            <option value="Sana">Sana</option>
            <option value="Raj">Raj</option>
          </select>
        </div>

        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div className="modal-actions">
          <button
            onClick={() => {
              if (isEditMode) {
                handleEditVisit()
              } else {
                handleAddVisit()
              }
              setOpen(false);
            }}
          >
            {isEditMode ? "Update Visit" : "Add Visit"}
          </button>
        </div>
      </AddLocationModal>
    </div>
  );
};

export default VisitTable;
