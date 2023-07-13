namespace Contracts.Responses.Product
{
    public class GetAllProductsResponse
    {
        public PageResponse? PageInfo { get; set; }
        public List<GetProductResponse> Items { get; set; }
    }
}
