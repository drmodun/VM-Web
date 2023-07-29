using Contracts.Responses.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Requests.Product
{
    public class GetSimilarResponse
    {
        public List<GetSimilarProductsResponse> Items { get; set; } = new List<GetSimilarProductsResponse>();
    }
}
