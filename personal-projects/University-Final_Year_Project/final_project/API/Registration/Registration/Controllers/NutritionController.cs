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
    public class NutritionDTO
    {
        public string Username { get; set; }
        public string Calories { get; set; }
        public string Protein { get; set; }
        public string Carbohydrates { get; set; }
        public string Fats { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class NutritionController : ControllerBase
    {

        private readonly FitnessDbContext db;

        public NutritionController(FitnessDbContext db)
        {
            this.db = db;
        }

        [HttpPost("createNutrition")]
        public IActionResult CreateNutrition(NutritionDTO data)
        {
            var user = db.Users.Include(x => x.Nutritions).FirstOrDefault(u => u.Username == data.Username);
            var nutrition = db.Nutrition.FirstOrDefault(n => n.UserId == user.Id);
            if (nutrition != null)
            {
                nutrition.Calories = data.Calories;
                nutrition.Protein = data.Protein;
                nutrition.Carbohydrates = data.Carbohydrates;
                nutrition.Fats = data.Fats;
                db.Nutrition.Update(nutrition);
            } 
            else
            {
                nutrition = new Nutrition()
                {
                    Calories = data.Calories,
                    Protein = data.Protein,
                    Carbohydrates = data.Carbohydrates,
                    Fats = data.Fats
                };
                user.Nutritions.Add(nutrition);
            }
            db.SaveChanges();
            return Ok();
        }

        [HttpPost("getNutrition")]
        public List<string> GetNutrition(NutritionDTO data)
        {   
            var userId = db.Users.FirstOrDefault(x => x.Username == data.Username).Id;
            var nutrition = db.Nutrition.FirstOrDefault(x => x.UserId == userId);
            var list = new List<string>();
            if(nutrition != null)
            {
                list.Add(nutrition.Calories);
                list.Add(nutrition.Protein);
                list.Add(nutrition.Carbohydrates);
                list.Add(nutrition.Fats);
            }
            return list;
        }
    }
}
