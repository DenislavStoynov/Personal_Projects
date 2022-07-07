using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Registration.Data.Models
{
    public class Trainer : BaseEntity<int>
    {
      
        public string TEmail { get; set; }

        public string TPassword { get; set; }

        public string TUsername { get; set; }

        [Column("Bookings")]
        public List<Booking> Bookings { get; set; } = new();

        public Trainer()
        {
            
        }

        public Trainer(string email, string password, string username)
        {
            TEmail = email;
            TPassword = password;
            TUsername = username;
        }

    }
}
