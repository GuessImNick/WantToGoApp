using WantToGoApi.Models;

namespace WantToGoApi.Interface
{
    public interface IRestaurantRepository
    {
        List<Restaurant> GetAll();
        Restaurant GetById(string id);
    }
}
