using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Requests.Service
{
    public class GetAllServicesRequest
    {
        public string ? Name { get; set; }
        public string ? Description { get; set; }

        public decimal ? MaxPrice { get; set; }
    }
}
