using Contracts.Requests.Subcategory;
using Contracts.Responses.Subcategory;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    public class SubcategoryController : ControllerBase
    {
        private readonly SubcategoryService _subcategoryService;

        public SubcategoryController(SubcategoryService subcategoryService)
        {
            _subcategoryService = subcategoryService;
        }
        [HttpGet(Routes.Subcategory.Get)]
        public async Task<ActionResult<GetSubcategoryResponse>> GetSubcategory([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var response = await _subcategoryService.GetSubcategory(id, cancellationToken);
            return response == null ? NotFound() : Ok(response);
        }

        [HttpGet(Routes.Subcategory.GetAll)]
        public async Task<ActionResult<GetAllSubcategoriesResponse>> GetAllSubcategorys([FromQuery] GetAllSubcategoriesRequest request, CancellationToken cancellationToken)
        {
            var response = await _subcategoryService.GetAllSubcategories(request, cancellationToken);
            return Ok(response);
        }
        [HttpGet(Routes.Subcategory.Create)]
        public async Task<ActionResult<CreateSubcategoryResponse>> CreateSubcategory([FromBody] CreateSubcategoryRequest request, CancellationToken cancellationToken)
        {
            var response = await _subcategoryService.CreateSubcategory(request, cancellationToken);
            return response.Success ? Ok(response) : BadRequest(response);
            //later fix this bug
        }
        [HttpPut(Routes.Subcategory.Update)]
        public async Task<ActionResult<PutSubcategoryResponse>> UpdateSubcategory([FromRoute] Guid id, [FromBody] PutSubcategoryRequest request, CancellationToken cancellationToken)
        {
            request.Id = id;
            var response = await _subcategoryService.UpdateSubcategory(request, cancellationToken);
            return response.Success ? Ok(response) : BadRequest(response);
        }
        [HttpDelete(Routes.Subcategory.Delete)]
        public async Task<ActionResult<DeleteSubcategoryResponse>> DeleteSubcategory([FromRoute] Guid id, CancellationToken cancellationToken)
        {

            var response = await _subcategoryService.DeleteSubcategory(id, cancellationToken);
            return response.Success ? Ok(response) : NotFound(response);
        }




    }
}
