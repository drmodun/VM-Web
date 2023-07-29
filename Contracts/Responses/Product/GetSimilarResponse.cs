namespace Contracts.Responses.Product
{
    public class GetSimilarResponse
    {
        public List<GetSimilarProductsResponse> Items { get; set; } = new List<GetSimilarProductsResponse>();
    }
}
