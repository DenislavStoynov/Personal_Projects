using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Registration.Data;

namespace Registration.Hubs
{
    public class ChatHub : Hub
    {
        public static Dictionary<string, string> UserConnections = new();
        public static Dictionary<string, List<string>> ChatGroups = new();
        private readonly FitnessDbContext db;

        public ChatHub(FitnessDbContext db)
        {
            this.db = db;
        }

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        //public async Task AddToGroup(string room, string[] users)
        //{
        //    var chatRoom = db.ChatRooms.FirstOrDefault(x => x.Id.ToString() == room);
        //    chatRoom.Users.AddRange(users.ToList());
        //    ChatGroups.Add(room, users.ToList());
        //}

        public async Task SendMessageToGroup(string user, string roomId, string message)
        {
            if (roomId == "All")
            {
                await SendMessage(user, message);
            }
            else
            {
                var chatRoom = db.ChatRooms.Include(x => x.Users).FirstOrDefault(x => x.Name == roomId);
                await Clients.All.SendAsync("ReceiveGroupMessage",
                    new
                    {
                        User = user,
                        Message = message,
                        ChatRoom = chatRoom.Users.AsReadOnly().Select(x => x.Username).ToList(),
                        RoomName = roomId
                    });
            }
        }

        public async Task InitializeUserToCache(string username)
        {
            UserConnections[username] = Context.ConnectionId;
        }
    }
}
