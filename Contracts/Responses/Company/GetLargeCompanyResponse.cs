using Contracts.Responses.Category;
using Contracts.Responses.Subcategory;

namespace Contracts.Responses.Company
{
    public class GetLargeCompanyResponse
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public Guid Id { get; set; }
        public List<GetShortCategoryResponse> Categories { get; set; }
        public List<GetShortSubcategoryResponse> Subcategories { get; set; }
    }
}
