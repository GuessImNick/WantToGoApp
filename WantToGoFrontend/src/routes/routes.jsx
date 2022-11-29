import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { restaurantApi } from "../api/restaurantApi";
import Navbar from "../components/navbar/Navbar";
import Home from "../pages/home/Home";
import LandingPage from "../pages/landingPage/LandingPage";
import Restaurant from "../pages/restaurant/Restaurant";

import { useAuth } from "../utils/context/authContext";

function App() {
  const [path, setPath] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [visibleRestaurants, setVisibleRestaurants] = useState([]);

  const { user, userLoading, setUser } = useAuth();
  const history = useHistory();

  const getRestaurants = async () => {
    const restaurants = await restaurantApi.getRestaurantList();
    setRestaurants(restaurants);
  };

  const getVisibleRestaurants = async () => {
    if (visibleRestaurants.length < restaurants.length) {
      setVisibleRestaurants(
        restaurants.slice(0, visibleRestaurants.length + 50)
      );
    } else {
      const moreRestaurants = await restaurantApi.getRestaurantList(
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
    history.push(path);
    setPath(path);
  };

  useEffect(() => {}, []);
  if (userLoading) return <>add loader here</>;
  if (!user) return <LandingPage />;
  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          component={() => <Home changePath={changePath} visibleRestaurants={visibleRestaurants} getVisibleRestaurants={getVisibleRestaurants} />}
        />
        <Route exact path="/restaurant/:restaurantId(\d+)" component={() => <Restaurant />} />
        <Route path="*" component={() => <Home changePath={changePath} visibleRestaurants={visibleRestaurants} />} />
      </Switch>
      <Navbar changePath={changePath} setPath={setPath} path={path} />
    </>
  );
}

export default App;
