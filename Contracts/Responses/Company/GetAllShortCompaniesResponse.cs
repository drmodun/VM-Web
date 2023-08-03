using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Responses.Company
{
    public class GetAllShortCompaniesResponse
    {
        public List<GetShortCompany> Items { get; set; }
        public PageResponse? PageInfo { get; set; }
    }
}
