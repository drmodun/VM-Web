using Data.Enums;

namespace Contracts.Requests.Order
{
    public class PutOrderRequest
    {
        public StatusType Status { get; set; }
        public DateTime? Deadline { get; set; }

        public Guid Id;
        public Guid ServiceId { get; set; }

        public Guid UserId { get; set; }
    }
}
