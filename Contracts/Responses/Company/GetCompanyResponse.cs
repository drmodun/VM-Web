using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Responses.Company
{
    public class GetCompanyResponse
    {
        public string Name { get; set; }

        public string Description { get; set; }
        public Guid Id { get; set; }

        public string Website { get; set; }
        public string Logo { get; set; }
    }
}
