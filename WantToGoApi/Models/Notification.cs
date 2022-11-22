namespace WantToGoApi.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public int userId { get; set; }
        public int senderId { get; set; }
        public string Type { get; set; }
        public bool isViewed { get; set; }
    }
}
