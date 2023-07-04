namespace Contracts.Requests.Company
{
    public class GetAllCompaniesRequest
    {
        public string? Name { get; set; }
        public SortRequest? Sorting { get; set; }
        public PageRequest? Pagination { get; set; }
        public string? Description { get; set; }

    }
}
