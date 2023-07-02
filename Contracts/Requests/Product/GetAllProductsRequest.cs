using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Requests.Product
{
    public class GetAllProductsRequest
    {
        public decimal ? MaxPrice { get; set; }
        public decimal? MinPrice { get; set;}
        public int ? MaxQuantity { get; set; }
        public int? MinQuantity { get; set; }

        public Guid ? CategoryId { get; set; }
        public Guid ? SubcategoryId { get; set; }
        public Guid ? CompanyId { get; set; }
    }
}
