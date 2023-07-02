namespace Data.Models
{
    public class Order
    {
        public Guid Id { get; set; }
        public User? User { get; set; }
        public Service? Service { get; set; }
        public Guid UserId { get; set; }
        public Guid ServiceId { get; set; }
    }
}
