using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Registration.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Registration.Data.Models;

namespace Registration.Controllers
{
    public class TasksDTO
    {
        public string Username { get; set; }
        public string TextareaValue { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly FitnessDbContext db;

        public TasksController(FitnessDbContext db)
        {
            this.db = db;
        }

        [HttpPost("createTask")]
        public IActionResult AddTaskToUser(TasksDTO data)
        {
            var user = db.Users.Include(x => x.Tasks).FirstOrDefault(u => u.Username == data.Username);
            var task = new Registration.Data.Models.Task() { Text = data.TextareaValue, UserId = user.Id };
            user.Tasks.Add(task);
            db.SaveChanges();
            return Ok();
        }

        [HttpPost("getTask")]
        public List<string> GetTask(TasksDTO data)
        {
            var userId = db.Users.FirstOrDefault(x => x.Username == data.Username).Id;
            //var task = db.Users.Include(x => x.Tasks).FirstOrDefault(u => u.Id == userId).Tasks.Select(x => x.Text).ToList();
            var task = db.Task.Where(x => x.UserId == userId).Select(x => x.Text).ToList();
            //var task = db.Task.Where(x => x.UserId == userId).Select(x => new { Text = x.Text, Id = x.Id }).ToList(); return Ok(task) IActionResult
            return task;
        }
    }
}
