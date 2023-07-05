using Contracts.Requests.Service;
using Contracts.Responses.Service;
using Domain.Mappers;
using Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        public async Task<bool> CreateService(CreateServiceRequest request, CancellationToken cancellationToken)
        {
            var service = _serviceMapper.ToEntity(request);
            return await _serviceRepo.CreateService(service, cancellationToken);
        }

        public async Task<bool> UpdateService(PutServiceRequest request, CancellationToken cancellationToken)
        {
            var service = _serviceMapper.ToUpdated(request);
            return await _serviceRepo.UpdateService(service, cancellationToken);
        }

        public async Task<bool> DeleteService(Guid id, CancellationToken cancellationToken)
        {
            return await _serviceRepo.DeleteService(id, cancellationToken);
        }

        public async Task<GetServiceResponse?> GetService(Guid id, CancellationToken cancellationToken)
        {
            var service = await _serviceRepo.GetService(id, cancellationToken);
            if (service is null)
                return null;
            return _serviceMapper.ToDTO(service);
        }

        public async Task<List<GetServiceResponse>> GetAllServices(GetAllServicesRequest request, CancellationToken cancellationToken)
        {
            var services = await _serviceRepo.GetAllServices(request, cancellationToken);
            return services.Select(x => _serviceMapper.ToDTO(x)).ToList();
        }
    }
}
