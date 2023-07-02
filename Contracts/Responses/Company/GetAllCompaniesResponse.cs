using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Responses.Company
{
    public class GetAllCompaniesResponse
    {
        public List<GetCompanyResponse> Companies {  get; set; }
    }
}
