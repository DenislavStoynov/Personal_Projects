using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Registration.Data.Models
{
    public class User : BaseEntity<int>
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }
        public string Q1 { get; set; }
        public string Q2 { get; set; }
        public string Q3 { get; set; }

        [Column("TrainingProgram")]
        public List<TrainingProgram> TProgram { get; set; } = new();

        [Column("Nutrition")]
        public List<Nutrition> Nutritions { get; set; } = new();

        [Column("Task")]
        public List<Registration.Data.Models.Task> Tasks { get; set; } = new();

        [Column("Progress")]
        public Progress Progress { get; set; }

        [Column("ChatRoom")]
        public List<ChatRoom> ChatRooms { get; set; } = new();

        public User()
        {

        }
        public User(string email, string password, string username, string q1, string q2, string q3)
        {
            Email = email;
            Password = password;
            Username = username;
            Q1 = q1;
            Q2 = q2;
            Q3 = q3;
        }
    }
}
