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
        private readonly PreviousClientMapper _previousClientMapper;

        public PreviousClientService(PreviousClientRepo previousClientRepo, PreviousClientMapper previousClientMapper)
        {
            _previousClientRepo = previousClientRepo;
            _previousClientMapper = previousClientMapper;
        }

        public async Task<CreatePreviousClientResponse> CreatePreviousClient(CreatePreviousClientRequest request, CancellationToken cancellationToken)
        {
            var previousClient = _previousClientMapper.ToEntity(request);
            var action = await _previousClientRepo.CreatePreviousClient(previousClient, cancellationToken);
            return new CreatePreviousClientResponse
            {
                Success = action
            };
        }

        public async Task<PutPreviousClientResponse> UpdatePreviousClient(PutPreviousClientRequest request, CancellationToken cancellationToken)
        {
            var previousClient = _previousClientMapper.ToUpdated(request);
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
            return _previousClientMapper.ToDTO(previousClient);
        }

        public async Task<GetAllPreviousClientsResponse> GetAllPreviousClients(GetAllPreviousClientsRequest request, CancellationToken cancellationToken)
        {
            var previousClients = await _previousClientRepo.GetAllpreviousClients(request, cancellationToken);
            var list = previousClients.Select(x => _previousClientMapper.ToDTO(x)).ToList();


            var pageInfo =
            new PageResponse
            {
                PageNumber = request.Pagination != null ? request.Pagination.PageNumber : 1,
                PageSize = request.Pagination != null ? request.Pagination.PageSize : list.Count,
                TotalItems = list.Count,
                TotalPages = request.Pagination != null ? (list.Count + request.Pagination.PageSize - 1) / request.Pagination.PageSize : 1
            };
            return new GetAllPreviousClientsResponse
            {
                Items = list,
                PageInfo = pageInfo
            };
        }
    }
}
