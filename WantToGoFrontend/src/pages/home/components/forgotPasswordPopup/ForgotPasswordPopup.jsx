import React, { useState } from "react";
import Button from "../../../../components/button/Button";
import { forgotPassword } from "../../../../utils/auth";
import "./ForgotPasswordPopup.css";

const ForgotPasswordPopup = ({ page }) => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  return (
    <div
      className={`forgot-password-popup`}
      onClick={(e) => e.stopPropagation()}
      style={page === "forgotPassword" ? { top: "60%" } : null}
    >
      <div className="form-group">
        <h1>Reset Password</h1>
        <div className="input-group">
          <div className="input email-input">
            <p>Email Address</p>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email"
            />
            <p
              className="validation-text"
              style={emailSent ? { visibility: "visible" } : null}
            >
              Password Reset Link Sent
            </p>
          </div>
        </div>
      </div>
      <div className="forgot-password-btn">
        <Button
          type={"secondary"}
          text={"SEND RESET EMAIL"}
          onclick={() => {
            forgotPassword(email);
            setEmailSent(true);
          }}
        />
      </div>
    </div>
  );
};

export default ForgotPasswordPopup;
