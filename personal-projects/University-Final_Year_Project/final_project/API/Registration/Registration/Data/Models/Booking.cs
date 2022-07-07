using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Registration.Data.Models
{
    public class Booking : BaseEntity<int>
    {
        public string bookingText { get; set; }
        public int trainerId { get; set; }
        public int userId { get; set; }
    }
}
