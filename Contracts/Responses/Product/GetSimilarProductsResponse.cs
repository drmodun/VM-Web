using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Responses.Product
{
    public class GetSimilarProductsResponse
    {
        public string Image { get; set; }
        public Guid Id { get; set; }

        public string Name { get; set; }

        public decimal Price { get; set; }

        public Guid CompanyId { get; set; }

        public string CompanyName { get; set; }

        public bool IsInStock { get; set; }
    }
}
