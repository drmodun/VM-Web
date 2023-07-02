namespace Contracts.Responses.Subcategory
{
    public class GetSubcategoryResponse
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
        public Dictionary<string, string> SubSchema { get; set; }
    }
}
