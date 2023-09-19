using Contracts.Responses.Company;
using Contracts.Responses.Subcategory;

namespace Contracts.Responses.Category
{
    public class GetLargeCategoryResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<GetShortSubcategoryResponse> Subcategories { get; set; }
        public string Website { get; set; }
        public List<GetShortCompany> Brands { get; set; }
    }
}
