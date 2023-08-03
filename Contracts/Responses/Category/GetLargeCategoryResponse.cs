using Contracts.Responses.Company;
using Contracts.Responses.Product;
using Contracts.Responses.Subcategory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Responses.Category
{
    public class GetLargeCategoryResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        //later add picture
        public List<GetShortProductResponse> Products { get; set; }

        public List<GetShortSubcategoryResponse> Subcategories { get; set; }

        public List<GetShortCompany> Brands { get; set; }
    }
}
