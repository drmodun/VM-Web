namespace Contracts.Requests.Service
{
    public class GetAllServicesRequest
    {
        public string? Name { get; set; } public SortRequest? Sorting { get; set;} public PageRequest? Pagination { get; set; }
        public string? Description { get; set; }

        public decimal? MaxPrice { get; set; }
    }
}
