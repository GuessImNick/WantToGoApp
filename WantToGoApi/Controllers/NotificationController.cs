using FirebaseAdmin.Messaging;
using Microsoft.AspNetCore.Mvc;
using WantToGoApi.Interface;
using WantToGoApi.Models;
using Notification = WantToGoApi.Models.Notification;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WantToGoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private INotificationRepository _notificationRepo;

        public NotificationController(INotificationRepository notificationRepo)
        {
            _notificationRepo = notificationRepo;
        }

        // GET: api/<NotificationController>
        [HttpGet]
        public IActionResult Get()
        {
            List<Notification> notifications = _notificationRepo.GetAll();
            if(notifications == null)
            {
                return NotFound();
            }
            return Ok(notifications);
        }

        // GET api/<NotificationController>/5
        [HttpGet("user/{id}")]
        public IActionResult Get(int id)
        {
            List<Notification> notifications = _notificationRepo.GetByUserId(id);
            if (notifications == null)
            {
                return NotFound();
            }
            return Ok(notifications);
        }

        // POST api/<NotificationController>
        [HttpPost]
        public IActionResult Post([FromBody] Notification notification)
        {
            int id = _notificationRepo.AddNotification(notification);
            if(id == 0)
            {
                return NotFound();
            }
            return Ok("Notification Created");
        }

        // PUT api/<NotificationController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Notification notification)
        {
            int res = _notificationRepo.UpdateNotification(id, notification);
            if (res == 0)
            {
                return NotFound();
            }
            return Ok("Notification Updated");
        }

        // DELETE api/<NotificationController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            int res = _notificationRepo.DeleteNotification(id);
            if (res == 0)
            {
                return NotFound();
            }
            return Ok("Notification Deleted");
        }
    }
}
