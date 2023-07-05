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

        public async Task<User?> GetUser(Guid id, CancellationToken cancellationToken)
        {
            return await _context.Users.FirstOrDefaultAsync(b => b.Id == id, cancellationToken);
        }

        public async Task<List<User>> GetAllUsers(GetAllUsersRequest request, CancellationToken cancellationToken)
        {
            var users = _context.Users
                .Where(x => request.Name == null || x.Name.Contains(request.Name))
                .Where(x => request.Email == null || x.Email.Contains(request.Email))
                .Where(x => request.Address == null || x.Address.Contains(request.Address))
                .OrderBy(x => Guid.NewGuid());

            //sorting
            if (request.Sorting != null)
            {
                switch (request.Sorting.SortByName)
                {
                    case SortType.Ascending:
                        users.ThenBy(x => x.Name);
                        break;
                    case SortType.Descending:
                        users.ThenByDescending(x => x.Name);
                        break;
                    default:
                        break;
                }

                switch (request.Sorting.SortByAddress)
                {
                    case SortType.Ascending:
                        users.ThenBy(x => x.Address);
                        break;
                    case SortType.Descending:
                        users.ThenByDescending(x => x.Address);
                        break;
                    default:
                        break;
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
