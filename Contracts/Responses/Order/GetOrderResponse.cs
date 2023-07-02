using Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Responses.Order
{
    public class GetOrderResponse
    {
        public Guid Id { get; set; }
        public Guid ServiceId { get; set; }
        public string ServiceName { get; set; }
        public Guid UserId { get; set; }
        public string UserName { get; set; }

        public StatusType StatusType { get; set; }

        public DateTime Created { get; set; }

        public DateTime? Deadline { get; set; }
    }
}
