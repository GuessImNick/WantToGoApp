import React, { useEffect, useState } from "react";
import { NotificationApi } from "../../../../api/notificationApi";
import { RiCloseLine } from "react-icons/ri";
import { UserApi } from "../../../../api/userApi";
import "./NotificationCard.css";
import { useAuth } from "../../../../utils/context/authContext";

const NotificationCard = ({ notification }) => {
  const [sender, setSender] = useState();
  const { user, userLoading, setUser } = useAuth();

  useEffect(() => {
    const getUserInfo = async (id) => {
      const user = await UserApi.getUserById(id);
      setSender(user);
    };
    getUserInfo(notification.senderId);
    NotificationApi.updateNotification({...notification, isViewed: true})
  }, []);

  const deleteNotification = async () => {
    await NotificationApi.deleteNotification(notification.id);
    const refreshUser = await UserApi.getUserByFirebaseId(user.fbUser.uid);
    setUser((prev) => {
      return { ...prev, dbUser: refreshUser };
    });
  }

  const formatType = (type) => {
    let result;
    switch (type) {
      case "like":
        result = "Like";
        break;
      default:
        result = "Unknown";
        break;
    }
    return result;
  };

  const formatMessage = () => {
    if (sender) {
      const firstName =
        sender.firstName[0]?.toUpperCase() + sender.firstName?.substring(1);
      const lastName =
        sender.lastName[0]?.toUpperCase() + sender.lastName?.substring(1);

      return `${firstName} ${lastName} liked one of your reviews!`;
    }
  };

  return (
    <div
      className={`notification-card ${
        notification.isViewed ? "read" : "unread"
      }`}
    >
      <h4 className="type">{formatType(notification.type)}<RiCloseLine className="delete-icon" onClick={() => deleteNotification()}/></h4>
      <p className="message">{formatMessage()}</p>
    </div>
  );
};

export default NotificationCard;
