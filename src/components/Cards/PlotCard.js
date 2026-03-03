import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NiEdit from "../../icons/ni-edit";
import NiDelete from "../../icons/ni-delete";
import DeleteModal from "../Modals/DeleteModal";

const PlotCard = ({
  p,
  plotId,
  mood,
  setSelectedProject,
  setIsEditMode,
  setOpen,
  setAlert,
}) => {
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = useState(false);
  return (
    <>
    <div
      key={p.id}
      className="plot-card card"
      onClick={() => navigate(`/plot/${plotId}/${p.id}`)}
    >
      <div className="plot-img">
        <img src={p.img} alt={p.title} />
        {/* <span className="offer">{p.offer}</span> */}
      </div>
      <div className="plot-details">
        <h3>{p.name}</h3>
        <p className="plot-card-price">{p.price}</p>
        <p>{p.area}</p>
        <p>{p.details}</p>
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
              console.log("Lead deleted");

              setDeleteOpen(false);

              setAlert({
                message: "Lead deleted successfully!",
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
    </>
    
  );
};

export default PlotCard;
