namespace Contracts.Requests.Category
{
    public class GetAllCategoriesRequest
    {
        public string? Name { get; set; } 
        public SortRequest? Sorting { get; set;} public PageRequest? Pagination { get; set; }
        public string? Description { get; set; }
    }
}
