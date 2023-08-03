using Contracts.Constants;
using Contracts.Requests.Category;
using Contracts.Responses.Category;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading;

namespace api.Controllers
{
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly CategoryService _categoryService;

        public CategoryController(CategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        [HttpGet(Routes.Category.Get)]
        public async Task<ActionResult<GetCategoryResponse>> GetCategory([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var response = await _categoryService.GetCategory(id, cancellationToken);
            return response == null ? NotFound() : Ok(response);
        }

        [HttpGet(Routes.Category.GetAll)]
        public async Task<ActionResult<GetAllCategoriesResponse>> GetAllCategories([FromQuery] GetAllCategoriesRequest request, CancellationToken cancellationToken)
        {
            var response = await _categoryService.GetAllCategories(request, cancellationToken);
            return Ok(response);
        }


        [Authorize(AuthConstants.AdminUserPolicyName)]
        [HttpPost(Routes.Category.Create)]
        public async Task<ActionResult<CreateCategoryResponse>> CreateCategory([FromBody] CreateCategoryRequest request, CancellationToken cancellationToken)
        {
            var response = await _categoryService.CreateCategory(request, cancellationToken);
            return response.Success ? Ok(response) : BadRequest(response);
        }
        [Authorize(AuthConstants.AdminUserPolicyName)]
        [HttpPut(Routes.Category.Update)]
        public async Task<ActionResult<PutCategoryResponse>> UpdateCategory([FromRoute] Guid id, [FromBody] PutCategoryRequest request, CancellationToken cancellationToken)
        {
            request.Id = id;
            var response = await _categoryService.UpdateCategory(request, cancellationToken);
            return response.Success ? Ok(response) : BadRequest(response);
        }
        [Authorize(AuthConstants.AdminUserPolicyName)]
        [HttpDelete(Routes.Category.Delete)]
        public async Task<ActionResult<DeleteCategoryResponse>> DeleteCategory([FromRoute] Guid id, CancellationToken cancellationToken)
        {

            var response = await _categoryService.DeleteCategory(id, cancellationToken);
            return response.Success ? Ok(response) : NotFound(response);
        }
        [HttpGet(Routes.Category.GetShort)]
        public async Task<ActionResult<GetShortCategoriesResponse>> GetShortCategories([FromQuery] GetAllCategoriesRequest request, CancellationToken cancellationToken)
        { 
            var response = await _categoryService.GetAllShortCategories(request, cancellationToken);
            return Ok(response);
        }
        [HttpGet(Routes.Category.GetLarge)]
        public async Task<ActionResult<GetLargeCategoryResponse>> GetLargeCategory([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var response = await _categoryService.GetLargeCategory(id, cancellationToken);
            return response == null ? NotFound() : Ok(response);
        }



    }
}
