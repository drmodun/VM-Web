using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Responses.Service
{
    public class GetAllServicesResponse
    {
        public List<GetServiceResponse> Services { get; set; }
    }
}
