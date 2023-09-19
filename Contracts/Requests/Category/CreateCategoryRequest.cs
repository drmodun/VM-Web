namespace Contracts.Requests.Category
{
    public class CreateCategoryRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public Dictionary<string, string>? Schema { get; set; }
        public string Website { get; set; }
    }
}
