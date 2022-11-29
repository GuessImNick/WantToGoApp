import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { restaurantApi } from "../../api/restaurantApi";
import { FaRegMap } from "react-icons/fa";
import { RiHeart3Fill, RiHeart3Line, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import "./Restaurant.css";
import { useAuth } from "../../utils/context/authContext";
import { favoriteApi } from "../../api/favoriteApi";
import { UserApi } from "../../api/userApi";

const Restaurant = () => {
  const [restaurant, setRestaurant] = useState({});
  const [coverMap, setCoverMap] = useState(true);

  const { user, setUser } = useAuth();
  const { restaurantId } = useParams();

  useEffect(() => {
    const getRestaurant = async () => {
      const res = await restaurantApi.getRestaurantById(restaurantId);
      setRestaurant(res);
      setCoverMap(true);
      window.scrollTo(0, 0);
    };
    getRestaurant();
  }, [restaurantId]);

  const nameFormatter = (name) => {
    if (name?.length <= 40) {
      return name;
    } else {
      return name?.slice(0, 30) + "...";
    }
  };

  const addFavorite = async () => {
    await favoriteApi.createNewFavorite({
      userId: user.dbUser.id,
      restaurantId: restaurant.id,
    });
    const refreshUser = await UserApi.getUserByFirebaseId(user.fbUser.uid);
    setUser((prev) => {
      return { ...prev, dbUser: refreshUser };
    });
  };

  const deleteFavorite = async () => {
    const fav = user.dbUser.favorites.find(
      (res) => res.restaurantId === restaurant.id
    );
    await favoriteApi.deleteFavorite(fav.id);
    const refreshUser = await UserApi.getUserByFirebaseId(user.fbUser.uid);
    setUser((prev) => {
      return { ...prev, dbUser: refreshUser };
    });
  };

  const favorite = () => {
    const fav = user.dbUser.favorites.find(
      (res) => res.restaurantId === restaurant.id
    );

    if (fav) {
      return (
        <RiHeart3Fill className="card-link fav" onClick={deleteFavorite} />
      );
    } else {
      return <RiHeart3Line className="card-link" onClick={addFavorite} />;
    }
  };

  return (
    <div className="restaurant-content">
      <div className="restaurant-header">
        <div className="left-content">
          <h2>{nameFormatter(restaurant.name)}</h2>
          <p>{restaurant.categories}</p>
        </div>
        <div className="right-content">
          <ul>
            <li>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${`${restaurant.name}%2C${restaurant.city}`}`}
                target="_blank"
              >
                <FaRegMap className="card-link" />
              </a>
            </li>
            <li>{favorite()}</li>
          </ul>
        </div>
      </div>

      <div className={`mapouter ${coverMap ? "map-freeze" : ""}`}>
        <div className="gmap-canvas" >
          <iframe
            width="350"
            height="350"
            id="gmap_canvas"
            src={`https://maps.google.com/maps?q=${restaurant.name}%2C${restaurant.city}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          ></iframe>
        </div>
      </div>

      <div className={`reviews ${coverMap ? "hide" : "show"}`}>
        <div
          className="map-cover-button"
          onClick={(e) => setCoverMap((prev) => !prev)}
        >
          <p>{coverMap ? "EXPAND MAP" : "COLLAPSE MAP"}</p>
          {coverMap ? <RiArrowDownSLine className="icon-link"/> : <RiArrowDownSLine className="icon-link rotate" />}
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
