using Data.Enums;

namespace Contracts.Requests.Service
{
    public class GetAllServicesRequest
    {
        public string? Name { get; set; }
        public SortRequest? Sorting { get; set; }
        public PageRequest? Pagination { get; set; }

        public decimal? MaxPrice { get; set; }

        public ServiceType? ServiceType { get; set; }
        public decimal? MinPrice { get; set; }
    }
}
