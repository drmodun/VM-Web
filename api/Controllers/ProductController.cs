using api.Auth;
using Contracts.Constants;
using Contracts.Requests.Product;
using Contracts.Responses.Product;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{

    [ApiController]

    public class ProductController : ControllerBase
    {
        private readonly ProductService _productService;

        public ProductController(ProductService productService)
        {
            _productService = productService;
        }

        [HttpGet(Routes.Product.GetAll)]
        public async Task<ActionResult<GetAllProductsResponse>> GetAllProducts([FromQuery] GetAllProductsRequest request, CancellationToken cancellationToken)
        {
            var response = await _productService.GetAllProducts(request, cancellationToken);
            return Ok(response);
        }
        [Authorize(AuthConstants.AdminUserPolicyName)]
        [HttpPost(Routes.Product.Create)]
        public async Task<ActionResult<CreateProductResponse>> CreateProduct([FromBody] CreateProductRequest request, CancellationToken cancellationToken)
        {
            var response = await _productService.CreateProduct(request, cancellationToken);
            return response.Success ? Ok(response) : BadRequest(response);
            //later fix this bug
        }
        [Authorize(AuthConstants.AdminUserPolicyName)]
        [HttpPut(Routes.Product.Update)]
        public async Task<ActionResult<PutProductResponse>> UpdateProduct([FromRoute] Guid id, [FromBody] PutProductRequest request, CancellationToken cancellationToken)
        {
            request.Id = id;
            var response = await _productService.UpdateProduct(request, cancellationToken);
            return response.Success ? Ok(response) : BadRequest(response);
        }
        [Authorize(AuthConstants.AdminUserPolicyName)]
        [HttpDelete(Routes.Product.Delete)]
        public async Task<ActionResult<DeleteProductResponse>> DeleteProduct([FromRoute] Guid id, CancellationToken cancellationToken)
        {

            var response = await _productService.DeleteProduct(id, cancellationToken);
            return response.Success ? Ok(response) : NotFound(response);
        }
        [HttpGet(Routes.Product.Get)]
        public async Task<ActionResult<GetProductResponse>> GetProduct([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var response = await _productService.GetProduct(id, cancellationToken);
            return response != null ? Ok(response) : NotFound("No product with the given paramaters was found");
        }

        [HttpGet(Routes.Product.GetSimilar)]
        public async Task<ActionResult<GetSimilarResponse>> GetSimilar([FromQuery] GetSimilarProductsRequest request, CancellationToken cancellationToken)
        {
            var response = await _productService.GetSimilar(request, cancellationToken);
            return Ok(response);
        }

        [HttpGet(Routes.Product.GetFavourites)]
        public async Task<ActionResult<GetShortProductsResponse>> GetFavourites(CancellationToken cancellationToken)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return NotFound("You cannot find the favourite products of no user");
            }
            var response = await _productService.GetFavouriteShortProducts((Guid)userId);
            return Ok(response);
        }
       
        [HttpGet(Routes.Product.GetShort)]
        public async Task<ActionResult<GetShortProductsResponse>> GetProductsWithFavourites([FromQuery] GetAllProductsRequest request, CancellationToken cancellationToken)
        {
            var userId = HttpContext.GetUserId();
            var response = await _productService.GetShortProducts( request,cancellationToken, userId);
            return Ok(response);
        }

        [HttpPost(Routes.Product.AddToFavourites)]
        public async Task<ActionResult<bool>> AddToFavourites([FromRoute] Guid id ,CancellationToken cancellationToken)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return NotFound(
                    "Cannot make a favourite conneciton without a user"
                    );
            }
            var action = await _productService.AddToFavourites(id, (Guid)userId, cancellationToken);
            return action ? Ok(true) : BadRequest(false);
        }

        [HttpDelete(Routes.Product.RemoveFromFavourites)]
        public async Task<ActionResult<bool>> RemoveFromFavourites([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var userId = HttpContext.GetUserId();
            if (userId == null)
            {
                return NotFound(
                    "Cannot make a favourite conneciton without a user"
                    );
            }
            var action = await _productService.RemoveFromFavourites(id, (Guid)userId, cancellationToken);
            return action? Ok(true) : BadRequest(false);
        }



    }
}
