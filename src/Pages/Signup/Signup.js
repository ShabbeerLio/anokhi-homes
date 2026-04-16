import React, { useState } from "react";
// import "./Signup.css";
import { useNavigate, Link } from "react-router-dom";
import NiClosseye from "../../icons/ni-closseye";
import NiOpenEye from "../../icons/ni-openEye";
import { ChevronLeft } from "lucide-react";
import NiTick from "../../icons/ni-tick";

const Signup = ({ mood, setAlert }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    referralCode: "",
    referralName: "",
    password: "",

    address: "",
    panNumber: "",
    panPhoto: null,
    aadharNumber: "",
    aadharPhoto: null,

    bankName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifsc: "",

    emailOtp: "",
    isEmailVerified: false,

    nomineeName: "",
    nomineeRelation: "",
    nomineeAadharNumber: "",
    nomineeAadharPhoto: null,
  });

  /* ================= REFERRAL ================= */
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

  /* ================= OTP ================= */
  const verifyOtp = () => {
    if (formData.emailOtp === "123456") {
      setFormData((prev) => ({ ...prev, isEmailVerified: true }));
      setAlert({
        message: "Email Verified successfully!",
        status: "Success",
      });
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    } else {
      setAlert({
        message: "Invalid OTP",
        status: "Erroe",
      });
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    }
  };

  /* ================= VALIDATIONS ================= */
  const canGoStep2 =
    formData.name && formData.email && formData.phone && formData.password && formData.referralCode;

  const canGoStep3 =
    formData.address &&
    formData.panNumber &&
    formData.panPhoto &&
    formData.aadharNumber &&
    formData.aadharPhoto &&
    formData.accountNumber &&
    formData.ifsc &&
    formData.isEmailVerified;

  const canFinish =
    formData.nomineeName &&
    formData.nomineeRelation &&
    formData.nomineeAadharNumber;

  /* ================= FINAL SUBMIT ================= */
  const handleFinish = () => {
    if (formData.accountNumber !== formData.confirmAccountNumber) {
      // return (alert("Account numbers do not match"));
      navigate("/dashboard");
      setAlert({
        message: "Account numbers do not match",
        status: "Error",
      });
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    }

    console.log("FINAL DATA:", formData);
    // alert("Agent Registered Successfully 🚀");
    setAlert({
      message: "Registration Request Submitted Successfully! Please check email for further informations.",
      status: "Success",
    });
    navigate("/");
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const isAccountMatch =
    formData.accountNumber &&
    formData.confirmAccountNumber &&
    formData.accountNumber === formData.confirmAccountNumber;

  if (mood === "admin") {
    return (
      <div className="auth-bg">
        <div className="auth-card">
          <h2>Access Restricted</h2>
          <p>Admin cannot be created from here.</p>
          <button onClick={() => navigate("/role")}>
            Select Role
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="auth-header">
          {step !== 1 && mood === "agent" && (
            <ChevronLeft
              className="back-button"
              onClick={() => setStep(step - 1)}
            />
          )}
          <h2>{mood === "agent" ? "Associate Signup" : "Signup"}</h2>
        </div>
        {mood === "user" && (
          <>
            <input
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <input
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
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
            <button
              className={`role-${mood}`}
              onClick={() => setAlert({
                message: "Registered successfully!",
                status: "Success",
              })
              }

            >
              Signup
            </button>
            <p className="auth-footer">
              Already have account? <Link to="/login">Sign in</Link>
            </p>
          </>
        )}
        {mood === "staff" && (
          <>
            <input
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <input
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
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

            {/* Optional staff role */}
            <input
              placeholder="Department / Role"
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            />
            <button className={`role-${mood}`} onClick={() => {
              navigate("/dashboard");
              setAlert({
                message: "Registration Successful!",
                status: "Success",
              })
              setTimeout(() => {
                setAlert(null);
              }, 5000);
            }
            }>
              Sign Up
            </button>
            <p className="auth-footer">
              Already have account? <Link to="/login">Sign in</Link>
            </p>
          </>
        )}
        {mood === "agent" && (
          <>
            <p>Step {step} of 3</p>
            {/* ================= STEP 1 ================= */}
            {step === 1 && (
              <>
                <input
                  placeholder="Name (as per Aadhaar)"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <input
                  type="mail"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
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

                <input
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />

                <input
                  placeholder="Referral Code"
                  value={formData.referralCode}
                  onChange={(e) => handleReferralCheck(e.target.value)}
                />

                {formData.referralName && (
                  <p>Referred by: {formData.referralName}</p>
                )}

                <button className={canGoStep2 ? `role-${mood}` : ""} disabled={!canGoStep2} onClick={() => setStep(2)}>
                  Next
                </button>

                <p className="auth-footer">
                  Already have account? <Link to="/login">Sign in</Link>
                </p>
              </>
            )}

            {/* ================= STEP 2 ================= */}
            {step === 2 && (
              <>
                <input
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />

                <input
                  placeholder="PAN Number"
                  value={formData.panNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      panNumber: e.target.value.toUpperCase(),
                    })
                  }
                />

                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, panPhoto: e.target.files[0] })
                  }
                />

                <input
                  placeholder="Aadhaar Number"
                  value={formData.aadharNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, aadharNumber: e.target.value })
                  }
                />

                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, aadharPhoto: e.target.files[0] })
                  }
                />

                <input
                  placeholder="Bank Name"
                  value={formData.bankName}
                  onChange={(e) =>
                    setFormData({ ...formData, bankName: e.target.value })
                  }
                />

                <input
                  type="password"
                  placeholder="Account Number"
                  value={formData.accountNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, accountNumber: e.target.value })
                  }
                />

                <input
                  type="password"
                  placeholder="Confirm Account Number"
                  value={formData.confirmAccountNumber}
                  className={
                    formData.confirmAccountNumber
                      ? isAccountMatch
                        ? "input-success"
                        : "input-error"
                      : ""
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmAccountNumber: e.target.value,
                    })
                  }
                />

                <input
                  placeholder="IFSC Code"
                  value={formData.ifsc}
                  onChange={(e) =>
                    setFormData({ ...formData, ifsc: e.target.value })
                  }
                />

                {/* OTP */}
                <p className="email-otp-messge">Check email for OTP</p>
                <div className="otp-box">
                  <input
                    placeholder="Enter OTP"
                    value={formData.emailOtp}
                    disabled={formData.isEmailVerified}
                    onChange={(e) =>
                      setFormData({ ...formData, emailOtp: e.target.value })
                    }
                  />

                  <button
                    className={`role-${mood} ${formData.isEmailVerified ? "verified" : ""}`}
                    onClick={verifyOtp}
                    disabled={formData.isEmailVerified}
                  >
                    {formData.isEmailVerified ? `Verified` : "Verify"}
                  </button>

                </div>
                {formData.isEmailVerified ? `` : <p className="email-otp-messge" style={{ color: "red", cursor: "pointer" }}>Resend OTP</p>}

                <button className={canGoStep3 ? `role-${mood}` : ""} disabled={!canGoStep3} onClick={() => setStep(3)}>
                  Next
                </button>
              </>
            )}

            {/* ================= STEP 3 ================= */}
            {step === 3 && (
              <>
                <input
                  placeholder="Nominee Name"
                  value={formData.nomineeName}
                  onChange={(e) =>
                    setFormData({ ...formData, nomineeName: e.target.value })
                  }
                />
                <div className="plot-modal field">
                  <select
                    value={formData.nomineeRelation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
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
                </div>

                <input
                  placeholder="Nominee Aadhaar Number"
                  value={formData.nomineeAadharNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nomineeAadharNumber: e.target.value,
                    })
                  }
                />

                <input
                  type="file"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nomineeAadharPhoto: e.target.files[0],
                    })
                  }
                />

                <button className={canFinish ? `role-${mood}` : ""} disabled={!canFinish} onClick={handleFinish}>
                  Finish
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
