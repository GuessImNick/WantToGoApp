import React from "react";
import "./RestaurantCard.css";
import { FaRegMap, FaRegCommentDots } from "react-icons/fa";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { useAuth } from "../../utils/context/authContext";
import { favoriteApi } from "../../api/favoriteApi";
import { UserApi } from "../../api/userApi";
import { useHistory } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  const { user, setUser } = useAuth();
  const history = useHistory();

  const categoreyFormatter = (category) => {
    if (category.length <= 40) {
      return category;
    } else {
      return category.slice(0, 40) + "...";
    }
  };

  const addFavorite = async () => {
      await favoriteApi.createNewFavorite({
      userId: user.dbUser.id,
      restaurantId: restaurant.id,
    });
    const refreshUser = await UserApi.getUserByFirebaseId(user.fbUser.uid);
    console.log(refreshUser);
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
    console.log(fav);
    setUser((prev) => {
      return { ...prev, dbUser: refreshUser };
    });
  };

  const favorite = () => {
    const fav = user.dbUser.favorites.find(
      (res) => res.restaurantId === restaurant.id
    );

    if (fav) {
      return <RiHeart3Fill className="card-link fav" onClick={deleteFavorite}/>;
    } else {
      return <RiHeart3Line className="card-link" onClick={addFavorite} />;
    }
  };

  return (
    <div className="card" >
      <div className="card-header">
        <h2>{restaurant.name}</h2>
        <p>{categoreyFormatter(restaurant.categories)}</p>
      </div>
      <div className="card-body">
        <div className="address">
          <p>{restaurant.address}</p>
          <br />
          <p>
            {restaurant.city}, {restaurant.state} {restaurant.zip}
          </p>
        </div>
        <div className="links">
          <ul>
            <li>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${`${restaurant.name}`}`}
                target="_blank"
              >
                <FaRegMap className="card-link" />
              </a>
            </li>
            {/* <li>
              <FaRegCommentDots className="card-link" />
            </li> */}
            <li>{favorite()}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
