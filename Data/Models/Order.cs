using Data.Enums;

namespace Data.Models
{
    public class Order
    {
        public Guid Id { get; set; }
        public User? User { get; set; }
        public Service? Service { get; set; }
        public Guid UserId { get; set; }
        public Guid ServiceId { get; set; }
        public DateTime Created { get; set; }

        public StatusType Status { get; set; } = StatusType.Pending;
        public DateTime? Deadline { get; set; }

    }
}
