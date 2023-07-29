using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Responses.Product
{
    public class GetShortProductsResponse
    {
        public PageResponse? PageInfo { get; set; }
        public List<GetShortProductResponse> Items { get; set; }
    }
}
