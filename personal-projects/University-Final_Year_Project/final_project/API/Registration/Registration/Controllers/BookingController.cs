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
    public class BookingDTO
    {
        public string BookingText { get; set; }

        public string TrainerUsername { get; set; }

        public string User { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly FitnessDbContext db;

        public BookingController(FitnessDbContext db)
        {
            this.db = db;
        }

        [HttpPost("booking")] 
        public IActionResult UserBook(BookingDTO data)
        {
            var trainer = db.Trainers.Include(x => x.Bookings).FirstOrDefault(u => u.TUsername == data.TrainerUsername);
            var user = db.Users.FirstOrDefault(u => u.Username == data.User);
            var bookingUser = db.Booking.FirstOrDefault(i => i.userId == user.Id);
            if (bookingUser != null)
            {
                bookingUser.bookingText = data.BookingText;
                db.Booking.Update(bookingUser);
            }
            else
            {
                var booking = new Booking()
                {
                    bookingText = data.BookingText,
                    trainerId = trainer.Id,
                    userId = user.Id
                };
                trainer.Bookings.Add(booking);
            }
            db.SaveChanges();
            return Ok();
        }

        [HttpPost("deleteBooking")]

        public IActionResult DeleteBooking(BookingDTO data)
        {
            var text = db.Booking.FirstOrDefault(t => t.bookingText == data.BookingText);
            if (text != null)
            {
                db.Booking.Remove(text);
                db.SaveChanges();
            }
            return Ok();
        }

        [HttpPost("getBooking")]
        public Dictionary<string, string> GetBooking(BookingDTO data)
        {
            var dict = new Dictionary<string, string>();
            var trainer = db.Trainers.FirstOrDefault(u => u.TUsername == data.TrainerUsername); // get name of trainer
            var trainerText = db.Booking.Where(i => i.trainerId == trainer.Id).Select(t => t.bookingText).ToList(); // get booking text, depending on trainer's Id
            var userIds = db.Booking.Where(i => i.trainerId == trainer.Id).Select(x => x.userId).ToList(); // get user id of corrsponding booking text
            for (int i = 0; i < trainerText.Count; i++)
            {
                var id = userIds[i];
                var username = db.Users.FirstOrDefault(i => i.Id == id).Username; // get the user username by using their id
                dict[username] = trainerText[i];
            }
            return dict;
        }
    }
}
