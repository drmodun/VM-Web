using Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Responses.Service
{
    public class GetServiceResponse
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public ServiceType ServiceType { get; set; }

        public decimal Price { get; set; }
    }
}
