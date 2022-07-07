using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Registration.Data.Models
{
    public class Subscriber : BaseEntity<int>
    {
        public string Email { get; set; }

        public Subscriber()
        {

        }

        public Subscriber(string email)
        {
            Email = email;
        }
    }
}
