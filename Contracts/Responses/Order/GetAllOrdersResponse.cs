using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Responses.Order
{
    public class GetAllOrdersResponse
    {
        public List<GetOrderResponse> Orders { get; set; }
    }
}
