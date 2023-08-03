using Contracts.Responses.Company;
using Contracts.Responses.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Responses.Subcategory
{
    public class GetLargeSubcategoryRssponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<GetShortCompany> Companies { get; set; }
        public Guid CategoryId { get; set; }
        public List<GetShortProductResponse> Products { get; set; }

        public string CategoryName { get; set; }

    }
}
