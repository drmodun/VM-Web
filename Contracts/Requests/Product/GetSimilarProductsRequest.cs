namespace Contracts.Requests.Product
{
    public class GetSimilarProductsRequest
    {
        public Guid Id { get; set; }

        public Guid SubcategoryId { get; set; }

        public decimal Price { get; set; }

    }
}
