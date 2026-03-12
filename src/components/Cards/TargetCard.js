import React, { useState } from "react";
import NiOpenEye from "../../icons/ni-openEye";
import NiDots from "../../icons/ni-dots";
import ActionModal from "../Modals/ActionModal";
import DeleteModal from "../Modals/DeleteModal";
import ViewModal from "../Modals/ViewModal";

const TargetCard = ({
    item,
    agentSales = 30000,
    mood,
    setSelectedOffers,
    setIsEditMode,
    setOpen,
    setAlert,
}) => {

    const [activeRow, setActiveRow] = useState(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);

    const progress = Math.min((agentSales / item.targetAmount) * 100, 100);

    const getRemainingDays = (endDate) => {

        const today = new Date();
        const end = new Date(endDate);

        const diff = end - today;

        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

        if (days <= 0) return "Expired";

        return `${days} days remaining`;

    };

    return (
        <div className="user-card card">

            {/* HEADER */}

            <div className="user-card-top">

                <div className="user-card-title">
                    <div className="user-card-name">

                        <h4>
                            {item.title}

                            <span className={`status ${item.status === "active" ? "active" : "inactive"}`}>
                                {item.status === "active" ? "Active" : "Disabled"}
                            </span>

                        </h4>

                    </div>
                </div>

                <div className="dots">
                    {mood === "admin" && (
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={item.status === "active"}
                                onChange={() => {
                                    item.status = item.status === "active" ? "inactive" : "active";
                                }}
                            />
                            <span className="slider"></span>
                        </label>
                    )}

                    <span
                        onClick={(e) => {
                            e.stopPropagation();
                            setViewOpen(true);
                        }}
                    >
                        <NiOpenEye />
                    </span>

                    {mood === "admin" && (
                        <span
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveRow(activeRow === item.id ? null : item.id);
                            }}
                        >
                            <NiDots />
                        </span>
                    )}

                    {activeRow === item.id && (

                        <ActionModal
                            item={item}
                            onClose={() => setActiveRow(null)}
                            onEdit={(data) => {
                                setSelectedOffers(data);
                                setIsEditMode(true);
                                setOpen(true);
                            }}
                            onDelete={() => setDeleteOpen(true)}
                        />

                    )}

                </div>

            </div>

            {/* BODY */}

            <div className="user-card-bottom">

                <div className="user-card-bottom-left">
                    <p>Description</p>
                    <p>Target Amount</p>
                    <p>Reward</p>
                    <p>Starts</p>
                    <p>Ends</p>
                    <p>Remaining</p>
                </div>

                <div className="user-card-bottom-right">
                    <p>{item.description}</p>
                    <p>₹{item.targetAmount}</p>
                    <p>{item.reward}</p>
                    <p>{item.startDate}</p>
                    <p>{item.endDate}</p>
                    <p className="countdown">{getRemainingDays(item.endDate)}</p>
                </div>

            </div>

            {/* TARGET PROGRESS */}

            <div className="target-progress">

                <div className="target-road">

                    <div
                        className="target-icon"
                        style={{ left: `${progress}%` }}
                    >
                        {item.icon}
                    </div>

                    <div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                    />

                </div>

                <p>{Math.floor(progress)}% Completed</p>

            </div>

            {/* DELETE MODAL */}

            <DeleteModal open={deleteOpen} onClose={() => setDeleteOpen(false)}>

                <p>Are you sure you want to delete?</p>

                <div className="modal-actions">

                    <button
                        onClick={() => {

                            setDeleteOpen(false);

                            setAlert({
                                message: "Target deleted successfully",
                                status: "Success",
                            });

                        }}
                    >
                        Yes
                    </button>

                    <button
                        className="btn-outline"
                        onClick={() => setDeleteOpen(false)}
                    >
                        Cancel
                    </button>

                </div>

            </DeleteModal>

            {/* VIEW MODAL */}

            <ViewModal
                open={viewOpen}
                onClose={() => setViewOpen(false)}
                title={item.title}
            >

                <div className="user-card-bottom view-box">

                    <div className="user-card-bottom-left">
                        <p>Description</p>
                        <p>Target Amount</p>
                        <p>Reward</p>
                        <p>Start</p>
                        <p>End</p>
                        <p>Remaining</p>
                    </div>

                    <div className="user-card-bottom-right">
                        <p>{item.description}</p>
                        <p>₹{item.targetAmount}</p>
                        <p>{item.reward}</p>
                        <p>{item.startDate}</p>
                        <p>{item.endDate}</p>
                        <p className="countdown">{getRemainingDays(item.endDate)}</p>
                    </div>

                </div>

            </ViewModal>

        </div>
    );
};

export default TargetCard;