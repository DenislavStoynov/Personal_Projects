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
    public class ChatRoomDto
    {
        public List<string> Users { get; set; } = new();
        public string RoomName { get; set; }
        public string Username { get; set; }

    }

    [Route("api/[controller]")]
    [ApiController]
    public class ChatRoomController : ControllerBase
    {
        private readonly FitnessDbContext db;

        public ChatRoomController(FitnessDbContext db)
        {
            this.db = db;
        }

        [HttpPost("createRoom")]
        public IActionResult CreateChatRoom(ChatRoomDto data)
        {
            try
            {
                var users = db.Users
                    .Where(x => data.Users.Contains(x.Username))
                    .ToList();

                var chatRoom = new ChatRoom() { Name = data.RoomName, Users = users };
                if (db.ChatRooms.Any(r => r.Name == chatRoom.Name)) throw new ArgumentException("Room Exists");

                users.ForEach(u => u.ChatRooms.Add(chatRoom));

                db.SaveChanges();
                return Ok(chatRoom.Id);
            }
            catch (ArgumentException err)
            {
                return BadRequest(err.Message);
            }

        }

        [HttpPost("deleteRoom")]
        public IActionResult DeleteChatRoom(ChatRoomDto data)
        {
            var roomName = data.RoomName;
            var chatRoom = db.ChatRooms.FirstOrDefault(room => room.Name == roomName);
            db.ChatRooms.Remove(chatRoom);
            db.SaveChanges();
            return Ok();
        }

        [HttpGet("getRoomNames")]
        public List<string> GetRoomNames()
        {
            return db.ChatRooms.Select(n => n.Name).ToList();
        }

        [HttpPost("getUserRoomNames")]
        public List<string> GetUserRoomNames(ChatRoomDto data)
        {
            var user = db.Users.FirstOrDefault(i => i.Username == data.Username);
            var chatRoom = db.ChatRooms.Where(x => x.Users.Contains(user)).Select(r => r.Name).ToList();
            return chatRoom; 
        }
    }
}
