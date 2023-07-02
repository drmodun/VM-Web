using Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
    public class Transaciton
    {
        //since the user can buy the same item multiple times, a primary key is needed here
        public Guid Id { get; set; }
        public Guid UserId { get; set; }

        public User? User { get; set; }

        public Product? Product { get; set; }  
        public Guid ProductId { get; set; }
        public DateTime CreatedAt { get; set; }
        public TransactionType Type { get; set; }
    }
}
