using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Requests.Product
{
    public class GetSimilarProductsRequest
    {
        public Guid Id { get; set; }

        public Guid SubcategoryId { get; set; }

        public decimal Price { get; set; }

    }
}
