using Data.Enums;
using System.Drawing;

namespace Contracts.Requests.Order
{
    public class GetAllOrdersRequest
    {
        public DateTime? OrderDate { get; set; }
        public Guid? ServiceId { get; set; }
        public string? ServiceName { get; set; }
        public string? UserName { get; set; }
        public decimal? MaxPrice { get; set; }

        public decimal? MinPrice { get; set; }

        public ServiceType? ServiceType { get; set; }
        public PageRequest? Pagination { get; set; }
        public SortRequest? Sorting { get; set; }
        public Guid? UserId { get; set; }
        public StatusType? Status { get; set; }
        public DateTime? Deadline { get; set; }
    }
}
