namespace Contracts.Stripe
{
    public class AddStripeCustomer
    {
        public Guid UserId;
        public string Email { get; set; }
        public string Name { get; set; }
        public string TokenId { get; set; }
    }
}
