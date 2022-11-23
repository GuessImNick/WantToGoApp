using WantToGoApi.Models;

namespace WantToGoApi.Interface
{
    public interface IFavoriteRepository
    {
        List<Favorite> GetAllFavorites();
        List<Favorite> GetFavoritesByUserId(int userId);
        int AddFavorite(Favorite favorite);
        int DeleteFavorite(int id);

    }
}
