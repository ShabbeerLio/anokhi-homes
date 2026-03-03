import React, { useState } from "react";
import ProjectData from "../Plot/PlotData";
import SearchSelect from "../../components/SearchItems/SearchSelect";

const RenderFormFields = ({ actionType, formData, setFormData }) => {

    const customers = [
        { id: "C001", name: "Rahul Sharma", phone: "9876543210" },
        { id: "C002", name: "Imran Khan", phone: "9123456789" },
        { id: "C003", name: "Arjun Mehta", phone: "9988776655" },
    ];

    const Projects = [
        { id: "P101", name: "SunShine Colony", location: "Mumbai" },
        { id: "P102", name: "Moon Colony", location: "Delhi" },
    ];
    const plots = [
        { id: "P101", name: "Plot A-12", price: "1200000", status: "Vacant" },
        { id: "P102", name: "Plot B-07", price: "2300000", status: "Hold(12/4/2026)" },
    ];

    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedProjects, setSelectedProjects] = useState(null);
    const [selectedPlot, setSelectedPlot] = useState(null);
    console.log(selectedCustomer, "selectedCustomer")
    const totalAmount = Number(selectedPlot?.price || 0);
    const paidAmount = Number(formData.amountPaid || 0);
    const remainingAmount = totalAmount - paidAmount;

    switch (actionType) {
        case "Add Agent / Staff / User":
            return (
                <>
                    <div className="field">
                        <label>User Type</label>
                        <select
                            value={formData.userType || ""}
                            onChange={(e) =>
                                setFormData({ ...formData, userType: e.target.value })
                            }
                        >
                            <option value="">Select Type</option>
                            <option value="User">User</option>
                            <option value="Staff">Staff</option>
                            <option value="Agent">Agent</option>
                        </select>
                    </div>

                    <div className="field">
                        <label>Name</label>
                        <input
                            value={formData.name || ""}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                        />
                    </div>

                    <div className="field">
                        <label>Avatar</label>
                        <input
                            value={formData.avatar || ""}
                            onChange={(e) =>
                                setFormData({ ...formData, avatar: e.target.value })
                            }
                            placeholder="Image URL"
                        />
                    </div>
                </>
            );

        case "Add Project":
            return (
                <>
                    {/* Project Location */}
                    <div className="field">
                        <label>Project Location</label>
                        <select
                            value={formData.location || ""}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    location: e.target.value,
                                    plot: "", // reset plot when location changes
                                });
                            }}
                        >
                            <option value="">Select Location</option>
                            {ProjectData.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.title}
                                </option>
                            ))}
                        </select>
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
                        <label>Image URL</label>
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

                    <div className="field">
                        <label>Amount Type</label>
                        <select
                            value={formData.amountType || ""}
                            onChange={(e) =>
                                setFormData({ ...formData, amountType: e.target.value })
                            }
                        >
                            <option value="">Select Type</option>
                            <option value="Token">Token</option>
                            <option value="Pending">Pending</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>
                </>
            );

        case "Add Payment (Received)":
            return (
                <>
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
                    <div className="field">
                        <SearchSelect
                            label="Client Name"
                            placeholder="Search name or number"
                            options={customers}
                            value={selectedCustomer}
                            onChange={(selected) => {
                                setSelectedCustomer(selected);
                                setFormData({ ...formData, client: selected.client });
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
                            placeholder="Phone"
                            value={selectedCustomer?.phone || ""}
                            onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                            }
                        />
                    </div>
                    {/* Project Location */}
                    <div className="field">
                        <label>Project Location</label>
                        <select
                            value={formData.location || ""}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    location: e.target.value,
                                    plot: "", // reset plot when location changes
                                });
                            }}
                        >
                            <option value="">Select Location</option>
                            {ProjectData.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Plot Dropdown */}
                    <div className="field">
                        <label>Plot</label>
                        <select
                            value={formData.plot || ""}
                            onChange={(e) =>
                                setFormData({ ...formData, plot: e.target.value })
                            }
                            disabled={!formData.location}
                        >
                            <option value="">Select Plot</option>

                            {ProjectData.find((p) => p.id === formData.location)?.plots.map(
                                (plot) => (
                                    <option key={plot.id} value={plot.id}>
                                        {plot.name}
                                    </option>
                                ),
                            )}
                        </select>
                    </div>
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
                    {/* <div className="field">
                        <label>Payment Status</label>
                        <select
                            value={formData.status || ""}
                            onChange={(e) =>
                                setFormData({ ...formData, status: e.target.value })
                            }
                        >
                            <option value="">Status</option>
                            <option value="Received">Received</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div> */}
                    <div className="field">
                        <label>Due Status</label>
                        <select
                            value={formData.dueStatus || ""}
                            onChange={(e) =>
                                setFormData({ ...formData, dueStatus: e.target.value })
                            }
                        >
                            <option value="">Due Status</option>
                            <option value="Clear">Clear</option>
                            <option value="Partial Due">Partial Due</option>
                            <option value="Full Due">Full Due</option>
                        </select>
                    </div>
                </>
            );
        case "Add Lead":
            return (
                <>
                    <div className="field">
                        <SearchSelect
                            label="Customer Name"
                            placeholder="Search name or number"
                            options={customers}
                            value={selectedCustomer}
                            onChange={(selected) => {
                                setSelectedCustomer(selected);
                                setFormData({ ...formData, customerName: selected.customerName });
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
                            placeholder="Phone"
                            value={selectedCustomer?.phone || ""}
                            onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
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
        case "Schedule Visit":
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
                                setFormData({ ...formData, customerName: selected.customerName });
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
                            label="Project"
                            placeholder="Search Project or location"
                            options={plots}
                            value={selectedPlot}
                            onChange={(selected) => {
                                setSelectedPlot(selected);
                                setFormData({ ...formData, plot: selected.name });
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
                        <label>Date: <span>26/2/2026</span></label>
                        <label>Client: <span>Rahul</span></label>
                        <label>Phone: <span>9876543210</span></label>
                        <label>Project: <span>B-198, Moon Colony</span></label>
                        <label>Amount: <span>12,34,567</span></label>
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

                    {/* <div className="field">
                        <label>Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) =>
                                setFormData({ ...formData, status: e.target.value })
                            }
                        >
                            <option value="">Select Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div> */}

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
                        <label>Customer ID <span>98765431208132</span></label>
                        <label>Plot <span>B-198, Moon Colony</span></label>
                        <label>Amount <span>12,34,567</span></label>
                        <label>Amount Paid <span>50,000</span></label>
                        <label>Remaining Amount <span>11,84,567</span></label>
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
