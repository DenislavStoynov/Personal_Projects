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
    public class ProgressDTO
    {
        public string Username { get; set; }
        public string TaskText { get; set; }
        public List<string> MyList { get; set; }

    }

    [Route("api/[controller]")]
    [ApiController]
    public class ProgressController : ControllerBase
    {
        private readonly FitnessDbContext db;

        public ProgressController(FitnessDbContext db)
        {
            this.db = db;
        }

        [HttpPost("updateProgressTask")]
        public IActionResult UpdateProgressTask(ProgressDTO data)
        {
            var user = db.Users.Include(x => x.Progress).FirstOrDefault(u => u.Username == data.Username);
            var progress = db.Progress.FirstOrDefault(p => p.UserId == user.Id);
            if (progress != null)
            {
                progress.Tasks += 2;
                db.Progress.Update(progress);
            }
            var task = db.Task.FirstOrDefault(t => t.Text == data.TaskText);
            if (task != null)
            {
                db.Task.Remove(task);
                db.SaveChanges();
            }
            return Ok();
        }

        [HttpPost("updateProgressWorkouts")]
        public IActionResult UpdateProgressWorkouts(ProgressDTO data)
        {
            var user = db.Users.Include(x => x.Progress).FirstOrDefault(u => u.Username == data.Username);
            var progress = db.Progress.FirstOrDefault(p => p.UserId == user.Id);
            if (progress != null)
            {
                progress.Workouts += 2;
                db.Progress.Update(progress);
            }
            var workouts = db.TrainingProgram.FirstOrDefault(t => t.UserId == user.Id);
            if (workouts != null)
            {
                db.TrainingProgram.Remove(workouts);
                db.SaveChanges();
            }
            return Ok();
        }

        [HttpPost("updateProgressNutrition")]
        public IActionResult UpdateProgressNutrition(ProgressDTO data)
        {
            var user = db.Users.Include(x => x.Progress).FirstOrDefault(u => u.Username == data.Username);
            var progress = db.Progress.FirstOrDefault(p => p.UserId == user.Id);
            if (progress != null)
            {
                progress.Nutrition += 2;
                db.Progress.Update(progress);
            }
            var nutrition = db.Nutrition.FirstOrDefault(t => t.UserId == user.Id);
            if (nutrition != null)
            {
                db.Nutrition.Remove(nutrition);
                db.SaveChanges();
            }
            return Ok();
        }

        [HttpPost("getProgress")]
        public List<int> GetProgress(ProgressDTO data)
        {
            var userId = db.Users.FirstOrDefault(x => x.Username == data.Username).Id;
            var progress = db.Progress.FirstOrDefault(p => p.UserId == userId);
            var list = new List<int>();
            if(progress != null)
            {
                list.Add(progress.Workouts);
                list.Add(progress.Tasks);
                list.Add(progress.Nutrition);
            }
            return list;
        }

        [HttpPost("getProgressOfAllUsers")]
        public Dictionary<string, List<int>> GetProgressOfAllUsers(ProgressDTO data)
        {
            var dict = new Dictionary<string, List<int>>();
            for (int i = 0; i < data.MyList.Count; i++)
            {
                var list = new List<int>();
                var userId = db.Users.FirstOrDefault(p => p.Username == data.MyList[i]).Id;
                var progress = db.Progress.FirstOrDefault(i => i.UserId == userId);
                list.Add(progress.Workouts);
                list.Add(progress.Tasks);
                list.Add(progress.Nutrition);
                dict.Add(data.MyList[i], list);
            }
            return dict;
        }
    }
}
