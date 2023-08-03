namespace Contracts.Responses.Category
{
    public class GetLargeCategoriesResponse
    {
        public PageResponse? PageInfo { get; set; }
        public List<GetLargeCategoryResponse> Items { get; set; }
    }
}
