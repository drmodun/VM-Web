using Contracts.Responses.Category;
using Contracts.Responses.Subcategory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Responses.Company
{
    public class GetLargeCompanyResponse
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Logo { get; set; }
        public Guid Id { get; set; }
        public List<GetShortCategoryResponse> Categories { get; set; }
        public List<GetShortSubcategoryResponse> Subcategories { get; set; }
    }
}
