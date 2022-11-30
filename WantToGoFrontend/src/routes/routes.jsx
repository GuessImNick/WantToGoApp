import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { RestaurantApi } from "../api/restaurantApi";
import Navbar from "../components/navbar/Navbar";
import Favorites from "../pages/favorites/Favorites";
import Home from "../pages/home/Home";
import LandingPage from "../pages/landingPage/LandingPage";
import Notification from "../pages/notifications/Notifications";
import Restaurant from "../pages/restaurant/Restaurant";
import Search from "../pages/search/Search";

import { useAuth } from "../utils/context/authContext";

function App() {
  const [path, setPath] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [visibleRestaurants, setVisibleRestaurants] = useState([]);
  
  const navigate = useNavigate();
  const { user, userLoading, setUser } = useAuth();

  const getRestaurants = async () => {
    const restaurants = await RestaurantApi.getRestaurantList();
    setRestaurants(restaurants);
  };

  const getVisibleRestaurants = async () => {
    if (visibleRestaurants.length < restaurants.length) {
      setVisibleRestaurants(
        restaurants.slice(0, visibleRestaurants.length + 50)
      );
    } else {
      const moreRestaurants = await RestaurantApi.getRestaurantList(
        restaurants.length / 200 + 1
      );
      if (moreRestaurants) {
        setRestaurants((prev) => [...prev, ...moreRestaurants]);
      }
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  useEffect(() => {
    setVisibleRestaurants(restaurants.slice(0, visibleRestaurants.length + 50));
  }, [restaurants]);

  const changePath = (path) => {
    navigate(path);
    setPath(path);
  };

  useEffect(() => {}, []);
  if (userLoading) return <>add loader here</>;
  if (!user) return <LandingPage />;
  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={<Home changePath={changePath} visibleRestaurants={visibleRestaurants} getVisibleRestaurants={getVisibleRestaurants} />}
        />
        <Route path="/restaurant/:restaurantId" element={<Restaurant />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="*" element={<Home changePath={changePath} visibleRestaurants={visibleRestaurants} />} />
      </Routes>
      <Navbar changePath={changePath} setPath={setPath} path={path} />
    </>
  );
}

export default App;
