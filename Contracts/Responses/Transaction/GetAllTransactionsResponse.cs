namespace Contracts.Responses.Transaction
{
    public class GetAllTransactionsResponse
    {
        public PageResponse PageInfo { get; set; }
        public List<GetTransactionResponse> Transactions { get; set; }
    }
}
