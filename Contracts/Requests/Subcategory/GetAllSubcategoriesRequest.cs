using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Requests.Subcategory
{
    public class GetAllSubcategoriesRequest
    {
        public string ? Name { get; set; }
        public string? Description { get; set; }
        public Guid? CategoryId { get; set;}    

    }
}
