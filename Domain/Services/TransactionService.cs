using Contracts.Requests.Transaction;
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

        public async Task<bool> CreateTransaction(CreateTransactionRequest request, CancellationToken cancellationToken)
        {
            var transaction = _transactionMapper.ToEntity(request);
            return await _transactionRepo.CreateTransaction(transaction, cancellationToken);
        }

        public async Task<bool> UpdateTransaction(PutTransactionRequest request, CancellationToken cancellationToken)
        {
            var transaction = _transactionMapper.ToUpdated(request);
            return await _transactionRepo.UpdateTransaction(transaction, cancellationToken);
        }

        public async Task<bool> DeleteTransaction(Guid id, CancellationToken cancellationToken)
        {
            return await _transactionRepo.DeleteTransaction(id, cancellationToken);
        }

        public async Task<GetTransactionResponse?> GetTransaction(Guid id, CancellationToken cancellationToken)
        {
            var transaction = await _transactionRepo.GetTransaction(id, cancellationToken);
            if (transaction is null)
                return null;
            return _transactionMapper.ToDTO(transaction);
        }

        public async Task<List<GetTransactionResponse>> GetAllTransactions(GetAllTransactionsRequest request, CancellationToken cancellationToken)
        {
            var transactions = await _transactionRepo.GetAllTransactions(request, cancellationToken);
            return transactions.Select(x => _transactionMapper.ToDTO(x)).ToList();
        }
    }
}
