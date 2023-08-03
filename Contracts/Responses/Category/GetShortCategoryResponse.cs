using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Responses.Category
{
    public class GetShortCategoryResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        //later add picture
        public int NumberOfProducts { get; set; }
    }
}
