using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Registration.Data;
using Registration.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Registration.Controllers
{
    public class TrainingProgramDTO 
    {
    public string Username { get; set; }
    public string Objective { get; set; }
    public string Weeks { get; set; }
    public string Description { get; set; }

    }

    [Route("api/[controller]")]
    [ApiController]
    public class TrainingProgramController : ControllerBase
    {
        private readonly FitnessDbContext db;

        public TrainingProgramController(FitnessDbContext db)
        {
            this.db = db;
        }

        [HttpPost("createTrainingProgram")]
        public IActionResult CreateTrainingProgram(TrainingProgramDTO data)
        {
            var user = db.Users.Include(x => x.TProgram).FirstOrDefault(u => u.Username == data.Username);
            var program = db.TrainingProgram.FirstOrDefault(n => n.UserId == user.Id);
            if (program != null)
            {
                program.Objective = data.Objective;
                program.Weeks = data.Weeks;
                program.Description = data.Description;
                db.TrainingProgram.Update(program);
            }
            else
            {
                program = new TrainingProgram()
                {
                    Objective = data.Objective,
                    Weeks = data.Weeks,
                    Description = data.Description
                };
                user.TProgram.Add(program);
            }
            db.SaveChanges();
            return Ok();
        }

        [HttpPost("getTrainingProgram")]
        public List<string> GetTrainingProgram(TrainingProgramDTO data)
        {
            var userId = db.Users.FirstOrDefault(x => x.Username == data.Username).Id;
            var program = db.TrainingProgram.FirstOrDefault(x => x.UserId == userId);
            var list = new List<string>();
            if (program != null)
            {
                list.Add(program.Objective);
                list.Add(program.Weeks);
                list.Add(program.Description);
            }
            return list;
        }
    }
}
