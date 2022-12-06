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
    public class ReviewController : ControllerBase
    {
        private IReviewRepository _reviewRepo;

        public ReviewController(IReviewRepository reviewRepo)
        {
            _reviewRepo = reviewRepo;
        }

        // GET: api/Review
        // RETURNS: a list of all reviews
        [HttpGet]
        public IActionResult GetAllReviews()
        {
            List<Review> reviews = _reviewRepo.GetAllReviews();
            if(reviews == null)
            {
                return NotFound();
            }
            return Ok(reviews);
        }

        // GET api/Review/{id}
        // RETURN: a review by id
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            Review review = _reviewRepo.GetReviewById(id);
            if(review == null)
            {
                return NotFound();
            }
            return Ok(review);
        }

        // GET api/Review/restautant/{id}
        // RETURN: a review by restaurantId
        [HttpGet("restaurant/{restaurantId}")]
        public IActionResult GetByRestaurantId(string restaurantId)
        {
            List<Review> reviews = _reviewRepo.GetReviewsByRestaurantId(restaurantId);
            if (reviews == null)
            {
                return NotFound();
            }
            return Ok(reviews);
        }

        // POST api/Review
        // POST a new review to the db
        [HttpPost]
        public IActionResult Post([FromBody] Review review)
        {
            int reviewId = _reviewRepo.AddReview(review);
            if(reviewId == 0)
            {
                return NotFound();
            }
            return Ok("Review Created");
        }

        // PUT api/Review/{id}
        // PUT an updated user into the db
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Review review)
        {
            int res = _reviewRepo.UpdateReview(id, review);
            if (res == 0)
            {
                return NotFound();
            }
            return Ok("Review Updated");
        }

        // DELETE api/Review
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            int res = _reviewRepo.DeleteReview(id);
            if(res == 0)
            {
                return NotFound();
            }
            return Ok("Review Deleted");
        }
    }
}
