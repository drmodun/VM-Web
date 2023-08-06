using Contracts.Requests;
using Contracts.Requests.Transaction;
using Data;
using Data.Enums;
using Data.Models;
using Domain.Validatiors;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Domain.Repositories
{
    public class TransactionRepo
    {
        private readonly Context _context;
        private readonly TransactionValidator _validator;

        public TransactionRepo(Context context, TransactionValidator validator)
        {
            _context = context;
            _validator = validator;
        }

        public async Task<bool> CreateTransaction(Transaction transaction, CancellationToken cancellationToken)
        {
            var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == transaction
            .ProductId);
            transaction.PricePerUnit = product.Price;
            await _validator.ValidateAndThrowAsync(transaction, cancellationToken);
            await _context.Transactions.AddAsync(transaction, cancellationToken);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> UpdateTransaction(Transaction transaction, CancellationToken cancellationToken)
        {
            await _validator.ValidateAndThrowAsync(transaction, cancellationToken);
            _context.Transactions.Update(transaction);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> DeleteTransaction(Guid id, CancellationToken cancellationToken)
        {
            var transaction = await _context.Transactions.FindAsync(id, cancellationToken);
            if (transaction == null) { return false; }
            _context.Transactions.Remove(transaction);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<Transaction?> GetTransaction(Guid id, CancellationToken cancellationToken)
        {
            return await _context.Transactions
                .Include(x => x.User)
                .Include(x => x.Product)
                .FirstOrDefaultAsync(b => b.Id == id, cancellationToken);
        }

        public async Task<IQueryable<Transaction>> GetAllTransactions(GetAllTransactionsRequest request, CancellationToken cancellationToken)
        {
            var transactions = _context.Transactions
                .Include(x => x.User)
                .Include(x => x.Product)
                .AsNoTracking()
                .Where(x => request.CreatedAt == null || request.CreatedAt == x.CreatedAt)
                .Where(x => request.ProductId == null || request.ProductId == x.ProductId)
                .Where(x => request.UserId == null || request.UserId == x.UserId)
                .Where(x => request.Type == null || request.Type == x.Type)
                .Where(x => request.MaxPrice == null || request.MaxPrice <= x.Product.Price * x.Quantity)
                .Where(x => request.MinPrice == null || request.MinPrice >= x.Product.Price * x.Quantity);

            if (request.Sorting != null)
            {
                switch (request.Sorting.Attribute)
                {
                    case SortAttributeType.SortByName:
                        if (request.Sorting.SortType == SortType.Ascending)
                            transactions = transactions.OrderBy(x => x.Product.Name);
                        else
                            transactions = transactions.OrderByDescending(x => x.Product.Name);
                        break;
                    case SortAttributeType.SortByProfit:
                        if (request.Sorting.SortType == SortType.Ascending)
                            transactions = transactions.OrderBy(x => x.Product.Price * x.Quantity);
                        else
                            transactions = transactions.OrderByDescending(x => x.Product.Price * x.Quantity);
                        break;
                    case SortAttributeType.SortByQuantity:
                        if (request.Sorting.SortType == SortType.Ascending)
                            transactions = transactions.OrderBy(x => x.Quantity);
                        else
                            transactions = transactions.OrderByDescending(x => x.Quantity);
                        break;

                    case SortAttributeType.SortByUpdated:
                        if (request.Sorting.SortType == SortType.Ascending)
                            transactions = transactions.OrderBy(x => x.CreatedAt);
                        else
                            transactions = transactions.OrderByDescending(x => x.CreatedAt);
                        break;
                    case SortAttributeType.SortByType:
                        if (request.Sorting.SortType == SortType.Ascending)
                            transactions = transactions.OrderBy(x => x.Type);
                        else
                            transactions = transactions.OrderByDescending(x => x.Type);
                        break;
                    default: break;
                }
            }

            return transactions;
        }


    }
}
