﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Requests.User
{
    public class DeleteUserRequest
    {
        public Guid Id { get; set; }
    }
}
