using Contracts.Responses.Company;

namespace Contracts.Responses.Subcategory
{
    public class GetLargeSubcategoryRssponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }
        public List<GetShortCompany> Brands { get; set; }
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }

    }
}
