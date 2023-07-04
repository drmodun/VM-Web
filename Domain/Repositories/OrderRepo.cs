using Contracts.Requests.Order;
using Data;
using Data.Enums;
using Data.Models;
using Domain.Validatiors;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Domain.Repositories
{
    public class OrderRepo
    {
        private readonly Context _context;
        private readonly OrderValidator _validator;

        public OrderRepo(Context context, OrderValidator validator)
        {
            _context = context;
            _validator = validator;
        }

        public async Task<bool> CreateOrder(Order order, CancellationToken cancellationToken)
        {
            await _validator.ValidateAndThrowAsync(order, cancellationToken);
            await _context.Orders.AddAsync(order, cancellationToken);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> UpdateOrder(Order order, CancellationToken cancellationToken)
        {
            await _validator.ValidateAndThrowAsync(order, cancellationToken);
            _context.Orders.Update(order);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> DeleteOrder(Guid id, CancellationToken cancellationToken)
        {
            var order = await _context.Orders.FindAsync(id, cancellationToken);
            if (order == null) { return false; }
            _context.Orders.Remove(order);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<Order?> GetOrder(Guid id, CancellationToken cancellationToken)
        {
            return await _context.Orders
                .Include(x => x.User)
                .Include(x => x.Service)
                .FirstOrDefaultAsync(b => b.Id == id, cancellationToken);
        }

        public async Task<List<Order>> GetAllOrders(GetAllOrdersRequest request, CancellationToken cancellationToken)
        {
            var Orders = _context.Orders
                .Include(x => x.User)
                .Include(x => x.Service)
                .Where(x => request.ServiceId == null || request.ServiceId == x.ServiceId)
                .Where(x => request.UserId == null || request.UserId == x.UserId)
                .Where(x => request.Type == null || request.Type == x.Service.ServiceType)
                .Where(x => request.MaxPrice == null || request.MaxPrice <= x.Service.Price)
                .Where(x => request.MinPrice == null || request.MinPrice >= x.Service.Price)
                .OrderBy(x => Guid.NewGuid());

            switch (request.Sorting.SortByDate)
            {
                case SortType.Ascending:
                    Orders.ThenBy(x => x.Created);
                    break;
                case SortType.Descending:
                    Orders.ThenByDescending(x => x.Created);
                    break;
                default:
                    break;
            }

            switch (request.Sorting.SortByPrice)
            {
                case SortType.Ascending:
                    Orders.ThenBy(x => x.Service.Price);
                    break;
                case SortType.Descending:
                    Orders.ThenByDescending(x => x.Service.Price);
                    break;
                default:
                    break;
            }

            switch (request.Sorting.SortByType)
            {
                case SortType.Ascending:
                    Orders.ThenBy(x => x.Service.ServiceType);
                    break;
                case SortType.Descending:
                    Orders.ThenByDescending(x => x.Service.ServiceType);
                    break;
                default:
                    break;
            }

            if (request.Pagination != null)
            {
                Orders.Skip((request.Pagination.PageNumber - 1) * request.Pagination.PageNumber);
                Orders.Take(request.Pagination.PageNumber);
            }

            return await Orders.ToListAsync();
        }

    }
}
