using Data.Enums;

namespace Contracts.Requests.Transaction
{
    public class GetAllTransactionsRequest
    {
        public Guid? UserId { get; set; }
        public Guid? ProductId { get; set; }

        public TransactionType? Type { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
