using Contracts.Requests.User;
using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Mappers
{
    public class UserMapper
    {
        public GetUserResponse ToDTO(User user)
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
        public User ToEntity(CreateUserRequest request)
        {
            return new User
            {
                Address = request.Address,
                Email = request.Email,
                Password = request.Password,
                PhoneNumber = request.PhoneNumber,
                Name = request.Name,
                Role = "user",
                Id = Guid.NewGuid(),
                LastUpdated = DateTime.UtcNow,
                
            };

        }


    }
}
