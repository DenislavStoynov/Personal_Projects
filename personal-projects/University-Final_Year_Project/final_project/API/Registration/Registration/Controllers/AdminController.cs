using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Registration.Data;
using Registration.Data.Models;
using Registration.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Registration.Controllers
{
    public class AdminDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }
    }
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly FitnessDbContext db;
        private readonly JwtService jwtService;
        private readonly CookieOptions cookieOptions;

        public AdminController(FitnessDbContext db, JwtService jwtService)
        {
            this.db = db;
            this.jwtService = jwtService;
            this.cookieOptions = new CookieOptions()
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true
            };
        }

        [HttpPost("adminRegister")]
        public string TrainerRegistration()
        {
            string email = "admin@gmail.com";
            string password = "admin";
            string username = "admin";
            var admin = new Admin(email, password, username);
            if (db.Admin.ToList().Count < 1)
            {
                db.Admin.Add(admin);
                db.SaveChanges();
                return "added";
            }
            else
            {
                return "not added";
            }
        }


        [HttpPost("adminLogin")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public IActionResult AdminLogin(AdminDTO data)
        {
            var admin = db.Admin.FirstOrDefault(x => x.Email == data.Email);
            if (!db.Admin.Any(x => data.Email == x.Email) || !db.Admin.Any(x => data.Password == x.Password))
            {
                return NotFound();
            }

            var jwt = jwtService.Generate(admin.Id);

            Response.Cookies.Append("jwt", jwt, cookieOptions);

            return Ok(new
            {
                message = "success",
                Username = admin.Username
            });
        }

        [HttpGet("admin")]
        public IActionResult GetAdmin()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = jwtService.Verify(jwt);

                int adminId = int.Parse(token.Issuer);

                var admin = db.Admin.FirstOrDefault(x => x.Id == adminId);

                return Ok(admin);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        [HttpPost("adminLogout")]
        public IActionResult AdminLogout()
        {
            Response.Cookies.Delete("jwt", cookieOptions);

            return Ok(new
            {
                message = "success"
            });
        }

        [HttpPost("deleteUser")]
        public IActionResult DeleteUser(AdminDTO data)
        {
            var user = db.Users.FirstOrDefault(x => x.Username == data.Username);
            if (user != null)
            {
                db.Users.Remove(user);
                db.SaveChanges();
            }
            return Ok();
        }

        [HttpPost("deleteTrainer")]
        public IActionResult DeleteTrainer(AdminDTO data)
        {
            var trainer = db.Trainers.FirstOrDefault(x => x.TUsername == data.Username);
            if (trainer != null)
            {
                db.Trainers.Remove(trainer);
                db.SaveChanges();
            }
            return Ok();
        }
    }
}
