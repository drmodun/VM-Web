using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Responses.Cart
{
    public class CartResponse
    {
        public List<ConnectionResponse> Items { get; set; } = new List<ConnectionResponse>();
        public decimal TotalPrice { get; set; }
        //later add stuff for transactions
    }
}
