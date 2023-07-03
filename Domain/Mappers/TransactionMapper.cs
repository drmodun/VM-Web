using Contracts.Requests.Transaction;
using Contracts.Responses.Transaction;
using Data.Enums;
using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Mappers
{
    public class TransactionMapper
    {
        public GetTransactionResponse ToDTO(Transaction transaction)
        {
            return new GetTransactionResponse
            {
                UserId = transaction.UserId,
                CreatedAt = transaction.CreatedAt,
                Id = transaction.Id,
                ProductId = transaction.ProductId,
                ProductName = transaction.Product.Name,
                TransactionType = transaction.Type
            };
        } 
        public Transaction ToEntity(CreateTransactionRequest request)
        {
            return new Transaction
            {
                UserId = request.UserId,
                CreatedAt = DateTime.UtcNow,
                ProductId = request.ProductId,
                Type = request.Type,
                Id = Guid.NewGuid(),
            }
        }
    }
}
