using Data.Enums;

namespace Contracts.Requests.Order
{
    public class GetAllOrdersRequest
    {
        public DateTime? OrderDate { get; set; }
        public Guid? ServiceId { get; set; }

        public decimal? MaxPrice { get; set; }

        public decimal? MinPrice { get; set; }

        public ServiceType? Type { get; set; }
        public PageRequest? Pagination { get; set; }

        public SortRequest? Sorting { get; set; }
        public Guid? UserId { get; set; }
        public StatusType? Status { get; set; }
        public DateTime? Deadline { get; set; }
    }
}
