using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WantToGoApi.Interface;
using WantToGoApi.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WantToGoApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        private IFavoriteRepository _favoriteRepo;

        public FavoriteController(IFavoriteRepository favoriteRepo)
        {
            _favoriteRepo = favoriteRepo;
        }
        // GET: api/<FavoriteController>
        [HttpGet]
        public IActionResult GetAll()
        {
            List<Favorite> favorites = _favoriteRepo.GetAllFavorites();
            if(favorites == null)
            {
                return NotFound();
            }
            return Ok(favorites);
        }

        // GET api/<FavoriteController>/5
        [HttpGet("{id}")]
        public IActionResult GetByUserId(int id)
        {
            List<Favorite> favorites = _favoriteRepo.GetFavoritesByUserId(id);
            if (favorites == null)
            {
                return NotFound();
            }
            return Ok(favorites);
        }

        // POST api/<FavoriteController>
        [HttpPost]
        public IActionResult Post([FromBody] Favorite favorite)
        {
            int id = _favoriteRepo.AddFavorite(favorite);
            if(id == 0)
            {
                return NotFound();
            }
            return Ok("Favorite Created");
        }

        // DELETE api/<FavoriteController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            int res = _favoriteRepo.DeleteFavorite(id);
            if(res == 0)
            {
                return NotFound();
            }
            return Ok("Favorite Deleted");
        }
    }
}
