using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Registration.Data.Models
{
    public class Admin : BaseEntity<int>
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }

        public Admin()
        {

        }

        public Admin(string email, string password, string username)
        {
            Email = email;
            Password = password;
            Username = username;
        }

    }
}
