using Contracts.Requests.PreviousClients;
using Contracts.Responses;
using Contracts.Responses.PreviousClient;
using Domain.Mappers;
using Domain.Repositories;

namespace Domain.Services
{
    public class PreviousClientService
    {
        private readonly PreviousClientRepo _previousClientRepo;

        public PreviousClientService(PreviousClientRepo previousClientRepo)
        {
            _previousClientRepo = previousClientRepo;
        }

        public async Task<CreatePreviousClientResponse> CreatePreviousClient(CreatePreviousClientRequest request, CancellationToken cancellationToken)
        {
            var previousClient = PreviousClientMapper.ToEntity(request);
            var action = await _previousClientRepo.CreatePreviousClient(previousClient, cancellationToken);
            return new CreatePreviousClientResponse
            {
                Success = action
            };
        }

        public async Task<PutPreviousClientResponse> UpdatePreviousClient(PutPreviousClientRequest request, CancellationToken cancellationToken)
        {
            var previousClient = PreviousClientMapper.ToUpdated(request);
            var action = await _previousClientRepo.UpdatePreviousClient(previousClient, cancellationToken);
            return new PutPreviousClientResponse
            {
                Success = action
            };
        }

        public async Task<DeletePreviousClientResponse> DeletePreviousClient(Guid id, CancellationToken cancellationToken)
        {
            var action = await _previousClientRepo.DeletePreviousClient(id, cancellationToken);
            return new DeletePreviousClientResponse
            {
                Success = action
            };
        }

        public async Task<GetPreviousClientResponse?> GetPreviousClient(Guid id, CancellationToken cancellationToken)
        {
            var previousClient = await _previousClientRepo.GetPreviousClient(id, cancellationToken);
            if (previousClient is null)
                return null;
            return PreviousClientMapper.ToDTO(previousClient);
        }

        public async Task<GetAllPreviousClientsResponse> GetAllPreviousClients(GetAllPreviousClientsRequest request, CancellationToken cancellationToken)
        {
            var previousClients = await _previousClientRepo.GetAllPreviousClients(request, cancellationToken);
            var pageInfo =
            new PageResponse
            {
                PageNumber = request.Pagination != null ? request.Pagination.PageNumber : 1,
                PageSize = request.Pagination != null ? request.Pagination.PageSize : previousClients.Count(),
                TotalItems = previousClients.Count(),
                TotalPages = request.Pagination != null ? (previousClients.Count() + request.Pagination.PageSize - 1) / request.Pagination.PageSize : 1
            };
            if (request.Pagination != null)
                previousClients = previousClients.Skip(request.Pagination.PageSize * (request.Pagination.PageNumber - 1)).Take(request.Pagination.PageSize);
            var list = previousClients.Select(x => PreviousClientMapper.ToDTO(x)).ToList();
            return new GetAllPreviousClientsResponse
            {
                Items = list,
                PageInfo = pageInfo
            };
        }
    }
}
