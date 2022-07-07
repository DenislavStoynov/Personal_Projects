using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Registration.Data.Models
{
    public class Nutrition:BaseEntity<int>
    {
        public string Calories { get; set; }
        public string Protein { get; set; }
        public string Carbohydrates { get; set; }
        public string Fats { get; set; }
        public int UserId { get; set; }
    }
}
