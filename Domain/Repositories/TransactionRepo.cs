using Contracts.Requests.Transaction;
using Data;
using Data.Enums;
using Data.Models;
using Domain.Validatiors;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

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
                .Include(x=>x.User)
                .Include(x=>x.Product)
                .FirstOrDefaultAsync(b=>b.Id == id, cancellationToken);
        }

        public async Task<List<Transaction>> GetAllTransactions(GetAllTransactionsRequest request, CancellationToken cancellationToken)
        {
            var transactions = _context.Transactions
                .Include(x => x.User)
                .Include(x => x.Product)
                .Where(x => request.ProductId == null || request.ProductId == x.ProductId)
                .Where(x => request.UserId == null || request.UserId == x.UserId)
                .Where(x => request.Type == null || request.Type == x.Type)
                .Where(x => request.MaxPrice == null || request.MaxPrice <= x.Product.Price * x.Quantity)
                .Where(x => request.MinPrice == null || request.MinPrice >= x.Product.Price * x.Quantity)
                .OrderBy(x => Guid.NewGuid());

            switch (request.Sorting.SortByDate)
            {
                case SortType.Ascending:
                    transactions.ThenBy(x => x.CreatedAt);
                    break;
                case SortType.Descending:
                    transactions.ThenByDescending(x => x.CreatedAt);
                    break;
                default:
                    break;
            }

            switch (request.Sorting.SortByPrice)
            {
                case SortType.Ascending:
                    transactions.ThenBy(x => x.Product.Price*x.Quantity);
                    break;
                case SortType.Descending:
                    transactions.ThenByDescending(x => x.Product.Price*x.Quantity);
                    break;
                default:
                    break;
            }

            switch (request.Sorting.SortByType)
            {
                case SortType.Ascending:
                    transactions.ThenBy(x => x.Type);
                    break;
                case SortType.Descending:
                    transactions.ThenByDescending(x => x.Type);
                    break;
                default:
                    break;
            }

            if (request.Pagination != null)
            {
                transactions.Skip((request.Pagination.PageNumber - 1) * request.Pagination.PageNumber);
                transactions.Take(request.Pagination.PageNumber);
            }

            return await transactions.ToListAsync();
        }


    }
}
