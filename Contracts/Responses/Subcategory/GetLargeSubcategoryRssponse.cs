using Contracts.Responses.Company;
using Contracts.Responses.Product;

namespace Contracts.Responses.Subcategory
{
    public class GetLargeSubcategoryRssponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<GetShortCompany> Brands { get; set; }
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }

    }
}
