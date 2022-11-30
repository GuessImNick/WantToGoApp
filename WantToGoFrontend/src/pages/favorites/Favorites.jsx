import React, { useEffect, useState } from "react";
import { RestaurantApi } from "../../api/restaurantApi";
import RestaurantCard from "../../components/restaurantCard/RestaurantCard";
import { RiHeartAddLine } from "react-icons/ri";
import { useAuth } from "../../utils/context/authContext";
import "./Favorites.css";

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const getFavorites = async () => {
      const promises = [];
      for (const fav of user.dbUser.favorites) {
        promises.push(RestaurantApi.getRestaurantById(fav.restaurantId));
      }

      if (promises.length > 0) {
        const faves = await Promise.all(promises);
        setFavorites(faves);
      }
    };

    getFavorites();
  });
  return (
    <div className="favorite-container">
      <div className="favorite-header">
        <h2>FAVORITE PLACES</h2>
      </div>
      <div className="favorites">
        {favorites.length > 0 ? (
          favorites.map((fave) => (
            <RestaurantCard restaurant={fave} key={fave.id} />
          ))
        ) : (
          <div className="no-notifications">
            <RiHeartAddLine className="no-notifcation-icon" />
            <p>When you add places to your favorites you can view them here!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
