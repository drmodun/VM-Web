using Contracts.Requests.Service;
using Contracts.Responses.Service;
using Data.Models;

namespace Domain.Mappers
{
    public class ServiceMapper
    {
        public GetServiceResponse ToDTO(Service service)
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
        public Service ToEntity(CreateServiceRequest request)
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
    }
}
