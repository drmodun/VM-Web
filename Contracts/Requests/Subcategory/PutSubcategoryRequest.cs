namespace Contracts.Requests.Subcategory
{
    public class PutSubcategoryRequest
    {
        public Guid Id;
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid CategoryId { get; set; }
        public Dictionary<string, string>? SubSchema { get; set; }
        public string Website { get; set; }
    }
}
