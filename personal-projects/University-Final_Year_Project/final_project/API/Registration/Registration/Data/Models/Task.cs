using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Registration.Data.Models
{
    public class Task : BaseEntity<int>
    {
       public string Text { get; set; }
       public int UserId { get; set; }

    }
}
