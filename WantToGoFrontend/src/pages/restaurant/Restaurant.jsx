import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RestaurantApi } from "../../api/restaurantApi";
import { FaRegMap, FaRegPaperPlane, FaRegCommentDots } from "react-icons/fa";
import { RiHeart3Fill, RiHeart3Line, RiArrowDownSLine, RiArrowLeftSLine } from "react-icons/ri";
import "./Restaurant.css";
import { useAuth } from "../../utils/context/authContext";
import { FavoriteApi } from "../../api/favoriteApi";
import { UserApi } from "../../api/userApi";
import ReviewCard from "./components/reviewCard/ReviewCard";
import { ReviewApi } from "../../api/reviewApi";

const Restaurant = () => {
  const [restaurant, setRestaurant] = useState({});
  const [coverMap, setCoverMap] = useState(true);
  const [reviewText, setReviewText] = useState("");
  const [reviewError, setReviewError] = useState(false);

  const { user, setUser } = useAuth();
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getRestaurant = async () => {
      const res = await RestaurantApi.getRestaurantById(restaurantId);
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
    await FavoriteApi.createNewFavorite({
      userId: user.dbUser.id,
      restaurantId: restaurant.id,
    }, user.fbUser.ya);
    const refreshUser = await UserApi.getUserByFirebaseId(user.fbUser.uid, user.fbUser.ya);
    setUser((prev) => {
      return { ...prev, dbUser: refreshUser };
    });
  };

  const deleteFavorite = async () => {
    const fav = user.dbUser.favorites.find(
      (res) => res.restaurantId === restaurant.id
    );
    await FavoriteApi.deleteFavorite(fav.id, user.fbUser.ya);
    const refreshUser = await UserApi.getUserByFirebaseId(user.fbUser.uid, user.fbUser.ya);
    setUser((prev) => {
      return { ...prev, dbUser: refreshUser };
    });
  };

  const addReview = async () => {
    if (reviewText.length > 20) {
      const date = new Date();
      await ReviewApi.addReview({
        userId: user.dbUser.id,
        restaurantId: restaurant.id,
        reviewText,
        reviewDate: date.toISOString().slice(0, 19),
      }, user.fbUser.ya);
      const res = await RestaurantApi.getRestaurantById(restaurant.id);
      setRestaurant((prev) => {
        return { ...prev, reviews: res.reviews };
      });
      setReviewText("");
      setReviewError(false);
    } else {
      setReviewError(true);
    }
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
          
          <h2><RiArrowLeftSLine className="icon" onClick={() => navigate(-1)}/>{nameFormatter(restaurant.name)}</h2>
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
        <div className="gmap-canvas">
          <iframe
            width="350"
            height="350"
            id="gmap_canvas"
            src={`https://maps.google.com/maps?q=${restaurant.name}%2C${restaurant.city}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          ></iframe>
        </div>
      </div>

      <div className={`review-content ${coverMap ? "hide" : "show"}`}>
        <div
          className="map-cover-button"
          onClick={(e) => setCoverMap((prev) => !prev)}
        >
          <p>{coverMap ? "EXPAND MAP" : "COLLAPSE MAP"}</p>
          {coverMap ? (
            <RiArrowDownSLine className="icon-link" />
          ) : (
            <RiArrowDownSLine className="icon-link rotate" />
          )}
        </div>
        <div className="review-header">
          <p>REVIEWS</p>
        </div>
        <div className="reviews">
          {restaurant.reviews?.length > 0 ? (
            restaurant.reviews?.map((review) => (
              <ReviewCard
                review={review}
                key={review.id}
                setRestaurant={setRestaurant}
              />
            ))
          ) : (
            <div className="no-reviews">
              <div className="no-review-content">
                <FaRegCommentDots className="no-review-icon" />
                <h2>Be The First To Review This Location</h2>
              </div>
            </div>
          )}
        </div>
        <div className="review-input">
          <input
            type="text"
            placeholder="Enter Your Review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <FaRegPaperPlane className="send-icon" onClick={addReview} />
          <p className={`length-check ${reviewError ? 'show' : null}`}>Review must be at least 20 characters long</p>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
