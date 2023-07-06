using api.Auth;
using Contracts.Constants;
using Contracts.Requests.Transaction;
using Contracts.Responses.Transaction;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]

    public class TransactionController : ControllerBase
    {
        private readonly TransactionService _transactionService;

        public TransactionController(TransactionService transactionService)
        {
            _transactionService = transactionService;
        }
        [HttpGet(Routes.Transaction.Get)]
        public async Task<ActionResult<GetTransactionResponse>> GetTransaction([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var response = await _transactionService.GetTransaction(id, cancellationToken);
            return response == null ? NotFound() : Ok(response);
        }

        [HttpGet(Routes.Transaction.GetAll)]
        public async Task<ActionResult<GetAllTransactionsResponse>> GetAllTransactions([FromQuery] GetAllTransactionsRequest request, CancellationToken cancellationToken)
        {
            var response = await _transactionService.GetAllTransactions(request, cancellationToken);
            return Ok(response);
        }
        [Authorize(AuthConstants.TrustMemberPolicyName)]
        [HttpPost(Routes.Transaction.Create)]
        public async Task<ActionResult<CreateTransactionResponse>> CreateTransaction([FromBody] CreateTransactionRequest request, CancellationToken cancellationToken)
        {
            if (request.UserId != HttpContext.GetUserId())
                return BadRequest("You cannot create or edit a transaction from an account that is not yours");
            var response = await _transactionService.CreateTransaction(request, cancellationToken);
            return response.Success ? Ok(response) : BadRequest(response);
            //later fix this bug
        }
        [Authorize(AuthConstants.TrustMemberPolicyName)]
        [HttpPut(Routes.Transaction.Update)]
        public async Task<ActionResult<PutTransactionResponse>> UpdateTransaction([FromRoute] Guid id, [FromBody] PutTransactionRequest request, CancellationToken cancellationToken)
        {
            request.Id = id;
            if (request.UserId != HttpContext.GetUserId())
                return BadRequest("You cannot create or edit a transaction from an account that is not yours");
            var response = await _transactionService.UpdateTransaction(request, cancellationToken);
            return response.Success ? Ok(response) : BadRequest(response);
        }
        [Authorize(AuthConstants.AdminUserPolicyName)]
        [HttpDelete(Routes.Transaction.Delete)]
        public async Task<ActionResult<DeleteTransactionResponse>> DeleteTransaction([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            //later make a desicision wether to have delete and get requests if they are id only
            var response = await _transactionService.DeleteTransaction(id, cancellationToken);
            return response.Success ? Ok(response) : NotFound(response);
        }
        [Authorize(AuthConstants.TrustMemberPolicyName)]
        [HttpDelete(Routes.Transaction.GetMyTransactions)]
        public async Task<ActionResult<GetAllTransactionsResponse>> GetMyTransactions([FromQuery] GetAllTransactionsRequest request, CancellationToken cancellationToken)
        {
            if (request.UserId != HttpContext.GetUserId() && request.UserId != null)
                return BadRequest("You cannot get transactions from an account that is not yours");
            request.UserId = HttpContext.GetUserId();  
            var response = await _transactionService.GetAllTransactions(request, cancellationToken);
            return Ok(response);
        }




    }
}
