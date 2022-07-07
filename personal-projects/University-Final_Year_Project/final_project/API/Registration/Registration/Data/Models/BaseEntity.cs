using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Registration.Data.Models
{
    public class BaseEntity<T>
    {
        [Key]
        public T Id { get; set; }
    }
}
