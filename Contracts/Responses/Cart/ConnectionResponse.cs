using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Responses.Cart
{
    public class ConnectionResponse
    {
        public int Quantity { get; set; }
        public string ProductName { get; set; }
        public Guid ProductId { get; set; }
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
        public Guid BrandId { get; set; }
        public string BrandName { get; set; }
        public Guid SubcategoryId { get; set; }
        public string SubcategoryName { get; set; }
        public decimal PricePerUnit { get; set; }

        public decimal Total { get; set; }


    }
}
