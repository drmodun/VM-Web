using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Contracts.Stripe;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;
using Contracts.Stripe;
using api.Auth;
using Microsoft.AspNetCore.Authorization;
using Contracts.Constants;

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

        [HttpPost(Routes.Payment.CreateCustomer)]
        public async Task<ActionResult<StripeCustomer>> AddStripeCustomer(
            [FromBody] AddStripeCustomer customer,
            CancellationToken ct)
        {
            StripeCustomer createdCustomer = await _stripeService.AddStripeCustomerAsnyc(customer,ct);

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

            return createdPayment!=null ? StatusCode(StatusCodes.Status200OK, createdPayment)
                : StatusCode(StatusCodes.Status400BadRequest, "An error happenned during your transaction");
        }
    }
}
