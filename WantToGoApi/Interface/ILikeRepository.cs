using WantToGoApi.Models;

namespace WantToGoApi.Interface
{
    public interface ILikeRepository
    {
        List<Like> GetAll();
        List<Like> GetByReviewId(int reviewId);
        int AddLike(Like like);
        int DeleteLike(int id);
    }
}
