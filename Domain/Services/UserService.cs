using Contracts.Email;
using Contracts.Requests.User;
using Contracts.Responses;
using Contracts.Responses.User;
using Domain.Mappers;
using Domain.Repositories;
using Email;
using System;

namespace Domain.Services
{
    public class UserService
    {
        private readonly UserRepo _userRepo;
        private readonly RazorViewToStringRenderer _viewToStringRenderer;
        public UserService(UserRepo userRepo, RazorViewToStringRenderer viewToStringRenderer)
        {
            _userRepo = userRepo;
            _viewToStringRenderer = viewToStringRenderer;
        }

        public async Task<CreateUserResponse> CreateUser(CreateUserRequest request, CancellationToken cancellationToken)
        {
            var user = UserMapper.ToEntity(request);
            var action = await _userRepo.CreateUser(user, cancellationToken);
            var emailModel = new UserActivationModel
            {
                //TODO: change on deploy
                Name = user.Name,
                Link = "https://vm-racunala.netlify.app/#/activate?code=" + action,
            };
            var email = await _viewToStringRenderer.RenderViewToStringAsync(Templates.ActivateAccountView, emailModel);
            var emailSend = await EmailSender.SendEmail(request.Email, "Account creation", email);
            return new CreateUserResponse
            {
                Success = action != null && emailSend && email != null
            };
        }

        public async Task<bool> ResetPassword(string code, string password, CancellationToken cancellationToken)
        {
            var action = await _userRepo.ResetPassword(code, password, cancellationToken);
            return action;

        }

        public async Task<bool> SendResetEmail(string email, CancellationToken cancellationToken)
        {
            var user = await _userRepo.GetUserByEmail(email);
            if (user == null) { return false; }
            var emailModel = new ChangePasswordModel
            {
                Name = user.Name,
                Link = "https://vm-racunala.netlify.app/#/reset?code=" + user.ActivationCode,
            };
            var newEmail = await _viewToStringRenderer.RenderViewToStringAsync(Templates.PasswordResetView, emailModel);
            var emailSend = await EmailSender.SendEmail(email, "Password change", newEmail);
            return user != null && emailSend && newEmail != null;
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

        public async Task<bool> ToggleAdmin(Guid id, CancellationToken cancellationToken)
        {
            var action = await _userRepo.ToggleAdmin(id, cancellationToken);
            return action;
        }

        public async Task<ActivateUserResponse> ActivateUser(string code, CancellationToken cancellationToken)
        {
            var action = await _userRepo.ActivateUser(code, cancellationToken);
            return new ActivateUserResponse
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
                Page = request.Pagination != null ? request.Pagination.PageNumber : 1,
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
