using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Responses.Company
{
    public class GetShortCompany
    {
        public Guid Id { get; set; }
        public string Logo { get; set; }
        public string Name { get; set; }
    }
}
