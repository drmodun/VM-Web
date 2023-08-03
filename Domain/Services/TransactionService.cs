using Contracts.Requests.Transaction;
using Contracts.Responses;
using Contracts.Responses.Transaction;
using Domain.Mappers;
using Domain.Repositories;

namespace Domain.Services
{
    public class TransactionService
    {
        private readonly TransactionRepo _transactionRepo;

        public TransactionService(TransactionRepo transactionRepo)
        {
            _transactionRepo = transactionRepo;
        }

        public async Task<CreateTransactionResponse> CreateTransaction(CreateTransactionRequest request, CancellationToken cancellationToken)
        {
            var transaction = TransactionMapper.ToEntity(request);
            var action = await _transactionRepo.CreateTransaction(transaction, cancellationToken);
            return new CreateTransactionResponse
            {
                Success = action
            };
        }

        public async Task<PutTransactionResponse> UpdateTransaction(PutTransactionRequest request, CancellationToken cancellationToken)
        {
            var transaction = TransactionMapper.ToUpdated(request);
            var action = await _transactionRepo.UpdateTransaction(transaction, cancellationToken);
            return new PutTransactionResponse
            {
                Success = action
            };
        }

        public async Task<DeleteTransactionResponse> DeleteTransaction(Guid id, CancellationToken cancellationToken)
        {
            var action = await _transactionRepo.DeleteTransaction(id, cancellationToken);
            return new DeleteTransactionResponse
            {
                Success = action
            };
        }

        public async Task<GetTransactionResponse?> GetTransaction(Guid id, CancellationToken cancellationToken)
        {
            var transaction = await _transactionRepo.GetTransaction(id, cancellationToken);
            if (transaction is null)
                return null;
            return TransactionMapper.ToDTO(transaction);
        }

        public async Task<GetAllTransactionsResponse> GetAllTransactions(GetAllTransactionsRequest request, CancellationToken cancellationToken)
        {
            var transactions = await _transactionRepo.GetAllTransactions(request, cancellationToken);
            var pageInfo =
            new PageResponse
            {
                PageNumber = request.Pagination != null ? request.Pagination.PageNumber : 1,
                PageSize = request.Pagination != null ? request.Pagination.PageSize : transactions.Count(),
                TotalItems = transactions.Count(),
                TotalPages = request.Pagination != null ? (transactions.Count() + request.Pagination.PageSize - 1) / request.Pagination.PageSize : 1
            };
            if (request.Pagination != null)
                transactions = transactions.Skip(request.Pagination.PageSize * (request.Pagination.PageNumber - 1)).Take(request.Pagination.PageSize);

            var list = transactions.Select(x => TransactionMapper.ToDTO(x)).ToList();
            return new GetAllTransactionsResponse
            {
                Items = list,
                PageInfo = pageInfo
            };
        }
    }
}
