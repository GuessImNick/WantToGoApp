namespace WantToGoApi.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string RestaurantId { get; set; }
        public string ReviewText { get; set; }
    }
}
