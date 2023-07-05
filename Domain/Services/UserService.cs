using Contracts.Requests.User;
using Contracts.Responses.Product;
using Contracts.Responses;
using Data.Models;
using Domain.Mappers;
using Domain.Repositories;
using Contracts.Responses.User;

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
            var action = await _userRepo.CreateUser(user, cancellationToken);
        }

        public async Task<bool> UpdateUser(PutUserRequest request, CancellationToken cancellationToken)
        {
            var user = _userMapper.ToUpdated(request);
            var action = await _userRepo.UpdateUser(user, cancellationToken);
        }

        public async Task<bool> DeleteUser(Guid id, CancellationToken cancellationToken)
        {
            var action = await _userRepo.DeleteUser(id, cancellationToken);
        }

        public async Task<GetUserResponse?> GetUser(Guid id, CancellationToken cancellationToken)
        {
            var user = await _userRepo.GetUser(id, cancellationToken);
            if (user is null)
                return null;
            return _userMapper.ToDTO(user);
        }

        public async Task<GetAllUsersResponse> GetAllUsers(GetAllUsersRequest request, CancellationToken cancellationToken)
        {
            var users = await _userRepo.GetAllUsers(request, cancellationToken);
            var list = users.Select(x => _userMapper.ToDTO(x)).ToList();


            var pageInfo = request.Pagination is null ? null
            : new PageResponse
            {
                PageNumber = request.Pagination.PageNumber,
                PageSize = request.Pagination.PageSize
            };
            return new GetAllUsersResponse
            {
                Users = list,
                PageInfo = pageInfo
            };
        }
    }
}
