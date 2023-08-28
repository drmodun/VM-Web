using Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Requests.Order
{
    public class UpdateOrderInfoRequest
    {
        public StatusType Status { get; set; }
        public DateTime? Deadline { get; set; }
        public string? Note { get; set; }
    }
}
