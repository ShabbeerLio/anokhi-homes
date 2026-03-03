import React, { useState } from "react";
import { Link } from "react-router-dom";
import NiClosseye from "../../icons/ni-closseye";
import NiOpenEye from "../../icons/ni-openEye";

const Signup = () => {
  const [password, setPassword] = useState("h@38742dksb");
    const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2>Sign up</h2>
        <p>Create your account in few steps.</p>

        <input placeholder="Name" />
        <input placeholder="Email" />
        <input placeholder="Company" />
        <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="password-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <NiClosseye /> : <NiOpenEye />}
            </span>
          </div>

        <button className="primary">Continue</button>

        <p className="auth-footer">
          Already have account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;