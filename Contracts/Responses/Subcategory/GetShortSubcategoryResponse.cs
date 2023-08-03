using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Responses.Subcategory
{
    public class GetShortSubcategoryResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int NumberOfProducts { get; set; }
    }
}
