namespace Contracts.Responses.Order
{
    public class GetAllOrdersResponse
    {
        public PageResponse? PageInfo { get; set; }
        public List<GetOrderResponse> Orders { get; set; }
    }
}
