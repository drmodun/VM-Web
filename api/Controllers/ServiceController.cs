using Contracts.Requests.Service;
using Contracts.Responses.Service;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    public class ServiceController : ControllerBase
    {
        private readonly ServiceService _serviceService;

        public ServiceController(ServiceService serviceService)
        {
            _serviceService = serviceService;
        }

        [HttpGet(Routes.Service.GetAll)]
        public async Task<ActionResult<GetAllServicesResponse>> GetAllServices([FromQuery] GetAllServicesRequest request, CancellationToken cancellationToken)
        {
            var response = await _serviceService.GetAllServices(request, cancellationToken);
            return Ok(response);
        }
        [HttpPost(Routes.Service.Create)]
        public async Task<ActionResult<CreateServiceResponse>> CreateService([FromBody] CreateServiceRequest request, CancellationToken cancellationToken)
        {
            var response = await _serviceService.CreateService(request, cancellationToken);
            return response.Success ? Ok(response) : BadRequest(response);
        }
        [HttpPut(Routes.Service.Update)]
        public async Task<ActionResult<PutServiceResponse>> UpdateService([FromRoute] Guid id, [FromBody] PutServiceRequest request, CancellationToken cancellationToken)
        {
            request.Id = id;
            var response = await _serviceService.UpdateService(request, cancellationToken);
            return response.Success ? Ok(response) : BadRequest(response);
        }
        [HttpDelete(Routes.Service.Delete)]
        public async Task<ActionResult<DeleteServiceResponse>> DeleteService([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var response = await _serviceService.DeleteService(id, cancellationToken);
            return response.Success ? Ok(response) : NotFound(response);
        }
        [HttpGet(Routes.Service.Get)]
        public async Task<ActionResult<GetServiceResponse>> GetService([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var response = await _serviceService.GetService(id, cancellationToken);
            return response != null ? Ok(response) : BadRequest(response);
        }


    }
}
