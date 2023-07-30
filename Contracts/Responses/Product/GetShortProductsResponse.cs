namespace Contracts.Responses.Product
{
    public class GetShortProductsResponse
    {
        public PageResponse? PageInfo { get; set; }
        public List<GetShortProductResponse> Items { get; set; }
    }
}
