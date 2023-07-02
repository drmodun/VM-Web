using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Requests.Order
{
    public class CreateOrderRequest
    {
        public Guid ServiceId { get; set; }
        public Guid UserId { get; set; }


    }
}
