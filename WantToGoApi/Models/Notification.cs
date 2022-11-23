namespace WantToGoApi.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int SenderId { get; set; }
        public string Type { get; set; }
        public bool IsViewed { get; set; }
    }
}
