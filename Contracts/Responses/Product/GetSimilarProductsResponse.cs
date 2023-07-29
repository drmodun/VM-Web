namespace Contracts.Responses.Product
{
    public class GetSimilarProductsResponse
    {
        public string Image { get; set; }
        public Guid Id { get; set; }

        public string Name { get; set; }

        public decimal Price { get; set; }

        public Guid CompanyId { get; set; }

        public string CompanyName { get; set; }

        public bool IsInStock { get; set; }
    }
}
