export const NotificationApi = {
    sendNotification: async (notification) => {
        await fetch("https://localhost:7158/api/Notification", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(notification),
    });
    }, 

    updateNotification: async (notification) => {
        await fetch(`https://localhost:7158/api/Notification/${notification.id}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(notification),
          });
    },

    deleteNotification: async (notificationId) => {
        await fetch(`https://localhost:7158/api/Notification/${notificationId}`, {
      method: "DELETE",
    });
    }
}