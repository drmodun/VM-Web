using Contracts.Requests.Transaction;
using Contracts.Responses.Transaction;
using Domain.Services;
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
        [HttpGet(Routes.Transaction.Create)]
        public async Task<ActionResult<CreateTransactionResponse>> CreateTransaction([FromBody] CreateTransactionRequest request, CancellationToken cancellationToken)
        {
            var response = await _transactionService.CreateTransaction(request, cancellationToken);
            return response.Success ? Ok(response) : BadRequest(response);
            //later fix this bug
        }
        [HttpPut(Routes.Transaction.Update)]
        public async Task<ActionResult<PutTransactionResponse>> UpdateTransaction([FromRoute] Guid id, [FromBody] PutTransactionRequest request, CancellationToken cancellationToken)
        {
            request.Id = id;
            var response = await _transactionService.UpdateTransaction(request, cancellationToken);
            return response.Success ? Ok(response) : BadRequest(response);
        }
        [HttpDelete(Routes.Transaction.Delete)]
        public async Task<ActionResult<DeleteTransactionResponse>> DeleteTransaction([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            //later make a desicision wether to have delete and get requests if they are id only
            var response = await _transactionService.DeleteTransaction(id, cancellationToken);
            return response.Success ? Ok(response) : NotFound(response);
        }




    }
}
