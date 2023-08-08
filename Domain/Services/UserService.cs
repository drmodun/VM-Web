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

        public UserService(UserRepo userRepo)
        {
            _userRepo = userRepo;
        }

        public async Task<CreateUserResponse> CreateUser(CreateUserRequest request, CancellationToken cancellationToken)
        {
            var user = UserMapper.ToEntity(request);
            var action = await _userRepo.CreateUser(user, cancellationToken);
            return new CreateUserResponse
            {
                Success = action
            };
        }

        public async Task<PutUserResponse> UpdateUser(PutUserRequest request, CancellationToken cancellationToken)
        {
            var user = UserMapper.ToUpdated(request);
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
            return UserMapper.ToDTO(user);
        }

        public async Task<GetAllUsersResponse> GetAllUsers(GetAllUsersRequest request, CancellationToken cancellationToken)
        {
            var users = await _userRepo.GetAllUsers(request, cancellationToken);


            var pageInfo =
            new PageResponse
            {
                PageNumber = request.Pagination != null ? request.Pagination.PageNumber : 1,
                PageSize = request.Pagination != null ? request.Pagination.PageSize : users.Count(),
                TotalItems = users.Count(),
                TotalPages = request.Pagination != null ?
                (users.Count() + request.Pagination.PageSize - 1) / request.Pagination.PageSize
                : 1
            };
            if (request.Pagination != null)
                users = users.Skip(request.Pagination.PageSize * (request.Pagination.PageNumber - 1)).Take(request.Pagination.PageSize);

            var list = users.Select(x => UserMapper.ToDTO(x)).ToList();
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
            return UserMapper.ToDTO(user);
        }

        public async Task<GetMeResponse?> GetMe(Guid id, CancellationToken cancellationToken)
        {
            var user = await _userRepo.GetMe(id, cancellationToken);
            if (user is null)
                return null;
            return UserMapper.ToMe(user);
        }

        public async Task<bool> SaveCustomerToUser(string customerId, Guid userId, CancellationToken cancellationToken)
        {
            return await _userRepo.SaveCustomerToUser(customerId, userId, cancellationToken);
        }

        public async Task<CreateUserResponse?> CreateAdminUser(CreateUserRequest request, CancellationToken cancellationToken)
        {
            var admin = UserMapper.ToAdmin(request);
            var action = await _userRepo.CreateAdminUser(admin, cancellationToken);
            return new CreateUserResponse
            {
                Success = action
            };
        }

        public async Task<PutUserResponse> UpdateUserInfo(UpdateUserInfoRequest request, CancellationToken cancellationToken)
        {
            var action = await _userRepo.UpdateUserInfo(request, cancellationToken);
            return new PutUserResponse
            {
                Success = action
            };
        }

        public async Task<string?> GetCustomerId(Guid userId, CancellationToken cancellationToken)
        {
            var user = await _userRepo.GetUser(userId, cancellationToken);
            if (user is null) return null;
            return user.CustomerId;
        }

    }
}
