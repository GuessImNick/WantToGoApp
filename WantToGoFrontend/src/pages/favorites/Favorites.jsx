import React, { useEffect, useState } from "react";
import { RestaurantApi } from "../../api/restaurantApi";
import RestaurantCard from "../../components/restaurantCard/RestaurantCard";
import { useAuth } from "../../utils/context/authContext";
import "./Favorites.css";

const Favorites = () => {
  const { user, setUser } = useAuth();
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const getFavorites = async () => {
        const promises = [];
        for(const fav of user.dbUser.favorites) {
            promises.push(RestaurantApi.getRestaurantById(fav.restaurantId));
        }

        const faves = await Promise.all(promises);
        setFavorites(faves);
        
    }

    getFavorites()
  });
  return (
    <div className="favorite-container">
      <div className="favorite-header">
        <h2>FAVORITE PLACES</h2>
      </div>
      <div className="favorites">
        {favorites.map((fave) => <RestaurantCard restaurant={fave} key={fave.id} />)}
      </div>
    </div>
  );
};

export default Favorites;
