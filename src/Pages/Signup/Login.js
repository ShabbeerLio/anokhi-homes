import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({mood}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("anokhi@gmail.com");
  const [password, setPassword] = useState("h@38742dksb");

  const handleSubmit = () => {
    navigate("/dashboard");
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2>Sign in</h2>
        <p>Access your account quickly and securely.</p>

        <input placeholder="Email" value={email} />
        <input type="password" placeholder="Password" value={password} />

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
