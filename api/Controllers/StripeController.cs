using api.Auth;
using Contracts.Constants;
using Contracts.Stripe;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    public class StripeController : ControllerBase
    {
        private readonly StripeAppService _stripeService;

        public StripeController(StripeAppService stripeService)
        {
            _stripeService = stripeService;
        }

        [Authorize(AuthConstants.TrustMemberPolicyName)]
        [HttpPost(Routes.Payment.CreateCustomer)]
        public async Task<ActionResult<StripeCustomer>> AddStripeCustomer(
            [FromBody] AddStripeCustomer customer,
            CancellationToken ct)
        {
            customer.UserId = (Guid)HttpContext.GetUserId();
            StripeCustomer createdCustomer = await _stripeService.AddStripeCustomerAsnyc(customer, ct);

            return createdCustomer != null ?
                StatusCode(StatusCodes.Status200OK, createdCustomer)
                : StatusCode(StatusCodes.Status400BadRequest, "An error uccoured during customer creation");
        }
        [Authorize(AuthConstants.TrustMemberPolicyName)]
        [HttpPost(Routes.Payment.MakePayment)]
        public async Task<ActionResult<StripePayment>> AddStripePayment(
            [FromBody] AddStripePayment payment,
            CancellationToken ct)
        {
            payment.UserId = (Guid)HttpContext.GetUserId();
            StripePayment createdPayment = await _stripeService.AddStripePaymentAsync(
                payment,
                ct);

            return createdPayment != null ? StatusCode(StatusCodes.Status200OK, createdPayment)
                : StatusCode(StatusCodes.Status400BadRequest);
        }
    }
}
