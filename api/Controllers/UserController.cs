using api.Auth;
using Contracts.Requests.User;
using Contracts.Responses.User;
using Domain.Services;
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
        [HttpPut(Routes.User.Update)]
        public async Task<ActionResult<PutUserResponse>> UpdateUser([FromRoute] Guid id, [FromBody] PutUserRequest request, CancellationToken cancellationToken)
        {
            request.Id = id;
            var response = await _userService.UpdateUser(request, cancellationToken);
            return response.Success ? Ok(response) : BadRequest(response);
        }
        [HttpDelete(Routes.User.Delete)]
        public async Task<ActionResult<DeleteUserResponse>> DeleteUser([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var response = await _userService.DeleteUser(id, cancellationToken);
            return response.Success ? Ok(response) : NotFound(response);
        }

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


    }
}
