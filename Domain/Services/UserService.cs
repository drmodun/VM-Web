using Contracts.Requests.User;
using Contracts.Responses.User;
using Domain.Mappers;
using Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public class UserService
    {
        private readonly UserRepo _userRepo;
        private readonly UserMapper _userMapper;

        public UserService(UserRepo userRepo, UserMapper userMapper)
        {
            _userRepo = userRepo;
            _userMapper = userMapper;
        }

        public async Task<bool> CreateUser(CreateUserRequest request, CancellationToken cancellationToken)
        {
            var user = _userMapper.ToEntity(request);
            return await _userRepo.CreateUser(user, cancellationToken);
        }

        public async Task<bool> UpdateUser(PutUserRequest request, CancellationToken cancellationToken)
        {
            var user = _userMapper.ToUpdated(request);
            return await _userRepo.UpdateUser(user, cancellationToken);
        }

        public async Task<bool> DeleteUser(Guid id, CancellationToken cancellationToken)
        {
            return await _userRepo.DeleteUser(id, cancellationToken);
        }

        public async Task<GetUserResponse?> GetUser(Guid id, CancellationToken cancellationToken)
        {
            var user = await _userRepo.GetUser(id, cancellationToken);
            if (user is null)
                return null;
            return _userMapper.ToDTO(user);
        }

        public async Task<List<GetUserResponse>> GetAllUsers(GetAllUsersRequest request, CancellationToken cancellationToken)
        {
            var users = await _userRepo.GetAllUsers(request, cancellationToken);
            return users.Select(x => _userMapper.ToDTO(x)).ToList();
        }
    }
}
