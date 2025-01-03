import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import "../styles/login.css";
import Canvas from "../components/Canvas";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";


function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const res = await axios.post("http://localhost:8080/auth/google-login", {
        token: credential,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.jwtToken);
        localStorage.setItem("loggedInUser", res.data.email);
        localStorage.setItem("loggedUserName", res.data.name);
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      alert("Google Login Failed!");
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Sign-In Error:", error);
    alert("Google Sign-In Failed");
  };

  //   const exams = [
  //     "JEE",
  //     "NEET",
  //     "UPSC",
  //     "CAT",
  //     "GATE",
  //     "CLAT",
  //     "SSC",
  //     "IBPS",
  //     "NDA",
  //     "RAILWAY",
  //   ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password)
      return handleError("All the parameters are required");
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", loginInfo.email);
        localStorage.setItem("loggedUserName", name);
        setTimeout(() => navigate("/home"), 1000);
      } else if (error) {
        handleError(error.details[0].message);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_SOME_KEY}>

      <div className="background">
        <Canvas />
        <div className="login-container">
          <h1 className="login-title">Login</h1>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="email"
                placeholder="Enter your Email"
                value={loginInfo.email}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="password-input-wrapper">
                <input
                  onChange={handleChange}
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={loginInfo.password}
                  className="form-input pass-inp"
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
            <button type="submit" className="login-button">
              Login
            </button>
            <span className="signup-link-wrapper">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="signup-link">
                Signup
              </Link>
            </span>
          </form>
          <ToastContainer />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
