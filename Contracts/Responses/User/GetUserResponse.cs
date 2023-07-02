using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Requests.User
{
    public class GetUserResponse
    {
        public string Name { get; set; }

        public string Email { get; set; }

        public Guid Id { get; set; }

        public DateTime LastUpdate { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Address { get; set; }

    }
}
