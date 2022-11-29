import React, { useEffect, useState } from "react";
import "./Navbar.css";
import {
  RiSearchFill,
  RiSearchLine,
  RiHome5Fill,
  RiHome5Line,
  RiHeart3Fill,
  RiHeart3Line,
} from "react-icons/ri";
import { FaBell, FaRegBell } from "react-icons/fa";
import { TfiMoreAlt, TfiMore } from "react-icons/tfi";
import { useHistory } from "react-router-dom";

const Navbar = ({changePath, path, setPath}) => {
  const history = useHistory();

  useEffect(() => {
    setPath(history.location.pathname);
  }, []);

  return (
    <nav>
      <ul>
        <li onClick={() => changePath("/")}>
          {path === "/" ? (
            <RiHome5Fill className="nav-icon" />
          ) : (
            <RiHome5Line className="nav-icon" />
          )}
        </li>
        <li onClick={() => changePath("/search")}>
          {path === "/search" ? (
            <RiSearchFill className="nav-icon" />
          ) : (
            <RiSearchLine className="nav-icon" />
          )}
        </li>
        <li onClick={() => changePath("/favorites")}>
          {path === "/favorites" ? (
            <RiHeart3Fill className="nav-icon" />
          ) : (
            <RiHeart3Line className="nav-icon" />
          )}
        </li>
        <li onClick={() => changePath("/notifications")}>
          {path === "/notifications" ? (
            <FaBell className="nav-icon" />
          ) : (
            <FaRegBell className="nav-icon" />
          )}
        </li>
        <li onClick={() => changePath("/more")}>
          {path === "/more" ? (
            <TfiMoreAlt className="nav-icon" />
          ) : (
            <TfiMore className="nav-icon" />
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
