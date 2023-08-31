namespace Contracts.Responses.Cart
{
    public class CartResponse
    {
        public List<ConnectionResponse> Items { get; set; } = new List<ConnectionResponse>();
        public decimal TotalPrice { get; set; }
    }
}
