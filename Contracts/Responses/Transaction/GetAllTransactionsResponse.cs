namespace Contracts.Responses.Transaction
{
    public class GetAllTransactionsResponse
    {
        public PageResponse? PageInfo { get; set; }
        public List<GetTransactionResponse> Items { get; set; }
    }
}
