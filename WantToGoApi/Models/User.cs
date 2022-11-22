namespace WantToGoApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirebaseUid { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Dob { get; set; }
        public bool IsAdmin { get; set; }

        public List<Favorite> Favorites { get; set; }
        public List<Notification> Notifications { get; set; }
    }
}
