using WantToGoApi.Models;

namespace WantToGoApi.Interface
{
    public interface INotificationRepository
    {
        List<Notification> GetAll();
        List<Notification> GetByUserId(int userId);
        int AddNotification(Notification notification);
        int UpdateNotification(int id, Notification notification);
        int DeleteNotification(int id);
    }
}
