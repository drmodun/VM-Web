using Contracts.Requests.PreviousClients;
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

        public async Task<bool> CreatePreviousClient(CreatePreviousClientRequest request, CancellationToken cancellationToken)
        {
            var previousClient = _previousClientMapper.ToEntity(request);
            return await _previousClientRepo.CreatePreviousClient(previousClient, cancellationToken);
        }

        public async Task<bool> UpdatePreviousClient(PutPreviousClientRequest request, CancellationToken cancellationToken)
        {
            var previousClient = _previousClientMapper.ToUpdated(request);
            return await _previousClientRepo.UpdatePreviousClient(previousClient, cancellationToken);
        }

        public async Task<bool> DeletePreviousClient(Guid id, CancellationToken cancellationToken)
        {
            return await _previousClientRepo.DeletePreviousClient(id, cancellationToken);
        }

        public async Task<GetPreviousClientResponse?> GetPreviousClient(Guid id, CancellationToken cancellationToken)
        {
            var previousClient = await _previousClientRepo.GetPreviousClient(id, cancellationToken);
            if (previousClient is null)
                return null;
            return _previousClientMapper.ToDTO(previousClient);
        }

        public async Task<List<GetPreviousClientResponse>> GetAllPreviousClients(GetAllPreviousClientsRequest request, CancellationToken cancellationToken)
        {
            var previousClients = await _previousClientRepo.GetAllpreviousClients(request, cancellationToken);
            return previousClients.Select(x => _previousClientMapper.ToDTO(x)).ToList();
        }
    }
}
