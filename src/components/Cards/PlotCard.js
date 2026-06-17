import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NiEdit from "../../icons/ni-edit";
import NiDelete from "../../icons/ni-delete";
import DeleteModal from "../Modals/DeleteModal";
import NiDiscount from "../../icons/ni-discount";
import { formatCurrency } from "../Utils/FormatCurrency";

const PlotCard = ({
  p,
  cashback,
  plotId,
  mood,
  setSelectedProject,
  setIsEditMode,
  setOpen,
  setAlert,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = useState(false);
  // console.log(cashback, "cashback");
  return (
    <>
      <div
        key={p._id}
        className="plot-card card"
        onClick={() =>
          navigate(`/plot/${plotId}/${p._id}`, { state: { project: p.name } })
        }
      >
        <div className="plot-img">
          <img src={p.image} alt={p.name} />
          {/* <span className="offer">{p.offer}</span> */}
        </div>
        <div className="plot-details">
          <h3>{p.name}</h3>
          <p className="plot-card-price">₹{formatCurrency(p.priceRange)} / sqft</p>
          <p>Area: {p.area} sqft</p>
          {/* <p>{p.details}</p> */}
          {cashback && (
            <div className="cashback-badge">
              <div className="cashback-badge-left">
                <NiDiscount />
              </div>
              <div className="cashback-badge-right">
                {cashback.cashbackPercent}% Cashback
                <span>Collect full payment within {cashback.completeWithinDays} days</span>
              </div>
            </div>
          )}
        </div>
        {mood !== "user" && (
          <div className="plot-card-actions dots">
            <span
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProject(p);
                setIsEditMode(true);
                setOpen(true);
              }}
            >
              <NiEdit />
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                setDeleteOpen(true);
              }}
            >
              <NiDelete />
            </span>
          </div>
        )}
      </div>
      <DeleteModal open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <p>Are you sure you want to delete?</p>
        <div className="modal-actions">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDeleteOpen(false);
              onDelete(p._id);
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
    </>
  );
};

export default PlotCard;
