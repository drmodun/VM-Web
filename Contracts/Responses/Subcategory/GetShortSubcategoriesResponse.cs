using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Responses.Subcategory
{
    public class GetShortSubcategoriesResponse
    {
        public List<GetShortSubcategoryResponse> Items { get; set; }
        public PageResponse? PageInfo { get; set; }
    }
}
