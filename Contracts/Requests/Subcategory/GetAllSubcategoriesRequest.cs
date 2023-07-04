namespace Contracts.Requests.Subcategory
{
    public class GetAllSubcategoriesRequest
    {
        public string? Name { get; set; }
        public SortRequest? Sorting { get; set; }
        public PageRequest? Pagination { get; set; }
        public string? Description { get; set; }
        public Guid? CategoryId { get; set; }

    }
}
