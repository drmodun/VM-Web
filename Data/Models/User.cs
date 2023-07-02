using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; }    
        public string Email { get; set; }
        public string Password { get; set; }

        public string LastUpdated { get; set; }
        public string PhoneNumber { get; set; }

        public string Address { get; set; }

        public string Role { get; set; }

        public List<Transaciton> Transactions { get; set; }

        public List<Order> Orders { get; set; }

        public User()
        {
            Id = Guid.NewGuid();
        }



    }
}
