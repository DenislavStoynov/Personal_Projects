using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Registration.Data.Models
{
    public class Progress : BaseEntity<int>
    {
        public int Workouts { get; set; }
        public int Tasks { get; set; }
        public int Nutrition { get; set; }
        public int UserId { set; get; }
    }
}
