import React from "react";
import { useAuth } from "../../utils/context/authContext";
import NotificationCard from "./components/notificationCard/NotificationCard";
import { RiNotificationOffLine } from "react-icons/ri";
import "./Notifications.css";

const Notifications = () => {
  const { user } = useAuth();

  return (
    <div className="notificaions-contaienr">
      <div className="notifications-header">
        <h2>NOTIFICATIONS</h2>
      </div>
      <div className="notifications">
        {user.dbUser.notifications?.length > 0 ? user.dbUser.notifications
          .sort((a, b) => a.isViewed - b.isViewed)
          .map((notif) => (
            <NotificationCard notification={notif} key={notif.id} />
          )) : <div className="no-notifications"><RiNotificationOffLine className="no-notifcation-icon"/><p>You have no notifications</p></div>}
      </div>
    </div>
  );
};

export default Notifications;
