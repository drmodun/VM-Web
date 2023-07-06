using Contracts.Constants;
using Contracts.Requests.Company;
using Contracts.Responses.Company;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly CompanyService _companyService;

        public CompanyController(CompanyService companyService)
        {
            _companyService = companyService;
        }
        [HttpGet(Routes.Company.Get)]
        public async Task<ActionResult<GetCompanyResponse>> GetCompany([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var response = await _companyService.GetCompany(id, cancellationToken);
            return response == null ? NotFound() : Ok(response);
        }

        [HttpGet(Routes.Company.GetAll)]
        public async Task<ActionResult<GetAllCompaniesResponse>> GetAllCompanies([FromQuery] GetAllCompaniesRequest request, CancellationToken cancellationToken)
        {
            var response = await _companyService.GetAllCompanies(request, cancellationToken);
            return Ok(response);
        }
        [Authorize(AuthConstants.AdminUserPolicyName)]
        [HttpPost(Routes.Company.Create)]
        public async Task<ActionResult<CreateCompanyResponse>> CreateCompany([FromBody] CreateCompanyRequest request, CancellationToken cancellationToken)
        {
            var response = await _companyService.CreateCompany(request, cancellationToken);
            return response.Success ? Ok(response) : BadRequest(response);
            //later fix this bug
        }
        [Authorize(AuthConstants.AdminUserPolicyName)]
        [HttpPut(Routes.Company.Update)]
        public async Task<ActionResult<PutCompanyResponse>> UpdateCompany([FromRoute] Guid id, [FromBody] PutCompanyRequest request, CancellationToken cancellationToken)
        {
            request.Id = id;
            var response = await _companyService.UpdateCompany(request, cancellationToken);
            return response.Success ? Ok(response) : BadRequest(response);
        }
        [Authorize(AuthConstants.AdminUserPolicyName)]
        [HttpDelete(Routes.Company.Delete)]
        public async Task<ActionResult<DeleteCompanyResponse>> DeleteCompany([FromRoute] Guid id, CancellationToken cancellationToken)
        {

            var response = await _companyService.DeleteCompany(id, cancellationToken);
            return response.Success ? Ok(response) : NotFound(response);
        }




    }
}
