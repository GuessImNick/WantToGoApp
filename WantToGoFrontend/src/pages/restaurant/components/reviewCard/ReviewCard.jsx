import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../utils/context/authContext";
import "./ReviewCard.css";
import {
  FaThumbsUp,
  FaRegThumbsUp,
  FaRegEdit,
  FaRegTrashAlt,
  FaRegCheckCircle,
} from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";
import { UserApi } from "../../../../api/userApi";
import { LikeApi } from "../../../../api/likeApi";
import { RestaurantApi } from "../../../../api/restaurantApi";
import { ReviewApi } from "../../../../api/reviewApi";
import { NotificationApi } from "../../../../api/notificationApi";

const ReviewCard = ({ review, setRestaurant }) => {
  const { user } = useAuth();
  const [reviewer, setReviewer] = useState({});
  const [inUpdate, setInUpdate] = useState(false);
  const [updateText, setUpdateText] = useState("");

  useEffect(() => {
    const getUserInfo = async (id) => {
      const _user = await UserApi.getUserById(id, user.fbUser.ya);
      setReviewer(_user);
    };
    setUpdateText(review.reviewText);
    if (user.dbUser.id === review.userId) {
      setReviewer(user.dbUser);
    } else {
      getUserInfo(review.userId);
    }
  }, []);

  const addLike = async () => {
    await LikeApi.addLike({ userId: user.dbUser.id, reviewId: review.id }, user.fbUser.ya);
    const res = await RestaurantApi.getRestaurantById(review.restaurantId);
    await NotificationApi.sendNotification({
      userId: review.userId,
      senderId: user.dbUser.id,
      type: "like",
      isViewed: false,
    }, user.fbUser.ya);
    setRestaurant((prev) => {
      return { ...prev, reviews: res.reviews };
    });
  };

  const deleteLike = async () => {
    const likeToDelete = review.likes.find(
      (like) => like.userId === user.dbUser.id
    );
    await LikeApi.deleteLike(likeToDelete.id, user.fbUser.ya);
    const res = await RestaurantApi.getRestaurantById(review.restaurantId);
    setRestaurant((prev) => {
      return { ...prev, reviews: res.reviews };
    });
  };

  const updateReview = async () => {
    const date = new Date();
    await ReviewApi.updateReview(
      {
        ...review,
        reviewText: updateText,
        reviewDate: date.toISOString().slice(0, 19),
      },
      user.fbUser.ya
    );
    setInUpdate(false);
    const res = await RestaurantApi.getRestaurantById(review.restaurantId);
    setRestaurant((prev) => {
      return { ...prev, reviews: res.reviews };
    });
  };

  const deleteReview = async () => {
    await ReviewApi.deleteReview(review.id, user.fbUser.ya);
    const res = await RestaurantApi.getRestaurantById(review.restaurantId);
    setRestaurant((prev) => {
      return { ...prev, reviews: res.reviews };
    });
  };

  const userReview = () => {
    if (user.dbUser.id === review.userId) {
      return (
        <>
          <FaRegEdit
            className="review-icon"
            onClick={() => setInUpdate(true)}
          />
          <FaRegTrashAlt className="review-icon" onClick={deleteReview} />
        </>
      );
    } else {
      if (review.likes.find((like) => like.userId === user.dbUser.id)) {
        return <FaThumbsUp className="review-icon" onClick={deleteLike} />;
      } else {
        return <FaRegThumbsUp className="review-icon" onClick={addLike} />;
      }
    }
  };

  const updateIcons = (
    <>
      <FaRegCheckCircle className="review-icon" onClick={updateReview} />
      <RiCloseLine
        className="review-icon"
        onClick={() => {
          setInUpdate(false);
          setUpdateText(review.reviewText);
        }}
      />
    </>
  );

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="review-card">
      <div className="left-content">
        <p className="user">{reviewer?.firstName}</p>
        <p className="review-text">
          {inUpdate ? (
            <textarea
              type="text"
              value={updateText}
              onChange={(e) => setUpdateText(e.target.value)}
            />
          ) : (
            review.reviewText
          )}
        </p>
      </div>
      <div className="right-content">
        <p className="review-date">{formatDate(review.reviewDate)}</p>
        <div className="like">{inUpdate ? updateIcons : userReview()}</div>
      </div>
    </div>
  );
};

export default ReviewCard;
