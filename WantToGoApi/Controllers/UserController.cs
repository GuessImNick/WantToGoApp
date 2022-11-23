using Microsoft.AspNetCore.Mvc;
using WantToGoApi.Interface;
using WantToGoApi.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WantToGoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserRepository _userRepo;

        public UserController(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        // GET: api/User
        // GET a list of all users
        [HttpGet]
        public IActionResult Get()
        {
            List<User> users = _userRepo.GetAllUsers();

            if (users == null)
            {
                return NotFound();
            }
            return Ok(_userRepo.GetAllUsers());
        }

        // GET api/User/{id}
        // GET a user by id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            User user = _userRepo.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // GET api/User/firebase/{id}
        // GET a user by firebaseUid
        [HttpGet("firebase/{firebaseUid}")]
        public IActionResult Get(string firebaseUid)
        {
            User user = _userRepo.GetUserByFirebaseId(firebaseUid);
            if(user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // POST api/User
        // POST a new user to the db
        [HttpPost]
        public IActionResult Post([FromBody] User user)
        {
            int userId = _userRepo.AddUser(user);
            if(userId == 0)
            {
                return NotFound();
            }
            return Ok("User Created");
        }

        // PUT api/User/{id}
        // PUT an updated user into the db
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] User user)
        {
            int res = _userRepo.UpdateUser(id, user);
            if(res == 0)
            {
                return NotFound();
            }
            return Ok("User Updated");
        }


    }
}
