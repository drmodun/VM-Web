using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Requests.Company
{
    public class CreateCompanyRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Logo { get; set; }

        public string Website { get; set; }
    }
}
