using Contracts.Requests.Service;
using Contracts.Responses.Service;
using Data.Models;

namespace Domain.Mappers
{
    public static class ServiceMapper
    {
        public static GetServiceResponse ToDTO(Service service)
        {
            return new GetServiceResponse
            {
                Id = service.Id,
                Name = service.Name,
                Description = service.Description,
                Price = service.Price,
                ServiceType = service.ServiceType,

            };
        }
        public static Service ToEntity(CreateServiceRequest request)
        {
            return new Service
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Description = request.Description,
                Price = request.Price,
                ServiceType = request.ServiceType,
            };
        }
        public static Service ToUpdated(PutServiceRequest request)
        {
            return new Service
            {
                Id = request.Id,
                Name = request.Name,
                Description = request.Description,
                Price = request.Price,
                ServiceType = request.ServiceType,
            };
        }
    }
}
