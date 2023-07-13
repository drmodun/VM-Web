using Contracts.Requests;
using Contracts.Requests.User;
using Data;
using Data.Enums;
using Data.Models;
using Domain.Validatiors;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Domain.Repositories
{
    public class UserRepo
    {
        private readonly Context _context;
        private readonly UserValidator _validator;
        public UserRepo(Context context, UserValidator validator)
        {
            _context = context;
            _validator = validator;
        }

        public async Task<bool> CreateUser(User user, CancellationToken cancellationToken)
        {
            await _validator.ValidateAndThrowAsync(user, cancellationToken);
            await _context.Users.AddAsync(user, cancellationToken);
            return await _context.SaveChangesAsync(cancellationToken) > 0;

        }

        public async Task<bool> CreateAdminUser(User user, CancellationToken cancellationToken)
        {
            await _validator.ValidateAndThrowAsync(user, cancellationToken);
            await _context.Users.AddAsync(user, cancellationToken);
            return await _context.SaveChangesAsync(cancellationToken) > 0;

        }

        public async Task<bool> UpdateUser(User user, CancellationToken cancellationToken)
        {
            _context.Update(user);
            await _validator.ValidateAndThrowAsync(user, cancellationToken);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteUser(Guid id, CancellationToken cancellationToken)
        {
            var userToDelete = await _context.Users.FindAsync(id, cancellationToken);
            if (userToDelete == null)
                return false;
            _context.Users.Remove(userToDelete);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<User?> GetUserByEmail(string email)
        {
            return await _context.Users.SingleOrDefaultAsync(x => x.Email == email);
        }

        public async Task<User?> GetUser(Guid id, CancellationToken cancellationToken)
        {
            return await _context
                .Users
                .Include(x => x.Transactions)
                .FirstOrDefaultAsync(b => b.Id == id, cancellationToken);
        }

        public async Task<List<User>> GetAllUsers(GetAllUsersRequest request, CancellationToken cancellationToken)
        {
            var users = _context.Users
                .Include(x => x.Transactions)
                    .ThenInclude(t => t.Product)
                .Include(x => x.Orders)
                    .ThenInclude(x => x.Service)
                //theese are for some views which will be added later, might make it into another function but I see no point for that right now
                .Where(x => request.Name == null || x.Name.Contains(request.Name))
                .Where(x => request.Email == null || x.Email.Contains(request.Email))
                .Where(x => request.Address == null || x.Address.Contains(request.Address));

            //sorting
            if (request.Sorting != null)
            {
                switch (request.Sorting.Attribute)
                {
                    case SortAttributeType.SortByName:
                        if (request.Sorting.SortType == SortType.Ascending)
                            users.OrderBy(x => x.Name);
                        else
                            users.OrderByDescending(x => x.Name);
                        break;
                    case SortAttributeType.SortByQuantity:
                        if (request.Sorting.SortType == SortType.Ascending)
                            users.OrderBy(x => x.Transactions.Count);
                        else
                            users.OrderByDescending(x => x.Transactions.Count);
                        break;


                    case SortAttributeType.SortByUpdated:
                        if (request.Sorting.SortType == SortType.Ascending)
                            users.OrderBy(x => x.LastUpdated);
                        else
                            users.OrderByDescending(x => x.LastUpdated);
                        break;
                    case SortAttributeType.SortByProfit:
                        if (request.Sorting.SortType == SortType.Ascending)
                            users.OrderBy(x => x.Transactions.Sum(t => t.Product.Price * t.Quantity));
                        else
                            users.OrderByDescending(x => x.Transactions.Sum(t => t.Product.Price * t.Quantity));
                        break;
                    case SortAttributeType.SortByAddress:
                        if (request.Sorting.SortType == SortType.Ascending)
                            users.OrderBy(x => x.Address);
                        else
                            users.OrderByDescending(x => x.Address);
                        break;
                    case SortAttributeType.SortByAmountOfOrders:
                        if (request.Sorting.SortType == SortType.Ascending)
                            users.OrderBy(x => x.Orders.Count);
                        else
                            users.OrderByDescending(x => x.Orders.Count);
                        break;
                    case SortAttributeType.SortByOrderProfit:
                        if (request.Sorting.SortType == SortType.Ascending)
                            users.OrderBy(x => x.Orders.Sum(t => t.Service.Price));
                        else
                            users.OrderByDescending(x => x.Orders.Sum(t => t.Service.Price));
                        break;
                    default: break;
                }
            }


            //add sorting for orders later

            if (request.Pagination != null)
            {
                users.Skip(request.Pagination.PageSize * (request.Pagination.PageNumber - 1));
                users.Take(request.Pagination.PageNumber);
            }
            return await users.ToListAsync(cancellationToken);
        }

    }
}
