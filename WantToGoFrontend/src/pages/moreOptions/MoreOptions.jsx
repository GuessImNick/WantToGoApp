import React from "react";
import "./MoreOptions.css";
import { signOut } from "../../utils/auth";
import {
  RiHeart3Line,
  RiLogoutBoxLine,
  RiSettings4Line,
  RiQuestionLine,
} from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import Header from "./components/header/Header";
import { useAuth } from "../../utils/context/authContext";

const MoreOptions = ({ changePath }) => {
  const { user } = useAuth();
  return (
    <div className="options-container">
      <Header user={user.dbUser} />
      <div className="options-content">
        <div className="options options-account">
          <div className="title">ACCOUNT</div>
          <ul>
            <li onClick={() => changePath("/favorites")}>
              <RiHeart3Line className="options-icon" />
              MY FAVORITES
            </li>
            <li className="hide-option">
              <FaRegEdit className="options-icon" />
              MY DETAILS
            </li>
            <li className="hide-option">
              <RiSettings4Line className="options-icon" />
              SETTINGS
            </li>
            <li onClick={signOut}>
              <RiLogoutBoxLine className="options-icon" />
              SIGNOUT
            </li>
          </ul>
        </div>
        <div className="options options-support">
          <div className="title">SUPPORT</div>
          <ul>
            <a
              href="https://www.healthywa.wa.gov.au/Articles/N_R/Problem-solving"
              target="_blank"
            >
              <li>
                <RiQuestionLine className="options-icon" />
                IIHBIWTG SUPPORT
              </li>
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MoreOptions;
