import React, { useState } from "react";
import Button from "../../components/button/Button";
import ForgotPasswordPopup from "./components/forgotPasswordPopup/ForgotPasswordPopup";
import LoginPopup from "./components/loginPopup/LoginPopup";
import RegisterPopup from "./components/registerPopup/RegisterPopup";
import "./LandingPage.css";

const LandingPage = () => {
  const [page, setPage] = useState("home");

  const loginBtnOnClick = (e) => {
    e.stopPropagation();
    setPage("login");
  }

  const registerBtnOnClick = (e) => {
    e.stopPropagation();
    setPage("register");
  }

  return (
    <div className="container">
      <div className="bg-image" onClick={() => setPage("home")}>
        <div className="content">
          <h1>
            <span className="left-text">If I Haven't Been</span> <br />
            <span className="right-text"> I Want To Go</span>
          </h1>
          <div className="button-group">
            <Button type={'primary'} text={'LOG IN'} onclick={loginBtnOnClick}/>
            <Button type={'secondary'} text={'REGISTER'} onclick={registerBtnOnClick}/>
          </div>
        </div>
        <LoginPopup page={page} setPage={setPage} />
        <RegisterPopup page={page} setPage={setPage} />
        <ForgotPasswordPopup page={page} /> 
      </div>
    </div>
  );
};

export default LandingPage;
