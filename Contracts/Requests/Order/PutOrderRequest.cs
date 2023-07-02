using Data.Enums;

namespace Contracts.Requests.Order
{
    public class PutOrderRequest
    {
        public StatusType Status { get; set; }
        public DateTime? Deadline { get; set; }
        public Guid OrderId { get; set; }
    }
}
