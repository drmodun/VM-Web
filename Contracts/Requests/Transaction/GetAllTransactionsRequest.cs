using Data.Enums;

namespace Contracts.Requests.Transaction
{
    public class GetAllTransactionsRequest
    {
        public Guid? UserId { get; set; }
        public Guid? ProductId { get; set; }

        public string? UserName { get; set; } = string.Empty;
        public string? ProductName { get; set; } = string.Empty;

        public decimal? MinPrice { get; set; }

        public SortRequest? Sorting { get; set; }
        public decimal? MaxPrice { get; set; }

        public TransactionType? Type { get; set; }
        public DateTime? CreatedAt { get; set; }

        public PageRequest? Pagination { get; set; }
    }
}
