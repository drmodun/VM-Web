using Contracts.Requests.User;
using Contracts.Responses;
using Contracts.Responses.User;
using Domain.Mappers;
using Domain.Repositories;

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

        public async Task<CreateUserResponse> CreateUser(CreateUserRequest request, CancellationToken cancellationToken)
        {
            var user = _userMapper.ToEntity(request);
            var action = await _userRepo.CreateUser(user, cancellationToken);
            return new CreateUserResponse
            {
                Success = action
            };
        }

        public async Task<PutUserResponse> UpdateUser(PutUserRequest request, CancellationToken cancellationToken)
        {
            var user = _userMapper.ToUpdated(request);
            var action = await _userRepo.UpdateUser(user, cancellationToken);
            return new PutUserResponse
            {
                Success = action
            };
        }

        public async Task<DeleteUserResponse> DeleteUser(Guid id, CancellationToken cancellationToken)
        {
            var action = await _userRepo.DeleteUser(id, cancellationToken);
            return new DeleteUserResponse
            {
                Success = action
            };
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


            var pageInfo =
            new PageResponse
            {
                PageNumber = request.Pagination != null ? request.Pagination.PageNumber : 1,
                PageSize = request.Pagination != null ? request.Pagination.PageSize : list.Count,
                TotalItems = list.Count,
                TotalPages = request.Pagination != null ?
                (list.Count + request.Pagination.PageSize - 1) / request.Pagination.PageSize
                : 1
            };
            return new GetAllUsersResponse
            {
                Items = list,
                PageInfo = pageInfo
            };
        }

        public async Task<GetUserResponse?> GetUserByEmail(string email)
        {
            var user = await _userRepo.GetUserByEmail(email);
            if (user is null)
                return null;
            return _userMapper.ToDTO(user);
        }

        public async Task<CreateUserResponse?> CreateAdminUser(CreateUserRequest request, CancellationToken cancellationToken)
        {
            var admin = _userMapper.ToAdmin(request);
            var action = await _userRepo.CreateAdminUser(admin, cancellationToken);
            return new CreateUserResponse
            {
                Success = action
            };
        }

    }
}
