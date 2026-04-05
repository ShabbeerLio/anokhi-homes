import React, { useState, useMemo, useEffect } from "react";
import AddLocationModal from "../Modals/AddLocationModal";
import NiSearch from "../../icons/ni-search";
import { LucidePlus } from "lucide-react";
import NiOpenEye from "../../icons/ni-openEye";
import NiDots from "../../icons/ni-dots";
import ActionModal from "../Modals/ActionModal";
import PaymentCard from "../Cards/PaymentCard";

const ITEMS_PER_PAGE = 6;

const PaymentTable = ({ data, actions = [], mood, setAlert }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    date: "",
    client: "",
    phone: "",
    project: "",
    amount: "",
    mode: "",
    status: "",
    dueStatus: "",
    paymentType: "",
    validDays: "",
    notes: "",
    transactionId: "",
    attachment: null,
    totalAmount: "", // IMPORTANT for % calc
  });

  useEffect(() => {
    if (selectedPayment) {
      setFormData(selectedPayment);
    } else {
      setFormData({
        date: "",
        client: "",
        phone: "",
        project: "",
        amount: "",
        mode: "",
        status: "",
        dueStatus: "",
        paymentType: "",
        validDays: "",
        notes: "",
        transactionId: "",
        attachment: null,
        totalAmount: "",
      });
    }
  }, [selectedPayment]);

  const filtered = useMemo(() => {
    return data.filter((payment) => {
      const matchSearch =
        payment.client.toLowerCase().includes(search.toLowerCase()) ||
        payment.phone.includes(search);

      const matchStatus =
        statusFilter === "" || payment.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [search, statusFilter, data]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const handleAddPayments = () => {
    console.log("Adding Payment:", formData);
    setOpen(false);
    setAlert({ message: "Payment added successfully!", status: "Success" });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };
  const handleEditPayments = () => {
    console.log("Editing Payment:", formData);
    setOpen(false);
    setAlert({ message: "Payment updated successfully!", status: "Success" });
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
              setSelectedPayment(null);
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
            placeholder="Search name / phone"
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
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div className="searchItem">
          <input
            type="date"
            // value={dateFilter}
            onChange={(e) => {
              // setDateFilter(e.target.value);
              // setPage(1);
            }}
          />
        </div>
      </div>
      <div className="user-card-box">
        {paginated.length === 0 ? (
          <p>No Payment Found</p>
        ) : (
          paginated.map((item) => (
            <PaymentCard
              item={item}
              setSelectedPayment={setSelectedPayment}
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
        title={isEditMode ? "Edit Payment" : "Add Payment"}
      >
        <div className="field">
          <label>Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <div className="field">
          <label>Client</label>
          <input
            value={formData.client}
            onChange={(e) =>
              setFormData({ ...formData, client: e.target.value })
            }
            placeholder="Client Name"
          />
        </div>

        <div className="field">
          <label>Phone</label>
          <input
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="Phone"
          />
        </div>

        <div className="field">
          <label>Project</label>
          <input
            value={formData.project}
            onChange={(e) =>
              setFormData({ ...formData, project: e.target.value })
            }
            placeholder="Project Name"
          />
        </div>

        <div className="field">
          <label>Amount</label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            placeholder="Amount"
          />
        </div>

        <div className="field">
          <label>Payment Mode</label>
          <select
            value={formData.mode}
            onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
          >
            <option value="">Select Mode</option>
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
        <div className="field">
          <label>Payment Type</label>

          <select
            value={formData.paymentType}
            onChange={(e) => {
              const type = e.target.value;
              const total = Number(formData.totalAmount);

              let autoAmount = "";

              if (type === "booking") autoAmount = total * 0.1;
              if (type === "agreement") autoAmount = total * 0.3;

              setFormData({
                ...formData,
                paymentType: type,
                amount: autoAmount || formData.amount,
              });
            }}
          >
            <option value="">Select Payment Type</option>
            <option value="booking">Booking (10%)</option>
            <option value="agreement">Agreement (30%)</option>
            <option value="full">Full Payment</option>
          </select>
        </div>
        {(formData.paymentType === "agreement" ||
          formData.paymentType === "full") && (
          <div className="field">
            <label>Valid Days</label>

            <input
              type="number"
              placeholder="Enter valid days (eg: 30 / 90)"
              value={formData.validDays}
              onChange={(e) =>
                setFormData({ ...formData, validDays: e.target.value })
              }
            />
          </div>
        )}
        {(formData.mode === "UPI" || formData.mode === "Bank Transfer") && (
          <div className="field">
            <label>Transaction ID *</label>
            <input
              placeholder="Enter Transaction ID"
              value={formData.transactionId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  transactionId: e.target.value,
                })
              }
            />
          </div>
        )}
        {(formData.mode === "UPI" || formData.mode === "Bank Transfer") && (
          <div className="field">
            <label>Attachment *</label>
            <input
              type="file"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  attachment: e.target.files[0],
                })
              }
            />
          </div>
        )}
        <div className="field">
          <label>Notes</label>

          <textarea
            placeholder="Example: 35% cancellation charges"
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
          />
        </div>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div className="modal-actions">
          <button
            onClick={() => {
              if (isEditMode) {
                handleEditPayments();
              } else {
                handleAddPayments();
              }
              setOpen(false);
            }}
          >
            {isEditMode ? "Update Payment" : "Add Payment"}
          </button>
        </div>
      </AddLocationModal>
    </div>
  );
};

export default PaymentTable;
