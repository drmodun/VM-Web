using Data.Enums;

namespace Contracts.Responses.Order
{
    public class GetOrderResponse
    {
        public Guid Id { get; set; }
        public Guid ServiceId { get; set; }
        public string ServiceName { get; set; }
        public Guid UserId { get; set; }
        public string UserName { get; set; }

        public StatusType StatusType { get; set; }

        public DateTime Created { get; set; }

        public DateTime? Deadline { get; set; }
    }
}
