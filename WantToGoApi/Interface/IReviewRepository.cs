using WantToGoApi.Models;

namespace WantToGoApi.Interface
{
    public interface IReviewRepository
    {
        List<Review> GetAllReviews();
        Review GetReviewById(int id);
        Review GetReviewByRestaurantId(string restaurantId);
        int AddReview(Review review);
        int UpdateReview(int id, Review review);
        int DeleteReview(int id);
    }
}
