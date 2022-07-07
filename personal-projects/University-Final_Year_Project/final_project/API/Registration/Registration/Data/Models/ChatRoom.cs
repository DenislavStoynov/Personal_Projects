using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Registration.Data.Models
{
    public class ChatRoom : BaseEntity<Guid>
    {
        public string Name { get; set; }
        public List<User> Users { get; set; } = new();
    }
}
