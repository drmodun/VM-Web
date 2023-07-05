using Contracts.Requests.PreviousClients;
using Contracts.Responses.PreviousClient;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    public class PreviousClientController : ControllerBase
    {
        private readonly PreviousClientService _previousClientService;

        public PreviousClientController(PreviousClientService previousClientService)
        {
            _previousClientService = previousClientService;
        }
        [HttpGet(Routes.PreviousClient.Get)]
        public async Task<ActionResult<GetPreviousClientResponse>> GetPreviousClient([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var response = await _previousClientService.GetPreviousClient(id, cancellationToken);
            return response == null ? NotFound() : Ok(response);
        }

        [HttpGet(Routes.PreviousClient.GetAll)]
        public async Task<ActionResult<GetAllPreviousClientsResponse>> GetAllPreviousClients([FromQuery] GetAllPreviousClientsRequest request, CancellationToken cancellationToken)
        {
            var response = await _previousClientService.GetAllPreviousClients(request, cancellationToken);
            return Ok(response);
        }
        [HttpPost(Routes.PreviousClient.Create)]
        public async Task<ActionResult<CreatePreviousClientResponse>> CreatePreviousClient([FromBody] CreatePreviousClientRequest request, CancellationToken cancellationToken)
        {
            var response = await _previousClientService.CreatePreviousClient(request, cancellationToken);
            return response.Success ? Ok(response) : BadRequest(response);
            //later fix this bug
        }
        [HttpPut(Routes.PreviousClient.Update)]
        public async Task<ActionResult<PutPreviousClientResponse>> UpdatePreviousClient([FromRoute] Guid id, [FromBody] PutPreviousClientRequest request, CancellationToken cancellationToken)
        {
            request.Id = id;
            var response = await _previousClientService.UpdatePreviousClient(request, cancellationToken);
            return response.Success ? Ok(response) : BadRequest(response);
        }
        [HttpDelete(Routes.PreviousClient.Delete)]
        public async Task<ActionResult<DeletePreviousClientResponse>> DeletePreviousClient([FromRoute] Guid id, CancellationToken cancellationToken)
        {

            var response = await _previousClientService.DeletePreviousClient(id, cancellationToken);
            return response.Success ? Ok(response) : NotFound(response);
        }




    }
}
