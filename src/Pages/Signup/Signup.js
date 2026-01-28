import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2>Sign up</h2>
        <p>Create your account in few steps.</p>

        <input placeholder="Name" />
        <input placeholder="Email" />
        <input placeholder="Company" />
        <input type="password" placeholder="Password" />

        <button className="primary">Continue</button>

        <p className="auth-footer">
          Already have account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;