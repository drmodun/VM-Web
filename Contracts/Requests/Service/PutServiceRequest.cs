using Data.Enums;

namespace Contracts.Requests.Service
{
    public class PutServiceRequest
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ServiceType ServiceType { get; set; }
        public decimal Price { get; set; }
    }
}
