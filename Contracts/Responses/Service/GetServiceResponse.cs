using Data.Enums;

namespace Contracts.Responses.Service
{
    public class GetServiceResponse
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid Id { get; set; }

        public ServiceType ServiceType { get; set; }

        public decimal Price { get; set; }
    }
}
