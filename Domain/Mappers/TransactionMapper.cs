using Contracts.Requests.Transaction;
using Contracts.Responses.Transaction;
using Data.Models;

namespace Domain.Mappers
{
    public static class TransactionMapper
    {
        public static Transaction ToUpdated(PutTransactionRequest request)
        {
            return new Transaction
            {
                UserId = request.UserId,
                CreatedAt = DateTime.UtcNow,
                ProductId = request.ProductId,
                Type = request.Type,
                Quantity = request.Quantity,
                Id = request.Id
            };
        }
        public static GetTransactionResponse ToDTO(Transaction transaction)
        {
            return new GetTransactionResponse
            {
                UserId = transaction.UserId,
                CreatedAt = transaction.CreatedAt,
                Id = transaction.Id,
                ProductId = transaction.ProductId,
                ProductName = transaction.Product.Name,
                TransactionType = transaction.Type,
                Quantity = transaction.Quantity
            };
        }
        public static Transaction ToEntity(CreateTransactionRequest request)
        {
            return new Transaction
            {
                UserId = request.UserId,
                CreatedAt = DateTime.UtcNow,
                ProductId = request.ProductId,
                Type = request.Type,
                Quantity = request.Quantity,
                Id = Guid.NewGuid(),
            };
        }
    }
}
