using Contracts.Requests.PreviousClients;
using Contracts.Responses;
using Contracts.Responses.PreviousClient;
using Contracts.Responses.Product;
using Data.Models;
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


            var pageInfo = request.Pagination is null ? null
            : new PageResponse
            {
                PageNumber = request.Pagination.PageNumber,
                PageSize = request.Pagination.PageSize
            };
            return new GetAllPreviousClientsResponse
            {
                PreviousClients = list,
                PageInfo = pageInfo
            };
        }
    }
}
