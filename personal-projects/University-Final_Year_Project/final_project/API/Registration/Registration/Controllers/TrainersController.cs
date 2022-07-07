using Microsoft.AspNetCore.Cryptography.KeyDerivation;
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
    public class DTOTrainers
    {
        public int Id { get; set; }
        public string trainerEmail { get; set; }
        public string trainerPassword { get; set; }
        public string trainerUsername { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class TrainersController : ControllerBase
    {
        private readonly FitnessDbContext db;
        private readonly JwtService jwtService;
        private readonly CookieOptions cookieOptions;
        byte[] salt = new byte[128 / 8];
        private bool exist;

        public TrainersController(FitnessDbContext db, JwtService jwtService)
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

        [HttpPost("trainerRegister")]
        public string TrainerRegistration(DTOTrainers data)
        {
            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: data.trainerPassword,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256 / 8));
            var trainer = new Trainer(data.trainerEmail, hashedPassword, data.trainerUsername);
            if (db.Trainers.ToList().Count < 3)
            {
                db.Trainers.Add(trainer);
                db.SaveChanges();
                return "added";
            } else
            {
                return "not added";
            }
        }


        [HttpPost("trainerLogin")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public IActionResult TrainerLogin(DTOTrainers data)
        {
            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: data.trainerPassword,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256 / 8));

            var trainer = db.Trainers.FirstOrDefault(x => x.TEmail == data.trainerEmail);
            if (!db.Trainers.Any(x => data.trainerEmail == x.TEmail) || !db.Trainers.Any(x => hashedPassword == x.TPassword || data.trainerPassword == x.TPassword))
            {
                return NotFound();
            }

            var jwt = jwtService.Generate(trainer.Id);

            Response.Cookies.Append("jwt", jwt, cookieOptions);

            return Ok(new
            {
                message = "success",
                Username = trainer.TUsername
            });
        }

        [HttpGet("trainer")]
        public IActionResult GetTrainer()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = jwtService.Verify(jwt);

                int trainerId = int.Parse(token.Issuer);

                var trainer = db.Trainers.FirstOrDefault(x => x.Id == trainerId);

                return Ok(trainer);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        [HttpPost("trainerLogout")]
        public IActionResult TrainerLogout()
        {
            Response.Cookies.Delete("jwt", cookieOptions);

            return Ok(new
            {
                message = "success"
            });
        }

        [HttpGet("trainersList")]
        public List<Trainer> GetTrainers()
        {
            return db.Trainers.ToList();
        }

    }
}

