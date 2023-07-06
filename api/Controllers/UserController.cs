using api.Auth;
using Contracts.Constants;
using Contracts.Requests.User;
using Contracts.Responses.User;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]

    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly IdentityService _identityService;

        public UserController(UserService userService, IdentityService identityService)
        {
            _userService = userService;
            _identityService = identityService;
        }

        [HttpGet(Routes.User.Get)]
        public async Task<ActionResult<GetUserResponse>> GetUser([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var response = await _userService.GetUser(id, cancellationToken);
            return response != null ? Ok(response) : NotFound("No user with the given paramaters was found");
        }
        [HttpGet(Routes.User.GetAll)]
        public async Task<ActionResult<GetAllUsersResponse>> GetAllUsers([FromQuery] GetAllUsersRequest request, CancellationToken cancellationToken)
        {
            var response = await _userService.GetAllUsers(request, cancellationToken);
            return Ok(response);
        }
        [HttpPost(Routes.User.Create)]
        public async Task<ActionResult<CreateUserResponse>> CreateUser([FromBody] CreateUserRequest request, CancellationToken cancellationToken)
        {
            var response = await _userService.CreateUser(request, cancellationToken);
            return response.Success ? Ok(response) : BadRequest(response);
        }
        [Authorize(AuthConstants.TrustMemberPolicyName)]
        [HttpPut(Routes.User.Update)]
        public async Task<ActionResult<PutUserResponse>> UpdateUser([FromBody] PutUserRequest request, CancellationToken cancellationToken)
        {
            request.Id = (Guid)HttpContext.GetUserId();
            var response = await _userService.UpdateUser(request, cancellationToken);
            return response.Success ? Ok(response) : BadRequest(response);
        }
        [Authorize(AuthConstants.TrustMemberPolicyName)]
        [HttpDelete(Routes.User.Delete)]
        public async Task<ActionResult<DeleteUserResponse>> DeleteUser(CancellationToken cancellationToken)
        {
            var id = (Guid)HttpContext.GetUserId();
            var response = await _userService.DeleteUser(id, cancellationToken);
            return response.Success ? Ok(response) : NotFound(response);
        }

        [Authorize(AuthConstants.AdminUserPolicyName)]
        [HttpDelete(Routes.User.AdminDelete)]
        public async Task<ActionResult<DeleteUserResponse>> DeleteUserByAdmin([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var response = await _userService.DeleteUser(id, cancellationToken);
            return response.Success ? Ok(response) : NotFound(response);
        }

        [Authorize(AuthConstants.AdminUserPolicyName)]
        [HttpPut(Routes.User.AdminDelete)]
        public async Task<ActionResult<PutUserResponse>> UpdateUserByAdmin([FromRoute] Guid id, [FromBody] PutUserRequest request, CancellationToken cancellationToken)
        {
            request.Id = id;
            var response = await _userService.UpdateUser(request, cancellationToken);
            return response.Success ? Ok(response) : BadRequest(response);
        }

        [Authorize(AuthConstants.TrustMemberPolicyName)]
        [HttpGet(Routes.User.GetMe)]
        public async Task<ActionResult<GetUserResponse?>> GetMe(CancellationToken cancellationToken)
        {
            var id = HttpContext.GetUserId();
            if (id == null)
                return NotFound(HttpContext.GetUserId());
            var user = await _userService.GetUser((Guid)id, cancellationToken);
            if (user == null)
                return NotFound(HttpContext.GetUserId());
            return Ok(user);
        }

        [HttpPost(Routes.User.Login)]
        public async Task<ActionResult<string>> LoginUser([FromBody] LoginRequest request, CancellationToken cancellationToken)
        {
            var response = await _identityService.LoginUser(request);
            return response != null ? Ok(response) : BadRequest("Wrong password");
        }
        //        [Authorize(AuthConstants.AdminUserPolicyName)]
        [HttpPost(Routes.User.AdminCreate)]
        public async Task<ActionResult<CreateUserResponse>> AdminCreateUser([FromBody] CreateUserRequest request, CancellationToken cancellationToken)
        {
            var response = await _userService.CreateAdminUser(request, cancellationToken);
            return response.Success ? Ok(response) : BadRequest(response);
        }


    }
}
