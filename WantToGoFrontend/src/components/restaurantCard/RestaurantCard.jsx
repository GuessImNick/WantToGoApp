import React from "react";
import "./RestaurantCard.css";
import { FaRegMap, FaRegCommentDots } from "react-icons/fa";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { useAuth } from "../../utils/context/authContext";
import { FavoriteApi } from "../../api/favoriteApi";
import { UserApi } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const categoreyFormatter = (category) => {
    if (category.length <= 40) {
      return category;
    } else {
      return category.slice(0, 40) + "...";
    }
  };

  const nameFormatter = (name) => {
    if (name.length <= 40) {
      return name;
    } else {
      return name.slice(0, 30) + "...";
    }
  };

  const addFavorite = async () => {
    await FavoriteApi.createNewFavorite({
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
    await FavoriteApi.deleteFavorite(fav.id);
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
        <RiHeart3Fill
          className="card-link fav"
          onClick={(e) => {
            e.stopPropagation();
            deleteFavorite(e);
          }}
        />
      );
    } else {
      return (
        <RiHeart3Line
          className="card-link"
          onClick={(e) => {
            e.stopPropagation();
            addFavorite(e);
          }}
        />
      );
    }
  };

  return (
    <div
      className="card"
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
    >
      <div className="card-header">
        <h2>{nameFormatter(restaurant.name)}</h2>
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
                href={`https://www.google.com/maps/search/?api=1&query=${`${restaurant.name}%2C${restaurant.city}`}`}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
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
