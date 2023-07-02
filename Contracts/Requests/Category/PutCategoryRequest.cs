namespace Contracts.Requests.Category
{
    public class PutCategoryRequest
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }

        public Dictionary<string, string> Schema { get; set; }
    }
}
