import React, { useState } from "react";
import Button from "../../../../components/button/Button";
import "./RegisterPopup.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { register } from "../../../../utils/auth";

const RegisterPopup = ({ page, setPage }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    dob: "0001-01-01",
    email: "",
    password: "",
  });

  const onchange = (e) => {
    switch (e.target.className) {
        case "firstName":
        setRegisterForm((prev) => {
          return { ...prev, firstName: e.target.value };
        });
        break;
        case "lastName":
        setRegisterForm((prev) => {
          return { ...prev, lastName: e.target.value };
        });
        break;
        case "dob":
        setRegisterForm((prev) => {
          return { ...prev, dob: e.target.value };
        });
        break;
      case "email":
        setRegisterForm((prev) => {
          return { ...prev, email: e.target.value };
        });
        break;
      case "password":
        setRegisterForm((prev) => {
          return { ...prev, password: e.target.value };
        });
        break;
      default:
        break;
    }
  };
  return (
    <div
      className={`register-popup`}
      style={page === "register" ? { top: "10%" } : null}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="form-group">
        <div className="input-group">
          <div className="input">
            <p>First Name</p>
            <input
              type="text"
              placeholder="Enter your first name"
              value={registerForm.firstName}
              onChange={(e) => onchange(e)}
              className="firstName"
            />
          </div>
          <div className="input">
            <p>Last Name</p>
            <input
              type="text"
              placeholder="Enter your last name"
              value={registerForm.lastName}
              onChange={(e) => onchange(e)}
              className="lastName"
            />
          </div>
          <div className="input">
            <p>Date Of Birth (optional)</p>
            <input
              type="date"
              value={registerForm.dob}
              onChange={(e) => onchange(e)}
              
              className="dob"
            />
          </div>
          <div className="input">
            <p>Email Address</p>
            <input
              type="text"
              placeholder="Enter your email"
              value={registerForm.email}
              onChange={(e) => onchange(e)}
              className="email"
            />
          </div>
          <div className="input">
            <p>Create Password</p>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              value={registerForm.password}
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
        <Button type={"secondary"} text={"CREATE MY ACCOUNT"} onclick={() => {register(registerForm)}} />
        <p className="login-text">
          Already a member? <span onClick={() => setPage("login")}>Log In</span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPopup;
