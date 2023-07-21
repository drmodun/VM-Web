using Contracts.Requests;
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
            var orders = _context.Orders
                .Include(x => x.User)
                .Include(x => x.Service)
                .Where(x => request.ServiceId == null || request.ServiceId == x.ServiceId)
                .Where(x => request.UserId == null || request.UserId == x.UserId)
                .Where(x => request.Type == null || request.Type == x.Service.ServiceType)
                .Where(x => request.MaxPrice == null || request.MaxPrice <= x.Service.Price)
                .Where(x => request.MinPrice == null || request.MinPrice >= x.Service.Price)
;
            if (request.Sorting != null)
            {

                switch (request.Sorting.Attribute)
                {
                    case SortAttributeType.SortByDeadline:
                        if (request.Sorting.SortType == SortType.Ascending)
                            orders = orders.OrderBy(x => x.Deadline);
                        else
                            orders = orders.OrderByDescending(x => x.Deadline);
                        break;
                    case SortAttributeType.SortByPrice:
                        if (request.Sorting.SortType == SortType.Ascending)
                            orders = orders.OrderBy(x => x.Service.Price);
                        else
                            orders = orders.OrderByDescending(x => x.Service.Price);
                        break;

                    case SortAttributeType.SortByType:
                        if (request.Sorting.SortType == SortType.Ascending)
                            orders = orders.OrderBy(x => x.Service.ServiceType);
                        else
                            orders = orders.OrderByDescending(x => x.Service.ServiceType);
                        break;
                    case SortAttributeType.SortByUpdated:
                        if (request.Sorting.SortType == SortType.Ascending)
                            orders = orders.OrderBy(x => x.Created);
                        else
                            orders = orders.OrderByDescending(x => x.Created);
                        break;


                    default: break;
                }
            }

            if (request.Pagination != null)
            {
                orders = orders.Skip((request.Pagination.PageNumber - 1) * request.Pagination.PageNumber).Take(request.Pagination.PageNumber);
            }

            return await orders.ToListAsync();
        }

    }
}
