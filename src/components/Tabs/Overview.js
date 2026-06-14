import React, { useEffect, useState } from "react";
import "./Tabs.css";
import NiCross from "../../icons/ni-cross";
import NiTick from "../../icons/ni-tick";
import DeleteModal from "../Modals/DeleteModal";
import AddLocationModal from "../Modals/AddLocationModal";
import formatDate from "../DateFormate/DateFormate";
import { useDispatch } from "react-redux";
import { updateUserApproval, updateUser } from "../../Redux/Slices/AppSlices";
import NiEdit from "../../icons/ni-edit";
import { X } from "lucide-react";
import { uploadImage } from "../../Pages/LandingSetting/LandingApi";

const Overview = ({ userData, mood, setAlert }) => {
  console.log(userData,"userData")
  const dispatch = useDispatch();
  const [localUser, setLocalUser] = useState(userData);
  const [disapproveOpen, setDisapproveOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [editKyc, setEditKyc] = useState(false);
  const [editBank, setEditBank] = useState(false);
  const [editNominee, setEditNominee] = useState(false);
  const [saving, setSaving] = useState(false);

  const [editData, setEditData] = useState({
    panNumber: localUser?.panNumber || "",
    aadharNumber: localUser?.aadharNumber || "",
    panPhoto: localUser?.panPhoto || "",
    aadharPhoto: localUser?.aadharPhoto || "",
    address: localUser?.address || "",

    bankName: localUser?.bankName || "",
    accountNumber: localUser?.accountNumber || "",
    ifsc: localUser?.ifsc || "",

    nomineeName: localUser?.nomineeName || "",
    nomineeRelation: localUser?.nomineeRelation || "",
    nomineeAadharNumber: localUser?.nomineeAadharNumber || "",
    nomineeAadharPhoto: localUser?.nomineeAadharPhoto || "",
  });
  useEffect(() => {
    setLocalUser(userData);
  }, [userData]);
  useEffect(() => {
    if (localUser) {
      setEditData({
        panNumber: localUser.panNumber || "",
        aadharNumber: localUser.aadharNumber || "",
        panPhoto: localUser?.panPhoto || "",
        aadharPhoto: localUser?.aadharPhoto || "",
        address: localUser.address || "",

        bankName: localUser.bankName || "",
        accountNumber: localUser.accountNumber || "",
        ifsc: localUser.ifsc || "",

        nomineeName: localUser.nomineeName || "",
        nomineeRelation: localUser.nomineeRelation || "",
        nomineeAadharNumber: localUser.nomineeAadharNumber || "",
        nomineeAadharPhoto: localUser?.nomineeAadharPhoto || "",
      });
    }
  }, [localUser]);

  if (!localUser) return null;

  const handleApprove = async () => {
    try {
      const result = await dispatch(
        updateUserApproval({
          id: localUser._id,
          status: "active",
        }),
      );

      if (result.payload?.user) {
        setLocalUser(result.payload.user);

        setAlert({
          message: "Associate approved successfully",
          status: "Success",
        });

        setTimeout(() => {
          setAlert(null);
        }, 3000);
      }
    } catch (error) {
      console.log(error);

      setAlert({
        message: "Approval failed",
        status: "Error",
      });
    }
  };

  const handleReject = async () => {
    try {
      const result = await dispatch(
        updateUserApproval({
          id: localUser._id,
          status: "rejected",
          notes: formData.notes,
        }),
      );

      if (result.payload?.user) {
        setLocalUser(result.payload.user);

        setAlert({
          message: "Associate disapproved successfully",
          status: "Success",
        });

        setDisapproveOpen(false);

        setTimeout(() => {
          setAlert(null);
        }, 3000);
      }
    } catch (error) {
      console.log(error);

      setAlert({
        message: "Disapproval failed",
        status: "Error",
      });
    }
  };


  const handleSave = async () => {
    try {
      setSaving(true);
      let panPhotoUrl = "";
      let aadharPhotoUrl = "";
      let nomineeAadharPhotoUrl = "";
      console.log(editData, "editData")
      if (editData.panPhoto instanceof File) {
        const panUpload = await uploadImage(editData.panPhoto);
        panPhotoUrl = panUpload.url;
      }

      if (editData.aadharPhoto instanceof File) {
        const aadharUpload = await uploadImage(editData.aadharPhoto);
        aadharPhotoUrl = aadharUpload.url;
      }

      if (editData.nomineeAadharPhoto instanceof File) {
        const nomineeUpload = await uploadImage(
          editData.nomineeAadharPhoto
        );
        nomineeAadharPhotoUrl = nomineeUpload.url;
      }
      console.log(panPhotoUrl, "panUpload")
      console.log(aadharPhotoUrl, "aadharPhotoUrl")
      console.log(nomineeAadharPhotoUrl, "nomineeAadharPhotoUrl")
      const payload = {
        ...editData,

        panPhoto:
          panPhotoUrl ||
          (typeof editData.panPhoto === "string"
            ? editData.panPhoto
            : localUser.panPhoto),

        aadharPhoto:
          aadharPhotoUrl ||
          (typeof editData.aadharPhoto === "string"
            ? editData.aadharPhoto
            : localUser.aadharPhoto),

        nomineeAadharPhoto:
          nomineeAadharPhotoUrl ||
          (typeof editData.nomineeAadharPhoto === "string"
            ? editData.nomineeAadharPhoto
            : localUser.nomineeAadharPhoto),
      };
      console.log(payload, "payload2")
      const result = await dispatch(
        updateUser({
          id: localUser._id,
          data: payload,
        })
      ).unwrap();

      setLocalUser(result);

      setEditKyc(false);
      setEditBank(false);
      setEditNominee(false);

      setAlert({
        message: "Details updated successfully",
        status: "Success",
      });

      setTimeout(() => {
        setAlert(null);
      }, 3000);
    } catch (error) {
      console.log(error);

      setAlert({
        message: "Update failed",
        status: "Error",
      });
      setTimeout(() => {
        setAlert(null);
      }, 3000);
      setSaving(false);
    }
  };

  return (
    <div className="card overview-card">
      {localUser.role === "agent" && (
        <div className="agent-mini-stats">
          <div className="overview-grid">
            <div>
              <label>Referral ID</label>
              <p>{localUser.referralId}</p>
            </div>

            <div>
              <label>Designation</label>
              <p>{localUser.designation}</p>
            </div>

            <div>
              <label>Designation Percent</label>
              <p>{localUser.directIncomePercent || 0}%</p>
            </div>

            <div>
              <label>Wallet</label>
              <p>₹{localUser.wallet}</p>
            </div>

            <div>
              <label>Total Income</label>
              <p>₹{localUser.totalIncome}</p>
            </div>

            <div>
              <label>Total Withdraw</label>
              <p>₹{localUser.totalWithdraw}</p>
            </div>

            <div>
              <label>Total Team</label>
              <p>{localUser.totalTeam}</p>
            </div>
            <div>
              <label>Left Team</label>
              <p>{localUser.leftChildren?.length}</p>
            </div>
            <div>
              <label>Right Team</label>
              <p>{localUser.rightChildren?.length}</p>
            </div>
            <div>
              <label>Joined On</label>
              <p>{formatDate(localUser?.createdAt)}</p>
            </div>
          </div>
          {mood === "admin" && localUser.status === "approval" && (
            <div className="modal-actions">
              <button
                className="site-visit-approval status active"
                onClick={handleApprove}
              >
                <NiTick /> Approve
              </button>

              <button
                className="site-visit-approval status failed"
                onClick={() => setDisapproveOpen(true)}
              >
                <NiCross /> Disapprove
              </button>
            </div>
          )}

          <h4>Referred By</h4>

          <div className="overview-grid">
            <div>
              <label>Referral ID</label>
              <p>{localUser.referralId}</p>
            </div>

            <div>
              <label>Position</label>
              <p>{localUser.position}</p>
            </div>
          </div>
          {localUser.referredBy && (
            <>
              <div className="overview-grid">
                <div>
                  <label>Name</label>
                  <p>{localUser.referredBy.name}</p>
                </div>

                <div>
                  <label>Phone</label>
                  <p>{localUser.referredBy.phone}</p>
                </div>
                <div>
                  <label>Email</label>
                  <p>{localUser.referredBy.email}</p>
                </div>

                <div>
                  <label>Referral ID</label>
                  <p>{localUser.referredBy.referralId}</p>
                </div>

                <div>
                  <label>Designation</label>
                  <p>{localUser.referredBy.designation}</p>
                </div>
              </div>
            </>
          )}

          <h4>Business Statistics</h4>

          <div className="overview-grid">
            <div>
              <label>Self Business</label>
              <p>₹{localUser.selfBusiness}</p>
            </div>

            <div>
              <label>Left Business</label>
              <p>₹{localUser.leftBusiness}</p>
            </div>

            <div>
              <label>Right Business</label>
              <p>₹{localUser.rightBusiness}</p>
            </div>

            <div>
              <label>Total Business</label>
              <p>₹{localUser.totalBusiness}</p>
            </div>

            <div>
              <label>Cycle 1 Business</label>
              <p>₹{localUser.cycle1Business}</p>
            </div>

            <div>
              <label>Cycle 2 Business</label>
              <p>₹{localUser.cycle2Business}</p>
            </div>
          </div>

          <div className="section-header">
            <h4>KYC Details <span onClick={() => setEditKyc(!editKyc)}>{editKyc ? <X /> : <NiEdit />}</span></h4>

            {/* {(mood === "admin" || mood === "staff") && (
              <button onClick={() => setEditKyc(!editKyc)}>
                {editKyc ? <X /> : <NiEdit />}
              </button>
            )} */}
          </div>

          <div className="overview-grid">
            <div>
              <label>PAN Number</label>

              {editKyc ? (
                <div className="plot-modal">
                  <div className="field">
                    <input
                      value={editData.panNumber}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          panNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              ) : (
                <p>{localUser.panNumber}</p>
              )}
            </div>

            <div>
              <label>Aadhar Number</label>
              {editKyc ? (
                <div className="plot-modal">
                  <div className="field">
                    <input
                      value={editData.aadharNumber}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          aadharNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              ) : (
                <p>{localUser.aadharNumber}</p>
              )}
            </div>

            <div>
              <label>Address</label>
              {editKyc ? (
                <div className="plot-modal">
                  <div className="field">
                    <input
                      value={editData.address}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              ) : (
                <p>{localUser.address}</p>
              )}
            </div>
            <div>
              <label>Pan Photo</label>
              {editKyc ? (
                <div className="plot-modal">
                  <div className="field">
                    <input
                      type="file"
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          panPhoto: e.target.files[0]
                        })
                      }
                    />
                  </div>
                </div>
              ) : (
                <p>
                  <img
                    onClick={() => {
                      setPreviewImage(localUser?.panPhoto);
                      setPreviewOpen(true);
                    }}
                    className="doc-thumbnail" src={localUser?.panPhoto} alt="" />
                </p>
              )}
            </div>
            <div>
              <label>Aadhar Photo</label>
              {editKyc ? (
                <div className="plot-modal">
                  <div className="field">
                    <input
                      type="file"
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          aadharPhoto: e.target.files[0]
                        })
                      }
                    />
                  </div>
                </div>
              ) : (
                <p>
                  <img
                    onClick={() => {
                      setPreviewImage(localUser?.aadharPhoto);
                      setPreviewOpen(true);
                    }}
                    className="doc-thumbnail" src={localUser?.aadharPhoto} alt="" />
                </p>
              )}
            </div>
          </div>

          <div className="section-header">
            <h4>Bank Details <span onClick={() => setEditBank(!editBank)}> {editBank ? <X /> : <NiEdit />}</span></h4>

            {/* {(mood === "admin" || mood === "staff") && (
              <button onClick={() => setEditBank(!editBank)}>
                {editBank ? <X /> : <NiEdit />}
              </button>
            )} */}
          </div>

          <div className="overview-grid">
            <div>
              <label>Bank Name</label>
              {editBank ? (
                <div className="plot-modal">
                  <div className="field">
                    <input
                      value={editData.bankName}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          bankName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              ) : (
                <p>{localUser.bankName}</p>
              )}
            </div>

            <div>
              <label>Account Number</label>
              {editBank ? (
                <div className="plot-modal">
                  <div className="field">
                    <input
                      value={editData.accountNumber}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          accountNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              ) : (
                <p>{localUser.accountNumber}</p>
              )}
            </div>

            <div>
              <label>IFSC</label>
              {editBank ? (
                <div className="plot-modal">
                  <div className="field">
                    <input
                      value={editData.ifsc}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          ifsc: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              ) : (
                <p>{localUser.ifsc}</p>
              )}
            </div>
          </div>

          <div className="section-header">
            <h4>Nominee Details <span onClick={() => setEditNominee(!editNominee)}>{editNominee ? <X /> : <NiEdit />}</span></h4>

            {/* {(mood === "admin" || mood === "staff") && (
              <button onClick={() => setEditNominee(!editNominee)}>
                {editNominee ? <X /> : <NiEdit />}
              </button>
            )} */}
          </div>

          <div className="overview-grid">
            <div>
              <label>Nominee Name</label>
              {editNominee ? (
                <div className="plot-modal">
                  <div className="field">
                    <input
                      value={editData.nomineeName}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          nomineeName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              ) : (
                <p>{localUser.nomineeName}</p>
              )}
            </div>

            <div>
              <label>Relation</label>
              {editNominee ? (
                <div className="plot-modal">
                  <div className="field">
                    <select
                      value={editData.nomineeRelation}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          nomineeRelation: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Relation</option>
                      <option value="wife">Wife</option>
                      <option value="husband">Husband</option>
                      <option value="son">Son</option>
                      <option value="daughter">Daughter</option>
                      <option value="mother">Mother</option>
                      <option value="father">Father</option>
                      <option value="brother">Brother</option>
                      <option value="sister">Sister</option>
                    </select>
                    {/* <input
                      value={editData.nomineeRelation}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          nomineeRelation: e.target.value,
                        })
                      }
                    /> */}
                  </div>
                </div>
              ) : (
                <p>{localUser.nomineeRelation}</p>
              )}
            </div>

            <div>
              <label>Nominee Aadhar</label>
              {editNominee ? (
                <div className="plot-modal">
                  <div className="field">
                    <input
                      value={editData.nomineeAadharNumber}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          nomineeAadharNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              ) : (
                <p>{localUser.nomineeAadharNumber}</p>
              )}
            </div>
            <div>
              <label>Nominee Aadhar Photo</label>
              {editNominee ? (
                <div className="plot-modal">
                  <div className="field">
                    <input
                      type="file"
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          nomineeAadharPhoto: e.target.files[0]
                        })
                      }
                    />
                  </div>
                </div>
              ) : (
                <p>
                  <img
                    onClick={() => {
                      setPreviewImage(localUser?.nomineeAadharPhoto);
                      setPreviewOpen(true);
                    }}
                    className="doc-thumbnail"
                    src={localUser?.nomineeAadharPhoto}
                    alt="" />
                </p>
              )}
            </div>
          </div>
          {(editKyc || editBank || editNominee) && (
            <div className="modal-actions">
              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  opacity: saving ? 0.6 : 1,
                  cursor: saving ? "not-allowed" : "pointer",
                }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ================= STAFF ================= */}

      {userData.role === "staff" && (
        <div className="agent-mini-stats">
          <div className="overview-grid">
            <div>
              <label>Name</label>
              <p>{localUser.name}</p>
            </div>

            <div>
              <label>Email</label>
              <p>{localUser.email}</p>
            </div>

            <div>
              <label>Phone</label>
              <p>{localUser.phone}</p>
            </div>

            <div>
              <label>Staff Role</label>
              <p>{localUser.staffRole}</p>
            </div>

            <div>
              <label>Status</label>
              <p>{localUser.status}</p>
            </div>
          </div>

          <h4>Permissions</h4>

          <div className="permission-list">
            {localUser.permissions?.length ? (
              localUser.permissions.map((permission) => (
                <div key={permission} className="permission-item active">
                  {permission}
                </div>
              ))
            ) : (
              <p>No permissions assigned</p>
            )}
          </div>
        </div>
      )}

      {/* ================= CUSTOMER ================= */}

      {localUser.role === "user" && (
        <div className="agent-mini-stats">
          <div className="overview-grid">
            <div>
              <label>Name</label>
              <p>{localUser.name}</p>
            </div>

            <div>
              <label>Email</label>
              <p>{localUser.email}</p>
            </div>

            <div>
              <label>Phone</label>
              <p>{localUser.phone}</p>
            </div>
          </div>
        </div>
      )}
      {localUser.role === "admin" && (
        <div className="agent-mini-stats">
          <div className="overview-grid">
            <div>
              <label>Name</label>
              <p>{localUser.name}</p>
            </div>

            <div>
              <label>Email</label>
              <p>{localUser.email}</p>
            </div>

            <div>
              <label>Phone</label>
              <p>{localUser.phone}</p>
            </div>
            <div>
              <label>Referral ID</label>
              <p>{localUser.referralId}</p>
            </div>

            <div>
              <label>Designation</label>
              <p>{localUser.designation}</p>
            </div>

            <div>
              <label>Designation Percent</label>
              <p>{localUser.directIncomePercent || 0}%</p>
            </div>

            <div>
              <label>Wallet</label>
              <p>₹{localUser.wallet}</p>
            </div>

            <div>
              <label>Total Income</label>
              <p>₹{localUser.totalIncome}</p>
            </div>

            <div>
              <label>Total Team</label>
              <p>{localUser.totalTeam}</p>
            </div>
            <div>
              <label>Left Team</label>
              <p>{localUser.leftChildren?.length}</p>
            </div>
            <div>
              <label>Right Team</label>
              <p>{localUser.rightChildren?.length}</p>
            </div>
          </div>
        </div>
      )}
      <DeleteModal
        open={disapproveOpen}
        onClose={() => setDisapproveOpen(false)}
      >
        <h4>Disapprove Associate</h4>
        <div className="field">
          <label>Notes</label>
          <textarea
            placeholder="Add Notes..."
            value={formData.notes || ""}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
          />
        </div>

        <div className="modal-actions">
          <button
            className="site-visit-approval status failed"
            onClick={handleReject}
          >
            <NiCross /> Disapprove
          </button>
        </div>
      </DeleteModal>
      <AddLocationModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title="Document Preview"
      >
        <div style={{ textAlign: "center" }}>
          <img
            src={previewImage}
            alt="Document"
            style={{
              maxWidth: "100%",
              maxHeight: "70vh",
              borderRadius: "8px",
            }}
          />
        </div>
      </AddLocationModal>
    </div>
  );
};

export default Overview;
