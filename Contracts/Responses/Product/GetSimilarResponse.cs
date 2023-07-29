using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Responses.Product
{
    public class GetSimilarResponse
    {
        public List<GetSimilarProductsResponse> Items { get; set; } = new List<GetSimilarProductsResponse>();
    }
}
