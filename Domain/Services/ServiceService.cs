using Contracts.Requests.Service;
using Contracts.Responses;
using Contracts.Responses.Service;
using Data.Models;
using Domain.Mappers;
using Domain.Repositories;

namespace Domain.Services
{
    public class ServiceService
    {
        private readonly ServiceRepo _serviceRepo;
        private readonly ServiceMapper _serviceMapper;

        public ServiceService(ServiceRepo serviceRepo, ServiceMapper serviceMapper)
        {
            _serviceRepo = serviceRepo;
            _serviceMapper = serviceMapper;
        }

        public async Task<CreateServiceResponse> CreateService(CreateServiceRequest request, CancellationToken cancellationToken)
        {
            var service = _serviceMapper.ToEntity(request);
            var action = await _serviceRepo.CreateService(service, cancellationToken);
            return new CreateServiceResponse
            {
                Success = action
            };
        }

        public async Task<PutServiceResponse> UpdateService(PutServiceRequest request, CancellationToken cancellationToken)
        {
            var service = _serviceMapper.ToUpdated(request);
            var action = await _serviceRepo.UpdateService(service, cancellationToken);
            return new PutServiceResponse
            {
                Success = action
            };
        }

        public async Task<DeleteServiceResponse> DeleteService(Guid id, CancellationToken cancellationToken)
        {
            var action = await _serviceRepo.DeleteService(id, cancellationToken);
            return new DeleteServiceResponse
            {
                Success = action
            };
        }

        public async Task<GetServiceResponse?> GetService(Guid id, CancellationToken cancellationToken)
        {
            var service = await _serviceRepo.GetService(id, cancellationToken);
            if (service is null)
                return null;
            return _serviceMapper.ToDTO(service);
        }

        public async Task<GetAllServicesResponse> GetAllServices(GetAllServicesRequest request, CancellationToken cancellationToken)
        {
            var services = await _serviceRepo.GetAllServices(request, cancellationToken);
            var pageInfo =
            new PageResponse
            {
                PageNumber = request.Pagination != null ? request.Pagination.PageNumber : 1,
                PageSize = request.Pagination != null ? request.Pagination.PageSize : services.Count(),
                TotalItems = services.Count(),
                TotalPages = request.Pagination != null ? (services.Count() + request.Pagination.PageSize - 1) / request.Pagination.PageSize : 1
            };
            if (request.Pagination != null)
            {
                services = services.Skip(request.Pagination.PageSize * (request.Pagination.PageNumber - 1)).Take(request.Pagination.PageSize);
            }
            var list = services.Select(x => _serviceMapper.ToDTO(x)).ToList();
            return new GetAllServicesResponse
            {
                Items = list,
                PageInfo = pageInfo
            };
        }
    }
}
