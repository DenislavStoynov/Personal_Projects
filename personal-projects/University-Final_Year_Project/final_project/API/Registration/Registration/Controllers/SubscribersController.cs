using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Registration.Data;
using Registration.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Registration.Controllers
{
    public class SubscribersDTO
    {
        public string Email { get; set; }
    }
    [Route("api/[controller]")]
    [ApiController]
    public class SubscribersController : ControllerBase
    {
        private readonly FitnessDbContext db;

        public SubscribersController(FitnessDbContext db)
        {
            this.db = db;
        }

        [HttpPost("addSubscribers")]
        public IActionResult Subscribers(SubscribersDTO data)
        {
            if (!db.Subscribers.Any(x => x.Email.Contains(data.Email)))
            {
                var subscriber = new Subscriber(data.Email);
                db.Subscribers.Add(subscriber);
                db.SaveChanges();
            }
            return Ok();
        }

        [HttpGet("getSubscribers")]
        public List<Subscriber> GetSubscribers()
        {
            return db.Subscribers.ToList();
        }
    }
}
