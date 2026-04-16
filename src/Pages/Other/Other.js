import React, { useEffect, useRef, useState } from "react";
import "./Other.css";
import SearchItems from "../../components/SearchItems/SearchItems";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";
import NiOpenEye from "../../icons/ni-openEye";
import NiDots from "../../icons/ni-dots";
import NiDelete from "../../icons/ni-delete";
import NiEdit from "../../icons/ni-edit";
import NiSearch from "../../icons/ni-search";
import NiCard from "../../icons/ni-card";
import NiList from "../../icons/ni-list";
import { LucidePlus } from "lucide-react";
import AddLocationModal from "../../components/Modals/AddLocationModal";
import ActionModal from "../../components/Modals/ActionModal";
import DeleteModal from "../../components/Modals/DeleteModal";
import NiClosseye from "../../icons/ni-closseye";

const ITEMS_PER_PAGE = 12;

const DATA = [
  {
    id: 472,
    user: "staff",
    name: "Emily Ellis",
    email: "laura@company.com",
    phone: "9876543210",
    avatar: "https://i.pravatar.cc/150?img=1",
    status: "active",
    position: "Manager",
    joined: "2024-01-12",
    permissions: ["Manage Leads", "Access Reports"],
    performance: null,
  },

  {
    id: 473,
    user: "associate",
    position: "5%",
    name: "Zoila Vittorino",
    email: "zoila@company.com",
    phone: "9876500001",
    avatar: "https://i.pravatar.cc/150?img=2",
    status: "active",

    joined: "2023-09-10",
    referral: {
      code: "REF123",
      name: "Amit Kumar",
    },
    performance: {
      totalSales: 4500000,
      totalBookings: 18,
      propertiesSold: 15,
      commissionEarned: 450000,
      conversionRate: 42,
      monthlySales: [
        { month: "Jan", sales: 200000 },
        { month: "Feb", sales: 350000 },
        { month: "Mar", sales: 280000 },
        { month: "Apr", sales: 400000 },
      ],
    },

    permissions: [],
  },

  {
    id: 474,
    user: "customer",
    name: "Travis Howard",
    email: "travis@gmail.com",
    phone: "9000000001",
    avatar: "https://i.pravatar.cc/150?img=3",
    status: "active",
    joined: "2025-02-05",
    permissions: [],
    performance: null,
    connected: {
      name: "Rahul",
      number: "9876543210",
    },
  },

  {
    id: 475,
    user: "staff",
    name: "Cindy Baker",
    email: "cindy@company.com",
    phone: "9000000002",
    avatar: "https://i.pravatar.cc/150?img=4",
    status: "inactive",
    position: "Plot Manager",
    joined: "2022-05-11",
    permissions: ["Manage Bookings"],
    performance: null,
  },

  {
    id: 476,
    user: "associate",
    position: "6%",
    name: "Buck Rogers",
    email: "buck@company.com",
    phone: "9000000003",
    avatar: "https://i.pravatar.cc/150?img=5",
    status: "inactive",
    joined: "2023-03-18",

    referral: {
      code: "REF123",
      name: "rahul Kumar",
    },
    performance: {
      totalSales: 3200000,
      totalBookings: 12,
      propertiesSold: 10,
      commissionEarned: 320000,
      conversionRate: 35,
      monthlySales: [
        { month: "Jan", sales: 120000 },
        { month: "Feb", sales: 220000 },
        { month: "Mar", sales: 150000 },
      ],
    },

    permissions: [],
  },

  {
    id: 477,
    user: "customer",
    name: "Emily Watson",
    email: "emily@gmail.com",
    phone: "9000000004",
    avatar: "https://i.pravatar.cc/150?img=6",
    status: "active",
    joined: "2025-01-22",
    permissions: [],
    performance: null,
    connected: {
      name: "Rahul",
      number: "9876543210",
    },
  },
  {
    id: 483,
    user: "associate",
    name: "Ethan Wilson",
    position: "0%",
    email: "ethan@company.com",
    phone: "9000000005",
    avatar: "https://i.pravatar.cc/150?img=11",
    status: "pending",
    joined: "2026-01-21",
    position: "",
    referral: {
      code: "REF123",
      name: "Amit Kumar",
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
  {
    id: 482,
    user: "associate",
    name: "Ethan Wilson",
    position: "5%",
    email: "ethan@company.com",
    phone: "9000000005",
    avatar: "https://i.pravatar.cc/150?img=11",
    status: "active",
    joined: "2023-11-01",

    referral: {
      code: "REF123",
      name: "Amit Kumar",
    },
    performance: {
      totalSales: 5100000,
      totalBookings: 22,
      propertiesSold: 19,
      commissionEarned: 510000,
      conversionRate: 48,
      monthlySales: [
        { month: "Jan", sales: 400000 },
        { month: "Feb", sales: 600000 },
        { month: "Mar", sales: 520000 },
      ],
    },

    permissions: [],
  },
];

const Other = ({ mood, setAlert }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeRow, setActiveRow] = useState(null);
  const [viewItem, setViewItem] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    user: "",
    name: "",
    avatar: "",
    status: "",
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
    } else {
      setFormData({
        user: "",
        name: "",
        avatar: "",
        status: "",
      });
    }
  }, [selectedUser]);

  const filteredData = DATA.filter((item) => {
    // Role filter
    const matchesRole =
      filter === "all" || item.user.toLowerCase() === filter.toLowerCase();

    // Search filter
    const searchValue = search.toLowerCase();

    const matchesSearch =
      item.name.toLowerCase().includes(searchValue) ||
      item.email?.toLowerCase().includes(searchValue) ||
      item.phone?.includes(searchValue) ||
      item.id.toString().includes(searchValue) ||
      item.user.toLowerCase().includes(searchValue);

    return matchesRole && matchesSearch;
  });
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

  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setActiveRow(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setActiveRow]);

  const handleAddUser = () => {
    console.log("Adding user:", formData);
    setOpen(false);
    setAlert({ message: "User added successfully!", status: "Success" });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };
  const handleEditUser = () => {
    console.log("Editing user:", formData);
    setOpen(false);
    setAlert({ message: "User updated successfully!", status: "Success" });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const handleReferralCheck = async (code) => {
    // simulate API
    if (code.length > 3) {
      setFormData((prev) => ({
        ...prev,
        referralCode: code,
        referralName: "Agent Rahul",
      }));
    }
  };

  return (
    <div className="plot-container">
      {/* Filters */}
      <div className="table-filters">
        <div className="page-head-title">
          <h2>Users</h2>
          <Breadcrumb />
        </div>
        <div className="page-tools">
          {(mood === "admin" || mood === "staff") && (
            <button
              className="add-button"
              onClick={() => {
                setSelectedUser(null);
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
              placeholder="Search Nane"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <div className="filter-buttons">
            {["all", "Customer", "staff", "associate"].map((f) => (
              <button
                key={f}
                className={filter === f ? "active" : ""}
                onClick={() => setFilter(f)}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="page-toggle">
            <span
              className={`${viewItem === false ? "active" : ""}`}
              onClick={() => setViewItem(false)}
            >
              <NiList />
            </span>
            <span
              className={`${viewItem === true ? "active" : ""}`}
              onClick={() => setViewItem(true)}
            >
              <NiCard />
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      {viewItem === false ? (
        <div className="table card">
          <div className="table-head">
            <span>Image</span>
            <span>Role</span>
            <span>Name</span>
            <span>Connected</span>
            <span>Referral</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {currentData.map((item) => (
            <div key={item.id} className="table-row">
              <img src={item.avatar} alt="" />
              <span>
                {item.user === "staff"
                  ? "Staff"
                  : item.user === "associate"
                    ? "Associate"
                    : "Customer"}
              </span>
              <span className="title">
                {item.name} {item.position && `(${item.position})`}
              </span>
              <span className="title">{item.connected?.name || "-"}</span>
              <span className="title">{item.referral?.name || "-"}</span>

              {((item.status !== "pending" && mood === "admin" || item.status !== "pending" && mood === "staff") && (
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={item.status === "active"}
                    onChange={() => {
                      item.status =
                        item.status === "active" ? "inactive" : "active";
                    }}
                  />
                  <span className="slider"></span>
                </label>
              )) || (
                  <span className={`status ${item.status}`}>
                    {item.status}
                  </span>
                )}

              <div className="dots">
                <span
                  onClick={() => navigate(`/user/${item.id}`, { state: item })}
                >
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
                    onEdit={(booking) => {
                      setSelectedUser(booking);
                      setIsEditMode(true);
                      setOpen(true);
                    }}
                    onDelete={() => {
                      setDeleteOpen(true);
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="user-card-box">
          {currentData.map((item) => (
            <div className="user-card card">
              <div className="user-card-top">
                <div className="user-card-title">
                  <img src={item.avatar} alt="" />
                  <div className="user-card-detail">
                    <h4>{item.name} <span>{item.position && `(${item.position})`}</span></h4>
                    <p>{item.id}</p>
                  </div>
                </div>
                <div className="dots">
                  <span
                    onClick={() =>
                      navigate(`/user/${item.id}`, { state: item })
                    }
                  >
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
                      onEdit={(booking) => {
                        setSelectedUser(booking);
                        setIsEditMode(true);
                        setOpen(true);
                      }}
                      onDelete={() => {
                        setDeleteOpen(true);
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="user-card-bottom">
                <span>
                  {item.user === "staff"
                    ? "Staff"
                    : item.user === "associate"
                      ? "Associate"
                      : "Customer"}
                </span>
                <span className="title">
                  {item.connected?.name || item.referral?.name || "-"}
                </span>
                {(item.status !== "pending" && mood === "admin" && (
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={item.status === "active"}
                      onChange={() => {
                        item.status =
                          item.status === "active" ? "inactive" : "active";
                      }}
                    />
                    <span className="slider"></span>
                  </label>
                )) || (
                    <span className={`status ${item.status}`}>
                      {item.status === "pending" && "Pending"}
                    </span>
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
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
        title={isEditMode ? "Edit User" : "Add User"}
      >
        {/* User Type */}
        <div className="field">
          <label>User Type</label>
          <select
            value={formData.user}
            onChange={(e) =>
              setFormData({ ...formData, user: e.target.value })
            }
          >
            <option value="">Select Type</option>
            <option value="customer">Customer</option>
            <option value="associate">Associate</option>
            <option value="staff">Staff</option>
          </select>
        </div>

        {/* Common Fields */}
        {/* {formData.user && ( */}
          <>
            <div className="field">
              <input
                placeholder="Name (as per Aadhaar) "
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="field">
              <input
                type="email"
                placeholder="Email"
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="field">
              <input
                placeholder="Phone"
                value={formData.phone || ""}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            <div className="field password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password || ""}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <span
                className="password-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <NiClosseye /> : <NiOpenEye />}
              </span>
            </div>
          </>
        {/* )} */}

        {/* Agent Only */}
        {formData.user === "associate" && (
          <div className="field">
            <input
              placeholder="Referral Code"
              value={formData.referralCode || ""}
              onChange={(e) => handleReferralCheck(e.target.value)}
            />
          </div>
        )}

        {formData.user === "associate" && formData.referralName && (
          <p>Referred by: {formData.referralName}</p>
        )}

        {/* Staff Only */}
        {formData.user === "staff" && (
          <div className="field">
            <input
              placeholder="Department / Role"
              value={formData.role || ""}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            />
          </div>
        )}

        {/* Actions */}
        <div className="modal-actions">
          <button
            onClick={() => {
              if (isEditMode) {
                handleEditUser();
              } else {
                handleAddUser();
              }
              setOpen(false);
            }}
          >
            {isEditMode ? "Update User" : "Add User"}
          </button>
        </div>
      </AddLocationModal>
      <DeleteModal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <p>Are you sure you want to delete?</p>
        <div className="modal-actions">
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("User deleted");

              setDeleteOpen(false);

              setAlert({
                message: "User deleted successfully!",
                status: "Success",
              });

              setTimeout(() => {
                setAlert(null);
              }, 5000);
            }}
          >
            Yes
          </button>

          <button
            className="btn-outline"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteOpen(false);
            }}
          >
            Cancel
          </button>
        </div>
      </DeleteModal>
    </div>
  );
};

export default Other;
