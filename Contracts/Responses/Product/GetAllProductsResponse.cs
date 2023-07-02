using Contracts.Responses.Porduct;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Responses.Product
{
    public class GetAllProductsResponse
    {
        public List<GetProductResponse> Products { get; set; }
    }
}
