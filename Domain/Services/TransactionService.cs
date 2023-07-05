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
        private readonly TransactionMapper _transactionMapper;

        public TransactionService(TransactionRepo transactionRepo, TransactionMapper transactionMapper)
        {
            _transactionRepo = transactionRepo;
            _transactionMapper = transactionMapper;
        }

        public async Task<CreateTransactionResponse> CreateTransaction(CreateTransactionRequest request, CancellationToken cancellationToken)
        {
            var transaction = _transactionMapper.ToEntity(request);
            var action = await _transactionRepo.CreateTransaction(transaction, cancellationToken);
            return new CreateTransactionResponse
            {
                Success = action
            };
        }

        public async Task<PutTransactionResponse> UpdateTransaction(PutTransactionRequest request, CancellationToken cancellationToken)
        {
            var transaction = _transactionMapper.ToUpdated(request);
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
            return _transactionMapper.ToDTO(transaction);
        }

        public async Task<GetAllTransactionsResponse> GetAllTransactions(GetAllTransactionsRequest request, CancellationToken cancellationToken)
        {
            var transactions = await _transactionRepo.GetAllTransactions(request, cancellationToken);
            var list = transactions.Select(x => _transactionMapper.ToDTO(x)).ToList();


            var pageInfo = request.Pagination is null ? null
            : new PageResponse
            {
                PageNumber = request.Pagination.PageNumber,
                PageSize = request.Pagination.PageSize
            };
            return new GetAllTransactionsResponse
            {
                Transactions = list,
                PageInfo = pageInfo
            };
        }
    }
}
