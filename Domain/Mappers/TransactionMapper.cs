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
                UserName = transaction.User.Name,
                ProductId = transaction.ProductId,
                ProductName = transaction.Product.Name,
                PricePerUnit = transaction.PricePerUnit,
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
                Quantity = request.Quantity,
                Id = Guid.NewGuid(),
            };
        }
    }
}
