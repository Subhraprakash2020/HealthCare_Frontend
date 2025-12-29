import "../../../css/ProviderAuth.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔑 source of truth = URL
  const [mode, setMode] = useState(
    location.pathname.includes("signup") ? "signup" : "signin"
  );

  // 🔄 sync UI when URL changes (refresh / direct URL)
  useEffect(() => {
    if (location.pathname.includes("signup")) {
      setMode("signup");
    } else {
      setMode("signin");
    }
  }, [location.pathname]);

  const handleSwitch = (newMode) => {
    setMode(newMode);
    navigate(`/provider/${newMode}`);
  };

  return (
    <div className="provider-auth">
      <div className={`auth-container ${mode === "signup" ? "right-panel-active" : ""}`}>

        {/* SIGN UP */}
        <div className="form-container sign-up-container">
          <form>
            <h1>Create Account</h1>

            <div className="social-container">
              <a href="#" className="social">F</a>
              <a href="#" className="social">G+</a>
              <a href="#" className="social">in</a>
            </div>

            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="button">Sign Up</button>
          </form>
        </div>

        {/* SIGN IN */}
        <div className="form-container sign-in-container">
          <form>
            <h1>Sign in</h1>

            <div className="social-container">
              <a href="#" className="social">F</a>
              <a href="#" className="social">G+</a>
              <a href="#" className="social">in</a>
            </div>

            <span>or use your account</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button type="button">Sign In</button>
          </form>
        </div>

        {/* OVERLAY */}
        <div className="overlay-container">
          <div className="overlay">

            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login</p>
              <button className="ghost" onClick={() => handleSwitch("signin")}>
                Sign In
              </button>
            </div>

            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey</p>
              <button className="ghost" onClick={() => handleSwitch("signup")}>
                Sign Up
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export const ProviderSignin = () => <AuthLayout />;
export const ProviderSignup = () => <AuthLayout />;
