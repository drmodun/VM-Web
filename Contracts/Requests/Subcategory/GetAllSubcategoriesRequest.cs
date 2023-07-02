namespace Contracts.Requests.Subcategory
{
    public class GetAllSubcategoriesRequest
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public Guid? CategoryId { get; set; }

    }
}
