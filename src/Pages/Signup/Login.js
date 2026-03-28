import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NiOpenEye from "../../icons/ni-openEye";
import NiClosseye from "../../icons/ni-closseye";

const Login = ({ mood }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("anokhi@gmail.com");
  const [password, setPassword] = useState("h@38742dksb");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    navigate("/dashboard");
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2>Sign in</h2>
        <p>Access your account quickly and securely.</p>

        <input placeholder="Email" value={email} />
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

        <button className={`role-${mood}`} onClick={() => handleSubmit()}>
          Sign In
        </button>

        <p className="auth-footer">
          New user? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
