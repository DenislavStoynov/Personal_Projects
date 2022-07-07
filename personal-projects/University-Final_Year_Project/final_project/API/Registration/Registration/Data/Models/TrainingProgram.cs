using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Registration.Data.Models
{
    public class TrainingProgram : BaseEntity<int>
    {
        public string Objective { get; set; }
        public string Weeks { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }
    }
}
