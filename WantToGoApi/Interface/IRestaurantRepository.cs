using WantToGoApi.Models;

namespace WantToGoApi.Interface
{
    public interface IRestaurantRepository
    {
        List<Restaurant> GetAll(int page);
        Restaurant GetById(string id);
        List<Restaurant> GetBySearchString(string searchString);
    }
}
