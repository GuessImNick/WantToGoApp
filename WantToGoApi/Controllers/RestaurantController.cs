using Microsoft.AspNetCore.Mvc;
using WantToGoApi.Interface;
using WantToGoApi.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WantToGoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantController : ControllerBase
    {
        private IRestaurantRepository _restaurantRepo;

        public RestaurantController(IRestaurantRepository restaurantRepo)
        {
            _restaurantRepo = restaurantRepo;
        }
        // GET: api/<RestaurantController>
        // RETURN: A paginated list of restaurants
        // TODO: Add pagination logic
        [HttpGet]
        public IActionResult GetAll()
        {
            List<Restaurant> restaurants = _restaurantRepo.GetAll();
            if(restaurants == null)
            {
                return NotFound();
            }
            return Ok(restaurants);
        }

        // GET api/<RestaurantController>/5
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            Restaurant restaurant = _restaurantRepo.GetById(id);
            if(restaurant == null)
            {
                return NotFound();
            }
            return Ok(restaurant);
        }

    }
}
