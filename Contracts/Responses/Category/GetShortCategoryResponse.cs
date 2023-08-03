namespace Contracts.Responses.Category
{
    public class GetShortCategoryResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        //later add picture
        public int NumberOfProducts { get; set; }
    }
}
