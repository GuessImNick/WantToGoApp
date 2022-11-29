import React, { useState } from "react";
import Button from "../../../../components/button/Button";
import "./LoginPopup.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { signIn, signOut } from "../../../../utils/auth";

const LoginPopup = ({ page, setPage }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const onchange = (e) => {
    switch (e.target.className) {
      case "email":
        setLoginForm(prev => {return {...prev, email: e.target.value}});
        break;
      case "password":
        setLoginForm(prev => {return {...prev, password: e.target.value}});
        break;
      default:
        break;
    }
  }

  return (
    <div
      className={`login-popup`}
      onClick={(e) => e.stopPropagation()}
      style={page === "login" ? { top: "50%" } : null}
    >
      <div className="form-group">
        <div className="input-group">
          <div className="input">
            <p>Email Address</p>
            <input
              type="email"
              placeholder="Enter your email"
              value={loginForm.email}
              onChange={(e) => onchange(e)}
              className="email"
            />
          </div>
          <div className="input">
            <p>
              <span>Password</span>
              <span onClick={() => setPage("forgotPassword")}>Forgot Password?</span>
            </p>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              value={loginForm.password}
              onChange={(e) => onchange(e)}
              className="password"
            />
            {passwordVisible ? (
              <FaRegEyeSlash
                className="hide-password"
                onClick={() => setPasswordVisible(false)}
              />
            ) : (
              <FaRegEye
                className="hide-password"
                onClick={() => setPasswordVisible(true)}
              />
            )}
          </div>
        </div>
        <Button type={"secondary"} text={"LOG IN"} onclick={() => signIn(loginForm)}/>
        <p className="create-account-text">
          Don't have an account?{" "}
          <span onClick={() => setPage("register")}>Create An Account</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPopup;
