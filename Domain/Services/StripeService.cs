using Contracts.Stripe;
using Stripe;

namespace Domain.Services
{
    public class StripeAppService
    {
        private readonly ChargeService _chargeService;
        private readonly CustomerService _customerService;
        private readonly CartService _cartsService;
        private readonly UserService _userService;

        public StripeAppService(
            CartService cartsService,
            ChargeService chargeService,
            CustomerService customerService,
            UserService userService)
        {
            _chargeService = chargeService;
            _cartsService = cartsService;
            _customerService = customerService;
            _userService = userService;
        }

        public async Task<StripeCustomer?> AddStripeCustomerAsnyc(AddStripeCustomer customer, CancellationToken cancellationToken)
        {
            var user = await _userService.GetUser(customer.UserId, cancellationToken);
            if (user == null) { return null; }
            CustomerCreateOptions customerOptions = new CustomerCreateOptions
            {
                Name = customer.Name,
                Email = customer.Email,
                Source = customer.TokenId
            };

            Customer createdCustomer = await _customerService.CreateAsync(customerOptions, null, cancellationToken);
            await _userService.SaveCustomerToUser(createdCustomer.Id, customer.UserId, cancellationToken);
            return new StripeCustomer
            {
                CustomerId = createdCustomer.Id,
                Email = createdCustomer.Email,
                Name = createdCustomer.Name,
            };

        }
        //lčater add specific status codes and errors for this
        public async Task<StripePayment?> AddStripePaymentAsync(AddStripePayment payment, CancellationToken cancellationToken)
        {
            var user = await _userService.GetCustomerId(payment.UserId, cancellationToken);
            Console.Write(user);
            if (user == null)
            {
                return null;
            }
            var amount = await _cartsService.GetTotal(payment.UserId, cancellationToken);
            if (amount == null || amount <= 0)
            {
                Console.WriteLine(amount);
                return null;
            }
            ChargeCreateOptions paymentOptions = new ChargeCreateOptions
            {
                Customer = user,
                ReceiptEmail = payment.ReceiptEmail,
                Description = payment.Description,
                Currency = "EUR",
                Amount = amount
            };
            //probably get better error handling later

            Console.WriteLine("sougcsgousoucs");
            var createdPayment = await _chargeService.CreateAsync(paymentOptions, null, cancellationToken);
            await _cartsService.BuyCart(payment.UserId, cancellationToken);
            return new StripePayment
            {
                CustomerId = createdPayment.CustomerId,
                ReceiptEmail = createdPayment.ReceiptEmail,
                Description = createdPayment.Description,
                Currency = createdPayment.Currency,
                Amount = createdPayment.Amount,
                PaymentId = createdPayment.Id
            };
        }


    }
}
