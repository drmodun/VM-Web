using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Requests.User
{
    public class LoginRequest
    {
        public string Email { get; init; }
        public string Password { get; init; }
    }
}
