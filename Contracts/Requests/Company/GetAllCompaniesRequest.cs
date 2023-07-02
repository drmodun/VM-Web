using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Requests.Company
{
    public class GetAllCompaniesRequest
    {
        public string ? Name { get; set; }
        public string? Description { get; set; }

    }
}
