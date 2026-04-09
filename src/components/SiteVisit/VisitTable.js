import React, { useState, useMemo, useEffect } from "react";
import NiSearch from "../../icons/ni-search";
import { LucidePlus } from "lucide-react";
import AddLocationModal from "../Modals/AddLocationModal";
import NiOpenEye from "../../icons/ni-openEye";
import NiDots from "../../icons/ni-dots";
import ActionModal from "../Modals/ActionModal";
import SiteVisitCard from "../Cards/SiteVisitCard";
import SearchSelect from "../SearchItems/SearchSelect";
// import "./SiteVisit.css";

const ITEMS_PER_PAGE = 6;

const VisitTable = ({ data, mood, setAlert }) => {
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

  const customers = [
    { id: "C001", name: "Rahul Sharma", phone: "9876543210" },
    { id: "C002", name: "Imran Khan", phone: "9123456789" },
    { id: "C003", name: "Arjun Mehta", phone: "9988776655" },
  ];

  const ProjectsLocations = [
    { id: "L1", name: "Rajgir", location: "Bihar" },
    { id: "L2", name: "Patna", location: "Bihar" },
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
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPlot, setSelectedPlot] = useState(null);

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
            <option value="Approval">Approval</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
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
            value={formData.visitDate || ""}
            onChange={(e) =>
              setFormData({ ...formData, visitDate: e.target.value })
            }
          />
        </div>

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

        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div className="modal-actions">
          <button
            onClick={() => {
              if (isEditMode) {
                handleEditVisit();
              } else {
                handleAddVisit();
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
