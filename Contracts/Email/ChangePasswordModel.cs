﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Email
{
    public class ChangePasswordModel
    {
        public string Name { get; set; }
        public string Link { get; set; }
    }
}
