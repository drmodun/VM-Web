using api.Auth;
using Contracts.Constants;
using Contracts.Requests.User;
using Contracts.Responses.Cart;
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
        private readonly CartService _cartService;
        private readonly IdentityService _identityService;

        public UserController(UserService userService, CartService cartService, IdentityService identityService)
        {
            _userService = userService;
            _cartService = cartService;
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
        [HttpPut(Routes.User.AdminEdit)]
        public async Task<ActionResult<PutUserResponse>> UpdateUserByAdmin([FromRoute] Guid id, [FromBody] PutUserRequest request, CancellationToken cancellationToken)
        {
            request.Id = id;
            var response = await _userService.UpdateUser(request, cancellationToken);
            return response.Success ? Ok(response) : BadRequest(response);
        }

        [Authorize(AuthConstants.TrustMemberPolicyName)]
        [HttpGet(Routes.User.GetMe)]
        public async Task<ActionResult<GetMeResponse?>> GetMe(CancellationToken cancellationToken)
        {
            var id = HttpContext.GetUserId();
            if (id == null)
                return NotFound(HttpContext.GetUserId());
            var user = await _userService.GetMe((Guid)id, cancellationToken);
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
        [Authorize(AuthConstants.AdminUserPolicyName)]
        [HttpPost(Routes.User.AdminCreate)]
        public async Task<ActionResult<CreateUserResponse>> AdminCreateUser([FromBody] CreateUserRequest request, CancellationToken cancellationToken)
        {
            var response = await _userService.CreateAdminUser(request, cancellationToken);
            return response.Success ? Ok(response) : BadRequest(response);
        }

        [Authorize(AuthConstants.AdminUserPolicyName)]
        [HttpPut(Routes.User.AdminToggle)]
        public async Task<ActionResult<bool>> AdminToggle([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var response = await _userService.ToggleAdmin(id, cancellationToken);
            return response ? Ok(response) : BadRequest(response);
        }

        [Authorize(AuthConstants.TrustMemberPolicyName)]
        [HttpPost(Routes.User.AddToCart)]
        public async Task<ActionResult<bool>> AddToCart([FromRoute] Guid productId, [FromBody] int quantity, CancellationToken cancellationToken)
        {
            if (quantity <= 0)
                return BadRequest("You cannot buy negative products");
            var id = HttpContext.GetUserId();
            var response = await _cartService.AddToCart((Guid)id, productId, quantity, cancellationToken);
            return response ? Ok(response) : BadRequest(response);
        }
        [Authorize(AuthConstants.TrustMemberPolicyName)]
        [HttpPost(Routes.User.BuyCart)]
        public async Task<ActionResult<bool>> BuyCart(CancellationToken cancellationToken)
        {
            var id = HttpContext.GetUserId();
            var response = await _cartService.BuyCart((Guid)id, cancellationToken);
            return response ? Ok(response) : BadRequest(response);
        }

        [Authorize(AuthConstants.TrustMemberPolicyName)]
        [HttpDelete(Routes.User.RemoveCart)]
        public async Task<ActionResult<bool>> RemoveCart(CancellationToken cancellationToken)
        {
            var id = HttpContext.GetUserId();
            var response = await _cartService.RemoveCart((Guid)id, cancellationToken);
            return response ? Ok(response) : BadRequest(response);
        }

        [Authorize(AuthConstants.TrustMemberPolicyName)]
        [HttpDelete(Routes.User.RemoveFromCart)]
        public async Task<ActionResult<bool>> RemoveFromCart([FromRoute] Guid productId, CancellationToken cancellationToken)
        {
            var id = HttpContext.GetUserId();
            var response = await _cartService.RemoveFromCart((Guid)id, productId, cancellationToken);
            return response ? Ok(response) : NotFound(response);
        }

        [Authorize(AuthConstants.TrustMemberPolicyName)]
        [HttpGet(Routes.User.GetCart)]
        public async Task<ActionResult<CartResponse>> GetCart(CancellationToken cancellationToken)
        {
            var id = HttpContext.GetUserId();
            var response = await _cartService.GetCart((Guid)id, cancellationToken);
            return response != null ? Ok(response) : NotFound(response);
        }
        [Authorize(AuthConstants.TrustMemberPolicyName)]
        [HttpPut(Routes.User.UpdateCart)]
        public async Task<ActionResult<bool>> UpdateConnection([FromRoute] Guid productId, [FromBody] int quantity, CancellationToken cancellationToken)
        {
            if (quantity <= 0)
                return BadRequest("You cannot buy negative products");
            var id = HttpContext.GetUserId();
            var response = await _cartService.UpdateConnection((Guid)id, productId, quantity, cancellationToken);
            return response ? Ok(response) : NotFound(response);
        }
        [Authorize(AuthConstants.AdminUserPolicyName)]
        [HttpPut(Routes.User.Edit)]
        public async Task<ActionResult<bool>> Edit([FromBody] UpdateUserInfoRequest request, CancellationToken cancellationToken)
        {
            var id = HttpContext.GetUserId();
            request.Id = (Guid)id;
            var action = await _userService.UpdateUserInfo(request, cancellationToken);
            return action.Success ? Ok(action) : NotFound(action);
        }


        [HttpGet(Routes.User.ActivateUser)]
        public async Task<ActionResult<ActivateUserResponse>> ActivateUser([FromRoute] string code, CancellationToken cancellationToken)
        {
            var action = await _userService.ActivateUser(code, cancellationToken);
            return action.Success ? Ok(action) : NotFound(action);
        }

        [HttpPost(Routes.User.ResetPasswordEmail)]
        public async Task<ActionResult<bool>> ResetPasswordEmail([FromBody] string email, CancellationToken cancellationToken)
        {
            var action = await _userService.SendResetEmail(email, cancellationToken);
            return action ? Ok(action) : NotFound(action);
        }

        [HttpPost(Routes.User.ResetPassword)]
        public async Task<ActionResult<bool>> ResetPassword([FromRoute] string code, [FromBody] string password, CancellationToken cancellationToken)
        {
            var action = await _userService.ResetPassword(code, password, cancellationToken);
            return action ? Ok(action) : NotFound(action);
        }



        //TODO: Make functions for adding and removing admins (makoing normal accounts admin and vice versa)


    }
}
