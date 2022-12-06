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
    public class LikeController : ControllerBase
    {
        private ILikeRepository _likeRepo;

        public LikeController(ILikeRepository likeRepo)
        {
            _likeRepo = likeRepo;
        }

        // GET: api/<LikeController>
        [HttpGet]
        public IActionResult GetAll()
        {
            List<Like> likes = _likeRepo.GetAll();
            if(likes == null)
            {
                return NotFound();
            }
            return Ok(likes);
        }

        // GET api/<LikeController>/review/5
        [HttpGet("review/{id}")]
        public IActionResult Get(int id)
        {
            List<Like> likes = _likeRepo.GetByReviewId(id);
            if (likes == null)
            {
                return NotFound();
            }
            return Ok(likes);
        }

        // POST api/<LikeController>
        [HttpPost]
        public IActionResult Post([FromBody] Like like)
        {   
            int id = _likeRepo.AddLike(like);
            if(id == 0)
            {
                return NotFound();
            }
            return Ok("Like Created");
        }

        // DELETE api/<LikeController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            int res = _likeRepo.DeleteLike(id);
            if(res == 0)
            {
                return NotFound();
            }
            return Ok("Like Deleted");
        }
    }
}
