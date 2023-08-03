using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Responses.Category
{
    public class GetLargeCategoriesResponse
    {
        public PageResponse? PageInfo { get; set; }
        public List<GetLargeCategoryResponse> Items { get; set; }
    }
}
