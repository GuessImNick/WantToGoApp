import React from "react";
import { useAuth } from "../../utils/context/authContext";
import "./Home.css";
import LandingPage from "./views/landingPage/LandingPage";
import { signOut } from "../../utils/auth";

const Home = () => {
  const { user, userLoading, setUser } = useAuth();

  return <div className="container">{user ? <button onClick={signOut}>Sign out</button> : <LandingPage />}</div>;
};

export default Home;
