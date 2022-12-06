export const NotificationApi = {
    sendNotification: async (notification, token) => {
        await fetch("https://localhost:7158/api/Notification", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(notification),
    });
    }, 

    updateNotification: async (notification, token) => {
        await fetch(`https://localhost:7158/api/Notification/${notification.id}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(notification),
          });
    },

    deleteNotification: async (notificationId, token) => {
        await fetch(`https://localhost:7158/api/Notification/${notificationId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    }
}