using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Registration.Data;
using Registration.Data.Models;
using Registration.Hubs;
using Registration.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Registration.Controllers
{
    public class DTO
    {
        public int id { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string username { get; set; }
        public string q1 { get; set; }
        public string q2 { get; set; }
        public string q3 { get; set; }
        public List<string> users {get; set;} = new();
    }

    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly FitnessDbContext db;
        private readonly JwtService jwtService;
        private readonly Microsoft.AspNetCore.SignalR.IHubContext<ChatHub> context;
        byte[] salt = new byte[128 / 8];
        private bool exist;
        private readonly CookieOptions cookieOptions;

        public RegistrationController(FitnessDbContext db, JwtService jwtService, IHubContext<ChatHub> context)
        {
            this.db = db;
            this.jwtService = jwtService;
            this.context = context;
            this.cookieOptions = new CookieOptions()
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true
            };
        }
        [HttpPost]

        public List<User> Registration(DTO data)
        {
            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: data.password,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256 / 8));
            var user = new User(data.email, hashedPassword, data.username, data.q1, data.q2, data.q3);
            var progress = new Progress()
            {
                UserId = user.Id,
                Workouts = 0,
                Tasks = 0,
                Nutrition = 0
            };
            user.Progress = progress;
            if (db.Users.ToList().Count == 0) {
                db.Users.Add(user);
                db.SaveChanges();
            } else if(db.Users.ToList().Count > 0)
            {
                for(int i = 0; i < db.Users.ToList().Count; i++)
                {
                    if(data.email == db.Users.ToList()[i].Email || data.username == db.Users.ToList()[i].Username)
                    {
                        exist = true;
                        break;
                    } else if(data.email != db.Users.ToList()[i].Email || data.username != db.Users.ToList()[i].Username)
                    {
                        exist = false;
                    }
                }
                if(exist == false)
                {
                    db.Users.Add(user);
                    db.SaveChanges();
                }
            }
            return db.Users.ToList();
        }

        [HttpPost("login")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public IActionResult Login(DTO data)
        {
            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: data.password,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256 / 8));

            var user = db.Users.FirstOrDefault(x => x.Email == data.email);
            //var user2 = db.Users.Where(u => u.Email == data.email).FirstOrDefault();
            //var userId = db.Users.Where(u => u.Email == data.email).Select(x => x.Id).FirstOrDefault();
            //var userId2 = db.Users.FirstOrDefault(x => x.Email == data.email).Id;
            if(!db.Users.Any(x => data.email == x.Email) || !db.Users.Any(x => hashedPassword == x.Password || data.password == x.Password))
            {
              return NotFound();
            }

            var jwt = jwtService.Generate(user.Id);

            Response.Cookies.Append("jwt", jwt, cookieOptions);

            return Ok(new
            {
                message = "success",
                Username = user.Username,
                Question = user.Q1
            });
        }

        [HttpGet("user")]
        public IActionResult GetUser()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = jwtService.Verify(jwt);

                int userId = int.Parse(token.Issuer);

                var user = db.Users.FirstOrDefault(x => x.Id == userId);

                return Ok(user);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt", cookieOptions);

            return Ok(new
            {
                message = "success"
            });
        }

        [HttpPost("getUsersGoals")]
        public List<string> GetUsersGoals(DTO data)
        {
            var goals = new List<string>();
            for (int i = 0; i < data.users.ToList().Count; i++)
            {
                var answer = db.Users.FirstOrDefault(x => x.Username == data.users[i]).Q3;
                goals.Add(answer);
            }
            return goals;
        }

        [HttpGet("users")]

        public List<User> GetListValues()
        {
            return db.Users.ToList();
        }
    }
}
