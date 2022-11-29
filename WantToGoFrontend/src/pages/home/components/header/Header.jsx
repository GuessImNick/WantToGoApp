import React from "react";
import "./Header.css";
import { RiSearchLine } from "react-icons/ri";

const Header = ({ user, changePath }) => {
  return <header className="home-header">
    <div className="welcome-name">
        <div className="initials"><p>{user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()}</p></div>
        <h2>HI, {user.firstName.toUpperCase()}</h2>
    </div>
    <div className="search-icon" onClick={() => changePath("/search")}><RiSearchLine className="icon"/></div>
  </header>;
};

export default Header;
