namespace Contracts.Requests.Order
{
    public class CreateOrderRequest
    {
        public Guid ServiceId { get; set; }
        public Guid UserId { get; set; }


    }
}
