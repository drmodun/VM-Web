﻿using Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Requests.Order
{
    public class GetAllOrdersRequest
    {
        public DateTime? OrderDate { get; set; }
        public Guid ? OrderId { get; set; }
        public Guid? UserId { get; set; }
        public StatusType? Status { get; set; }
        public DateTime? Deadline { get; set; }
    }
}
