using Data.Enums;

namespace Data.Models
{
    public class Transaction
    {
        //since the user can buy the same item multiple times, a primary key is needed here
        public Guid Id { get; set; }
        public Guid UserId { get; set; }

        public User? User { get; set; }

        public Product? Product { get; set; }
        public Guid ProductId { get; set; }
        public DateTime CreatedAt { get; set; }
        public TransactionType Type { get; set; }
    }
}
