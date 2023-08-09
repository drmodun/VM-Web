using Contracts.Helpers.Hash;
using Contracts.Requests.User;
using Contracts.Responses.User;
using Data.Models;

namespace Domain.Mappers
{
    public static class UserMapper
    {
        public static GetUserResponse ToDTO(User user)
        {
            return new GetUserResponse
            {
                Id = user.Id,
                Address = user.Address,
                Email = user.Email,
                LastUpdate = user.LastUpdated,
                Name = user.Name,
                PhoneNumber = user.PhoneNumber
            };
        }
        public static User ToUpdated(PutUserRequest request)
        {
            return new User
            {
                Address = request.Address,
                Email = request.Email,
                Password = request.Password,
                PhoneNumber = request.PhoneNumber,
                Name = request.Name,
                Role = "user",
                Id = request.Id,
                LastUpdated = DateTime.UtcNow,

            };

        }

        public static GetMeResponse ToMe(User user)
        {
            return new GetMeResponse
            {
                User = ToDTO(user),
                OrderCount = user.Orders.Count,
                TransactionCount = user.Transactions.Count,
                Orders = user.Orders.Select(OrderMapper.ToDTO).ToList(),
                Transactions = user.Transactions.Select(TransactionMapper.ToDTO
                ).ToList(),
                TotalSpent = user.Transactions.Sum(x => x.Quantity * x.PricePerUnit),
                HasCardInfo = user.CustomerId != null,
            };
        }
        public static User ToEntity(CreateUserRequest request)
        {
            return new User
            {
                Address = request.Address,
                Email = request.Email,
                Password = HashHelper.Hash(request.Password),
                PhoneNumber = request.PhoneNumber,
                Name = request.Name,
                Role = "user",
                Claims = new Dictionary<string, string> {
                    { "user", "true" },
                },
                Id = Guid.NewGuid(),
                LastUpdated = DateTime.UtcNow,

            };

        }

        public static User ToAdmin(CreateUserRequest request)
        {
            return new User
            {
                Address = request.Address,
                Email = request.Email,
                Password = HashHelper.Hash(request.Password),
                PhoneNumber = request.PhoneNumber,
                Name = request.Name,
                Role = "user",
                Claims = new Dictionary<string, string> {
                    { "user", "true" },
                    { "admin", "true" },
                },
                Id = Guid.NewGuid(),
                LastUpdated = DateTime.UtcNow,

            };
        }


    }
}
