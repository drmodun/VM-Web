using Contracts.Responses.Product;

namespace Contracts.Responses.Company
{
    public class GetCompanyResponse
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public Guid Id { get; set; }

        public string Website { get; set; }
        //make my mind about pagination here
        public List<GetShortProductResponse> Products { get; set; }
        public string Logo { get; set; }
    }
}
