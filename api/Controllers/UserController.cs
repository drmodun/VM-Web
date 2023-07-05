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

        public UserController(UserService userService)
        {
            _userService = userService;
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
        [HttpPost(Routes.User.Update)]
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


    }
}
