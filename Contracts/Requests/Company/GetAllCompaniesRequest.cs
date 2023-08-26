namespace Contracts.Requests.Company
{
    public class GetAllCompaniesRequest
    {
        public string? Name { get; set; }
        public SortRequest? Sorting { get; set; }
        public Guid? CategoryId { get; set; }
        public Guid? SubcategoryId { get; set; }
        public PageRequest? Pagination { get; set; }
        public string? Description { get; set; }

    }
}
