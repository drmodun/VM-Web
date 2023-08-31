using Contracts.Helpers.Hash;
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

        public async Task<string?> CreateUser(User user, CancellationToken cancellationToken)
        {
            await _validator.ValidateAndThrowAsync(user, cancellationToken);
            var code = Guid.NewGuid().ToString().Substring(1, 6).ToUpper();
            user.ActivationCode = code;
            await _context.Users.AddAsync(user, cancellationToken);
            return
                await _context.SaveChangesAsync(cancellationToken) > 0 ?
                code : null;

        }

        public async Task<bool> ActivateUser(string code, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.ActivationCode == code, cancellationToken);
            if (user == null || user.IsEmailConfirmed) { return false; }
            user.IsEmailConfirmed = true;
            _context.Update(user);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> ResetPassword(string code, string password, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.ActivationCode == code, cancellationToken);
            if (user == null || !user.IsEmailConfirmed) { return false; }
            user.Password = HashHelper.Hash(password);
            _context.Update(user);
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
            var userToEdit = await _context.Users.FirstOrDefaultAsync(x => x.Id == user.Id);
            if (userToEdit == null) { return false; }
            userToEdit.Name = user.Name;
            userToEdit.Email = user.Email;
            userToEdit.Address = user.Address;
            userToEdit.PhoneNumber = user.PhoneNumber;
            _context.Update(userToEdit);
            await _validator.ValidateAndThrowAsync(user, cancellationToken);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> ToggleAdmin(Guid id, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id, cancellationToken);
            if (user == null) { return false; }
            if (user.Claims.ContainsKey("admin"))
                user.Claims.Remove("admin");
            else
                user.Claims.Add("admin", "true");
            _context.Update(user);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
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
            return await _context.Users
                .Where(x => x.IsEmailConfirmed)
                .SingleOrDefaultAsync(x => x.Email == email);
        }

        public async Task<User?> GetUser(Guid id, CancellationToken cancellationToken)
        {
            return await _context
                .Users
                .Include(x => x.Transactions)
                .FirstOrDefaultAsync(b => b.Id == id, cancellationToken);
        }

        public async Task<IQueryable<User>> GetAllUsers(GetAllUsersRequest request, CancellationToken cancellationToken)
        {
            var users = _context.Users
                .Include(x => x.Transactions)
                    .ThenInclude(t => t.Product)
                .Include(x => x.Orders)
                    .ThenInclude(x => x.Service)
                .Where(x => request.Name == null || x.Name.ToLower().Contains(request.Name.ToLower()))
                .Where(x => request.Email == null || x.Email.Contains(request.Email))
                .Where(x => request.Address == null || x.Address.Contains(request.Address));

            //sorting
            if (request.Sorting != null)
            {
                Console.WriteLine("found");
                switch (request.Sorting.Attribute)
                {
                    case SortAttributeType.SortByName:
                        Console.WriteLine("found2");
                        if (request.Sorting.SortType == SortType.Ascending)
                        {
                            users = users.OrderBy(x => x.Name);
                            Console.WriteLine("found3");
                        }
                        else
                            users = users.OrderByDescending(x => x.Name);
                        break;

                    case SortAttributeType.SortByEmail:
                        if (request.Sorting.SortType == SortType.Ascending)
                            users = users.OrderBy(x => x.Email);
                        else
                            users = users.OrderByDescending(x => x.Email);
                        break;

                    case SortAttributeType.SortByQuantity:
                        if (request.Sorting.SortType == SortType.Ascending)
                            users = users.OrderBy(x => x.Transactions.Count);
                        else
                            users = users.OrderByDescending(x => x.Transactions.Count);
                        break;


                    case SortAttributeType.SortByUpdated:
                        if (request.Sorting.SortType == SortType.Ascending)
                            users = users.OrderBy(x => x.LastUpdated);
                        else
                            users = users.OrderByDescending(x => x.LastUpdated);
                        break;
                    case SortAttributeType.SortByProfit:
                        if (request.Sorting.SortType == SortType.Ascending)
                            users = users.OrderBy(x => x.Transactions.Sum(t => t.Product.Price * t.Quantity));
                        else
                            users = users.OrderByDescending(x => x.Transactions.Sum(t => t.Product.Price * t.Quantity));
                        break;
                    case SortAttributeType.SortByAddress:
                        if (request.Sorting.SortType == SortType.Ascending)
                            users = users.OrderBy(x => x.Address);
                        else
                            users = users.OrderByDescending(x => x.Address);
                        break;
                    case SortAttributeType.SortByAmountOfOrders:
                        if (request.Sorting.SortType == SortType.Ascending)
                            users = users.OrderBy(x => x.Orders.Count);
                        else
                            users = users.OrderByDescending(x => x.Orders.Count);
                        break;
                    case SortAttributeType.SortByOrderProfit:
                        if (request.Sorting.SortType == SortType.Ascending)
                            users = users.OrderBy(x => x.Orders.Sum(t => t.Service.Price));
                        else
                            users = users.OrderByDescending(x => x.Orders.Sum(t => t.Service.Price));
                        break;
                    default: break;
                }
            }

            //add sorting for orders later

            return users;
        }
        public async Task<bool> UpdateUserInfo(UpdateUserInfoRequest request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FindAsync(request.Id, cancellationToken);
            if (user == null)
                return false;
            user.Address = request.Address;
            user.Email = request.Email;
            user.Name = request.Name;
            user.PhoneNumber = request.PhoneNumber;
            user.LastUpdated = DateTime.UtcNow;
            _context.Update(user);
            return await _context.SaveChangesAsync(cancellationToken) > 0;

        }

        public async Task<bool> SaveCustomerToUser(string customerId, Guid userId, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId, cancellationToken);
            if (user == null) return false;
            user.CustomerId = customerId;
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<User?> GetMe(Guid id, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .Include(x => x.Transactions)
                .ThenInclude(x => x.Product)
                .Include(x => x.Orders)
                .ThenInclude(x => x.Service)
                .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
            return user;
        }
    }
}
