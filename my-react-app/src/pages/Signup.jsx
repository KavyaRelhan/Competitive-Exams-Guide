import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import "../styles/login.css";
import Canvas from "../components/Canvas";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("All the fields are required");
    }
    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        handleError(error.details[0].message);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const res = await axios.post("http://localhost:8080/auth/google-login", { token: credential });

      if (res.data.success) {
        localStorage.setItem("token", res.data.jwtToken);
        localStorage.setItem("loggedInUser", res.data.email);
        localStorage.setItem("loggedUserName", res.data.name);
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      alert("Google Signup Failed!");
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Sign-In Error:", error);
    alert("Google Sign-In Failed");
  };

  return (
    <GoogleOAuthProvider clientId="228124437125-6df51bm90j6hsm4h1kpmrdm0fsh0j99g.apps.googleusercontent.com">
      <div className="background">
        <Canvas />
        <div className="login-container">
          <h1 className="login-title">Signup</h1>
          <form onSubmit={handleSignup} className="login-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                onChange={handleChange}
                type="text"
                name="name"
                autoFocus
                placeholder="Enter your Name"
                value={signupInfo.name}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                onChange={handleChange}
                type="text"
                name="email"
                placeholder="Enter your Email"
                value={signupInfo.email}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="password-input-wrapper">
                <input
                  onChange={handleChange}
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={signupInfo.password}
                  className="form-input"
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="custom-google-login-btn"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                    alt="Google logo"
                    className="google-logo"
                  />
                  Continue with Google
                </button>
              )}
            />
            <button type="submit" className="login-button">Signup</button>
            <span className="signup-link-wrapper">
              Already have an account?{" "}
              <Link to="/login" className="signup-link">Login</Link>
            </span>
          </form>
          <ToastContainer />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Signup;
