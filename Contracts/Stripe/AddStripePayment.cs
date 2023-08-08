namespace Contracts.Stripe
{
    public class AddStripePayment
    {
        public Guid UserId;
        public string ReceiptEmail { get; set; }
        public string Description { get; set; }
    }
}
