using Data.Enums;

namespace Contracts.Requests.Transaction
{
    public class CreateTransactionRequest
    {
        public Guid UserId { get; set; }
        public Guid ProductId { get; set; }

        public int Quantity { get; set; }
        //later add verification for transactions, during testing it is better to have fake ones
    }
}
