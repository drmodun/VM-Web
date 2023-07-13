namespace Contracts.Responses.Order
{
    public class GetAllOrdersResponse
    {
        public PageResponse? PageInfo { get; set; }
        public List<GetOrderResponse> Items { get; set; }
    }
}
