import React, { useState } from "react";
import ProjectData from "../Plot/PlotData";
import SearchSelect from "../../components/SearchItems/SearchSelect";

const RenderFormFields = ({ actionType, formData, setFormData }) => {
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

  const bookings = [
    {
      id: "B001",
      customerId: "C001",
      projectId: "PJ101",
      plotId: "P101",
      totalAmount: 500000,
      payments: [
        { amount: 100000, type: "Token" },
        { amount: 150000, type: "Installment" },
      ],
    },
  ];

  const staffPositions = [
    "Manager",
    "Lead Manager",
    "Sales Manager",
    "Plot Manager",
    "Finance Manager",
  ];

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProjects, setSelectedProjects] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  // console.log(selectedCustomer, "selectedCustomer")
  const totalAmount = Number(selectedPlot?.price || 0);
  const paidAmount = Number(formData.amountPaid || 0);
  const remainingAmount = totalAmount - paidAmount;

  const [amountInfo, setAmountInfo] = useState({
    total: 0,
    paid: 0,
    remaining: 0,
    remainingType: "",
  });

  const customerBookings = bookings.filter(
    (b) => b.customerId === selectedCustomer?.id,
  );

  const customerProjects = Projects.filter((project) =>
    customerBookings.some((b) => b.projectId === project.id),
  );

  const customerPlots = plots.filter(
    (plot) =>
      plot.projectId === selectedProject?.id &&
      customerBookings.some((b) => b.plotId === plot.id),
  );

  switch (actionType) {
    case "Add Agent / Staff / Customer":
      return (
        <>
          {/* USER TYPE */}
          <div className="field">
            <label>User Type</label>
            <select
              value={formData.userType || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  userType: e.target.value,
                  position: "",
                })
              }
            >
              <option value="">Select Type</option>
              <option value="User">Customer</option>
              <option value="Staff">Staff</option>
              <option value="Agent">Agent</option>
            </select>
          </div>

          {/* NAME */}
          <div className="field">
            <label>Name</label>
            <input
              placeholder="Full Name"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          {/* EMAIL */}
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* PHONE */}
          <div className="field">
            <label>Phone Number</label>
            <input
              placeholder="Phone Number"
              value={formData.phone || ""}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          {/* ADDRESS */}
          <div className="field">
            <label>Address</label>
            <input
              placeholder="Address"
              value={formData.address || ""}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>

          {/* STAFF POSITION */}
          {formData.userType === "Staff" && (
            <div className="field">
              <label>Staff Position</label>
              <select
                value={formData.position || ""}
                onChange={(e) =>
                  setFormData({ ...formData, position: e.target.value })
                }
              >
                <option value="">Select Position</option>
                {staffPositions.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* AGENT COMMISSION */}
          {formData.userType === "Agent" && (
            <div className="field">
              <label>Commission %</label>
              <input
                type="number"
                placeholder="Commission Percentage"
                value={formData.commission || ""}
                onChange={(e) =>
                  setFormData({ ...formData, commission: e.target.value })
                }
              />
            </div>
          )}

          {/* AVATAR */}
          <div className="field">
            <label>Image (Profile)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, avatar: e.target.files[0] })
              }
            />
          </div>
        </>
      );

    case "Add Project":
      return (
        <>
          <div className="field">
            <SearchSelect
              label="Project Location"
              placeholder="Search Project Location"
              options={ProjectsLocations}
              value={selectedLocation}
              onChange={(selected) => {
                setSelectedLocation(selected);
                setFormData({ ...formData, location: selected.id });
              }}
              displayKey="name"
              searchKeys={["name", "location"]}
              renderOption={(c) => (
                <div>
                  <b>{c.name}</b> ({c.location})
                </div>
              )}
            />
          </div>

          <div className="field">
            <label>Project Name</label>
            <input
              placeholder="Project Name"
              value={formData.plotName || ""}
              onChange={(e) =>
                setFormData({ ...formData, plotName: e.target.value })
              }
            />
          </div>
          <div className="field">
            <label>Image </label>
            <input
              placeholder="Image URL"
              value={formData.image || ""}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />
          </div>
          <div className="field">
            <label>Price Range</label>
            <input
              placeholder="Price Range"
              value={formData.price || ""}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>
          <div className="field">
            <label>Area in sqft</label>
            <input
              placeholder="Area in sqft"
              value={formData.area || ""}
              onChange={(e) =>
                setFormData({ ...formData, area: e.target.value })
              }
            />
          </div>
          <div className="field">
            <label>Description</label>
            <textarea
              placeholder="Description"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
        </>
      );

    case "Add Booking":
      return (
        <>
          <div className="field">
            <SearchSelect
              label="Customer"
              placeholder="Search name or number"
              options={customers}
              value={selectedCustomer}
              onChange={(selected) => {
                setSelectedCustomer(selected);
                setFormData({ ...formData, customerId: selected.id });
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

          {/* <div className="field">
                        <label>Amount Type</label>
                        <select
                            value={formData.amountType || ""}
                            onChange={(e) =>
                                setFormData({ ...formData, amountType: e.target.value })
                            }
                        >
                            <option value="">Select Type</option>
                            <option value="Token">Token</option>
                            <option value="Partial">Partial</option>
                            <option value="Full">Full</option>
                        </select>
                    </div> */}
        </>
      );

    case "Add Payment (Received)":
      return (
        <>
          {/* DATE */}
          <div className="field">
            <label>Date</label>
            <input
              type="date"
              value={formData.date || ""}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </div>

          {/* CUSTOMER */}
          <div className="field">
            <SearchSelect
              label="Customer Name"
              placeholder="Search name or number"
              options={customers}
              value={selectedCustomer}
              onChange={(selected) => {
                setSelectedCustomer(selected);
                setSelectedPlot(null);
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

          {/* PHONE */}
          <div className="field">
            <label>Phone</label>
            <input value={selectedCustomer?.phone || ""} disabled />
          </div>

          <div className="field">
            <SearchSelect
              label="Project"
              placeholder="Select Customer Project"
              options={customerProjects}
              value={selectedProject}
              onChange={(selected) => {
                setSelectedProject(selected);
                setSelectedPlot(null);
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
              label="Plot"
              placeholder="Select Booked Plot"
              options={customerPlots}
              value={selectedPlot}
              onChange={(selected) => {
                setSelectedPlot(selected);

                const booking = customerBookings.find(
                  (b) => b.plotId === selected.id,
                );

                if (booking) {
                  const paid = booking.payments.reduce(
                    (sum, p) => sum + p.amount,
                    0,
                  );

                  const remaining = booking.totalAmount - paid;

                  let type = "Installment";
                  if (paid === 0) type = "Token";
                  if (remaining === 0) type = "Completed";

                  setAmountInfo({
                    total: booking.totalAmount,
                    paid,
                    remaining,
                    remainingType: type,
                  });
                }
              }}
              displayKey="name"
              searchKeys={["name"]}
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

          {selectedPlot && (
            <div className="report-view-box-right active">
              <p>
                <strong>Total Amount</strong> ₹{amountInfo.total}
              </p>

              <p>
                <strong>Amount Paid</strong> ₹{amountInfo.paid}
              </p>

              <p>
                <strong>Remaining Amount</strong> ₹{amountInfo.remaining}
              </p>

              <p>
                <strong>Remaining Type</strong> {amountInfo.remainingType}
              </p>
            </div>
          )}
          <div className="field">
            <label>Payment Type</label>
            <select
              value={formData.dueStatus || ""}
              onChange={(e) =>
                setFormData({ ...formData, dueStatus: e.target.value })
              }
            >
              <option value="">Choose Payment Type</option>
              <option value="Partial Due">Partial Payment</option>
              <option value="Full Due">Full Payment</option>
            </select>
          </div>

          {/* PAYMENT AMOUNT */}
          <div className="field">
            <label>Amount</label>
            <input
              placeholder="Amount"
              value={formData.amount || ""}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
            />
          </div>

          {/* PAYMENT MODE */}
          <div className="field">
            <label>Payment Mode</label>
            <select
              value={formData.paymentMode || ""}
              onChange={(e) =>
                setFormData({ ...formData, paymentMode: e.target.value })
              }
            >
              <option value="">Payment Mode</option>
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
        </>
      );
    case "Add Lead":
      return (
        <>
          <div className="field">
            <label>Customer Name</label>
            <input
              placeholder="Customer Name"
              value={selectedCustomer?.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="field">
            <label>Phone</label>
            <input
              placeholder="Phone"
              value={selectedCustomer?.phone || ""}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              placeholder="Email"
              value={selectedCustomer?.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="field">
            <label>Location</label>
            <input
              placeholder="Location"
              value={selectedCustomer?.location || ""}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>

          {/* <div className="field">
                        <label>Status</label>
                        <select
                            value={formData.status || ""}
                            onChange={(e) =>
                                setFormData({ ...formData, status: e.target.value })
                            }
                        >
                            <option value="">Select Status</option>
                            <option value="New">New</option>
                            <option value="Converted">Converted</option>
                            <option value="Lost">Lost</option>
                        </select>
                    </div> */}
          {/* <div className="field">
                        <label>Agent</label>
                        <select
                            value={formData.agent || ""}
                            onChange={(e) =>
                                setFormData({ ...formData, agent: e.target.value })
                            }
                        >
                            <option value="">Select Agent</option>
                            <option value="Amit">Amit</option>
                            <option value="Rahul">Rahul</option>
                            <option value="Sana">Sana</option>
                        </select>
                    </div> */}
        </>
      );
    case "Schedule Site Visit":
      return (
        <>
          <div className="field">
            <label>Date of Visit</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
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

          {/* <div className="field">
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
                    </div> */}
        </>
      );
    case "Approve Payment":
      return (
        <>
          <div className="field">
            <label>
              Date: <span>26/2/2026</span>
            </label>
            <label>
              Client: <span>Rahul</span>
            </label>
            <label>
              Phone: <span>9876543210</span>
            </label>
            <label>
              Project: <span>B-198, Moon Colony</span>
            </label>
            <label>
              Amount: <span>12,34,567</span>
            </label>
            <label>Payment Mode</label>
            <select
              value={formData.mode}
              onChange={(e) =>
                setFormData({ ...formData, mode: e.target.value })
              }
            >
              <option value="">Select Mode</option>
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          <div className="field">
            <label>Due Status</label>
            <select
              value={formData.dueStatus}
              onChange={(e) =>
                setFormData({ ...formData, dueStatus: e.target.value })
              }
            >
              <option value="">Select Due Status</option>
              <option value="Paid">Paid</option>
              <option value="Partially Paid">Partially Paid</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </>
      );
    case "Verify Booking":
      return (
        <>
          <div className="field">
            <label>
              Customer ID <span>98765431208132</span>
            </label>
            <label>
              Plot <span>B-198, Moon Colony</span>
            </label>
            <label>
              Amount <span>12,34,567</span>
            </label>
            <label>
              Amount Paid <span>50,000</span>
            </label>
            <label>
              Remaining Amount <span>11,84,567</span>
            </label>
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
        </>
      );
    case "Download Receipt":
      return (
        <>
          <div className="field">
            <label>Select Booking</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="">Select Status</option>
              <option value="B-198, Moon Colony">B-198, Moon Colony</option>
              <option value="A-77, Sun Colony">A-77, Sun Colony</option>
            </select>
          </div>
          <div className="field">
            <label>Select Payment</label>
            <select
              value={formData.paymentMode}
              onChange={(e) =>
                setFormData({ ...formData, paymentMode: e.target.value })
              }
            >
              <option value="">Select Payment</option>
              <option value="50,000">50,000</option>
              <option value="10,00,000">10,00,000</option>
              <option value="15,00,000">15,00,000</option>
            </select>
          </div>
        </>
      );

    default:
      return null;
  }
};

export default RenderFormFields;
